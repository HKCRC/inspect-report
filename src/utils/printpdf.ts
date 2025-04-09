import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

export async function generatePDF(pdfName: string, callback?: () => void) {
  // 1. 获取所有 section 元素
  const sections = document.querySelectorAll('section');
  
  // 2. 创建临时容器用于渲染
  const tempContainer = document.createElement('div');
  tempContainer.style.position = 'absolute';
  tempContainer.style.left = '-9999px';
  tempContainer.style.top = '0';
  document.body.appendChild(tempContainer);
  
  // 3. 创建PDF对象
  const pdf = new jsPDF('p', 'mm', 'a4'); // 纵向，A4纸
  
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    
    // 4. 克隆当前section到临时容器
    const clonedSection = section.cloneNode(true) as HTMLElement;
    tempContainer.innerHTML = '';
    tempContainer.appendChild(clonedSection);
    
    // 5. 重置克隆元素的样式以确保完整渲染
    clonedSection.style.width = section.scrollWidth + 'px';
    clonedSection.style.height = 'auto';
    clonedSection.style.position = 'static';
    clonedSection.style.transform = 'none';
    clonedSection.style.maxWidth = 'none';
    clonedSection.style.maxHeight = 'none';
    clonedSection.style.overflow = 'visible';
    
    const imgElements = clonedSection.querySelectorAll('img');
    imgElements.forEach(img => {
      // 确保图片有宽高
      if (!img.style.width) img.style.width = 'auto';
      if (!img.style.height) img.style.height = 'auto';
      
      // 处理跨域问题
      img.crossOrigin = 'anonymous';
      
      // 为所有图片添加额外的样式以确保可见性
      img.style.maxWidth = '100%';
      img.style.display = 'block';
      
      // 如果图片源是相对路径，转换为绝对路径
      if (img.src && !img.src.startsWith('http') && !img.src.startsWith('data:')) {
        img.src = new URL(img.src, window.location.origin).href;
      }
    });

    // 6. 确保所有子元素都可见
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    Array.from(clonedSection.querySelectorAll('*')).forEach((el: HTMLElement) => {
      if (el.style) {
        el.style.overflow = 'visible';
        // 保持原始宽高比例
        if (el.style.width && el.style.width.includes('%')) {
          el.style.width = (parseFloat(el.style.width) * section.scrollWidth / 100) + 'px';
        }
      }
    });
    
    try {
      // 7. 使用html2canvas渲染克隆的section
      const canvas = await html2canvas(clonedSection, {
        scale: 1, // 提高分辨率
        logging: true,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: clonedSection.scrollWidth,
        height: clonedSection.scrollHeight,
        windowWidth: clonedSection.scrollWidth,
        windowHeight: clonedSection.scrollHeight,
        // 这个选项可以帮助捕获完整内容
        onclone: (doc) => {
          const clonedDoc = doc.querySelector('div > *') as HTMLElement;
          if (clonedDoc) {
            // 确保克隆文档中的元素完全展开
            clonedDoc.style.transform = 'none';
            clonedDoc.style.width = section.scrollWidth + 'px';
            clonedDoc.style.height = 'auto';
          }
        }
      });
      
      // 8. 将canvas转换为图片
      const imgData = canvas.toDataURL('image/png');
      
      // 9. 计算图片在PDF中的尺寸
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // 保持原始宽高比
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // 10. 如果图像高度超过页面高度，需要分页处理
      let heightLeft = imgHeight;
      let position = 0;
      let pageAdded = false;
      
      // 第一页
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      position -= pageHeight;
      
      // 如果内容需要多页，添加额外页面
      while (heightLeft > 0) {
        pdf.addPage();
        pageAdded = true;
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        position -= pageHeight;
      }
      
      // 如果当前section不需要额外页面，且不是最后一个section，添加新页
      if (!pageAdded && i < sections.length - 1) {
        pdf.addPage();
      }
      
    } catch (error) {
      console.error(`Error rendering section ${i}:`, error);
      callback?.();
    }
  }

  document.body.removeChild(tempContainer);


  pdf.save(`${pdfName}.pdf`);
  callback?.();
}