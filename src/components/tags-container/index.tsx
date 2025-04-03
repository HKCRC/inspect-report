import { Tag } from "antd";
import { inspectItemOriginNode } from "../../types";

export const TagsContainer = ({
  inspectItems,
}: {
  inspectItems: inspectItemOriginNode[];
}) => {
  console.log(inspectItems);
  return (
    <div
      className="flex flex-1 flex-nowrap items-center overflow-hidden"
      style={{
        transition: "opacity 0.2s ease-in-out",
      }}
    >
      {inspectItems.map((item) => (
        <Tag color={item.color} key={item.key}>
          {item.title}
        </Tag>
      ))}
    </div>
  );
};
