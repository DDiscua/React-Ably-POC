import React from "react";

export type CardButtonProps = "view" | "edit" | "delete" | "custom";

export interface CardProps {
  title: string;
  description: string;
  actions?: CardButtonProps[];
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  actions = [],
  shadow = "md",
  className = "",
}) => {
  return (
    <div className={`p-4 bg-white rounded-lg shadow-${shadow} ${className}`}>
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="flex space-x-2">
        {actions.includes("view") && (
          <button
            onClick={() => console.log("View clicked")}
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600`}
          >
            View
          </button>
        )}

        {actions.includes("edit") && (
          <button
            onClick={() => console.log("Edit clicked")}
            className={`px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600`}
          >
            Edit
          </button>
        )}

        {actions.includes("delete") && (
          <button
            onClick={() => console.log("Delete clicked")}
            className={`px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600`}
          >
            Delete
          </button>
        )}

        {actions.includes("custom") && (
          <button
            onClick={() => console.log("Custom clicked")}
            className={`px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600`}
          >
            Custom
          </button>
        )}
      </div>
    </div>
  );
};
