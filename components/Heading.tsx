import React from "react";

const Heading = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="text-xl font-bold text-neutral-800">{children}</h1>;
};

export default Heading;
