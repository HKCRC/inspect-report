const express = require('express');
const path = require('path');

// 创建Express应用
const app = express();
const PORT = 3001;

// 提供静态文件
app.use(express.static(path.join(__dirname, 'dist')));

// 不使用通配符路由，而是设置一个简单的根路由作为备选
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 为SPA应用添加一个中间件处理所有其他路由
// 这种方式比使用路由模式更安全
app.use((req, res, next) => {
  // 只处理GET请求
  if (req.method === 'GET') {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  } else {
    next();
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器正在运行于 http://localhost:${PORT}`);
});