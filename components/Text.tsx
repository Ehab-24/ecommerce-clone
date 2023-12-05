import { ReactNode } from "react";

const Text = ({ children, className }: { children: ReactNode, className: string }) => {
  return <p className={`text-xs font-medium text-neutral-500 ${className}`}>{children}</p>;
};

export default Text;
