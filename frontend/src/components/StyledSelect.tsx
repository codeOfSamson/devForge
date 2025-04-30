import React from "react";

const selectClass = "p-3 rounded border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition";
function StyledSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={selectClass + (props.className ? ` ${props.className}` : "")} />;
}

export default StyledSelect;    