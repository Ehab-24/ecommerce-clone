import React from "react";

const Title = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="text-sm font-bold mb-2 text-neutral-800">{children}</h2>;
};


export default Title;