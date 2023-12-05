import React from "react";

const Heading = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="text-xl font-bold mb-4 text-neutral-800">{children}</h1>;
};

export default Heading;