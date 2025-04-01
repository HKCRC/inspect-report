import { Divider } from "antd";
import React, { useRef, useState, useEffect } from "react";

interface ScrollableTabsProps {
  tabs: {
    id: string | number;
    label: string;
  }[];
  activeTab?: string | number;
  onTabChange: (tabId: string | number) => void;
  visibleTabs?: number;
}

export const ScrollableTabs: React.FC<ScrollableTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  visibleTabs = 4, // 默认显示4个tab
}) => {
  const [currentTab, setCurrentTab] = useState<string | number>(
    activeTab || (tabs.length > 0 ? tabs[0].id : "")
  );
  const tabsRef = useRef<HTMLDivElement>(null);
  const [displayedTabs, setDisplayedTabs] = useState<typeof tabs>([]);
  const [startIndex, setStartIndex] = useState(0);

  // 更新显示的Tabs
  const updateDisplayedTabs = (start: number) => {
    // 确保起始索引有效
    const validStart = Math.max(0, Math.min(start, tabs.length - visibleTabs));
    setStartIndex(validStart);
    setDisplayedTabs(tabs.slice(validStart, validStart + visibleTabs));
  };

  // 初始化显示的Tabs
  useEffect(() => {
    if (tabs.length > 0) {
      // 如果有活动tab，尝试确保它在可见范围内
      if (activeTab !== undefined) {
        const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
        if (activeIndex >= 0) {
          // 计算起始索引，使活动tab在可见范围内
          const newStartIndex = Math.max(
            0,
            Math.min(activeIndex, tabs.length - visibleTabs)
          );
          updateDisplayedTabs(newStartIndex);
          return;
        }
      }
      // 如果没有活动tab或找不到，从0开始显示
      updateDisplayedTabs(0);
    }
  }, [tabs, activeTab, visibleTabs]);

  // 选中Tab时的处理函数
  const handleTabClick = (tabId: string | number) => {
    setCurrentTab(tabId);
    onTabChange(tabId);

    // 如果选中不在当前显示范围内的tab，滚动到它
    const selectedIndex = tabs.findIndex((tab) => tab.id === tabId);
    if (
      selectedIndex < startIndex ||
      selectedIndex >= startIndex + visibleTabs
    ) {
      // 计算新的起始位置，尝试将所选tab放在中间位置
      const newStart = Math.max(
        0,
        Math.min(
          selectedIndex - Math.floor(visibleTabs / 2),
          tabs.length - visibleTabs
        )
      );
      updateDisplayedTabs(newStart);
    }
  };

  // 向前滚动
  const scrollPrev = () => {
    if (startIndex > 0) {
      updateDisplayedTabs(startIndex - 1);
    }
  };

  // 向后滚动
  const scrollNext = () => {
    if (startIndex < tabs.length - visibleTabs) {
      updateDisplayedTabs(startIndex + 1);
    }
  };

  // 当activeTab从外部更改时，更新currentTab
  useEffect(() => {
    if (activeTab !== undefined && activeTab !== currentTab) {
      setCurrentTab(activeTab);
    }
  }, [activeTab]);

  // 判断是否可以滚动
  const canScrollPrev = startIndex > 0;
  const canScrollNext = startIndex < tabs.length - visibleTabs;

  return (
    <div className="relative flex items-center w-full ">
      {/* 左侧滚动按钮 */}
      {tabs.length > visibleTabs && (
        <button
          className={`z-10 flex items-center justify-center w-8 h-8 rounded-full border-none ${
            canScrollPrev ? "text-gray-600" : "text-gray-400 cursor-not-allowed"
          }`}
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          aria-label="Previous tabs"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill={canScrollPrev ? "#000000" : "#808080"}
            viewBox="0 0 256 256"
          >
            <path d="M232,128a8,8,0,0,1-8,8H91.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L91.31,120H224A8,8,0,0,1,232,128ZM40,32a8,8,0,0,0-8,8V216a8,8,0,0,0,16,0V40A8,8,0,0,0,40,32Z"></path>
          </svg>
        </button>
      )}

      {/* 固定宽度的Tabs容器 */}
      <div ref={tabsRef} className="flex justify-between">
        {displayedTabs.map((tab, index) => (
          <div key={tab.id} className="flex items-center">
            <button
              key={tab.id}
              className={`px-3 py-1 whitespace-nowrap font-medium text-sm transition-colors duration-200 relative flex-1 text-center
              ${
                currentTab === tab.id
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => handleTabClick(tab.id)}
              aria-selected={currentTab === tab.id}
            >
              {tab.label}
              {/* 底部指示条 */}
              {/* {currentTab === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>
            )} */}
            </button>
            {index !== displayedTabs.length - 1 && (
              <Divider style={{ background: "#D8D8D8" }} type="vertical" />
            )}
          </div>
        ))}
      </div>

      {/* 右侧滚动按钮 */}
      {tabs.length > visibleTabs && (
        <button
          className={`z-10 flex items-center justify-center w-8 h-8 rounded-full border-none ${
            canScrollNext ? "text-gray-600" : "text-gray-400 cursor-not-allowed"
          }`}
          onClick={scrollNext}
          disabled={!canScrollNext}
          aria-label="Next tabs"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill={canScrollNext ? "#000000" : "#808080"}
            viewBox="0 0 256 256"
          >
            <path d="M189.66,122.34a8,8,0,0,1,0,11.32l-72,72a8,8,0,0,1-11.32-11.32L164.69,136H32a8,8,0,0,1,0-16H164.69L106.34,61.66a8,8,0,0,1,11.32-11.32ZM216,32a8,8,0,0,0-8,8V216a8,8,0,0,0,16,0V40A8,8,0,0,0,216,32Z"></path>
          </svg>
        </button>
      )}
    </div>
  );
};
