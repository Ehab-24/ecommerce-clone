import { ReactNode } from "react";

const Text = ({ children, className = "text-neutral-500" }: { children: ReactNode, className?: string }) => {
  return <p className={`text-sm md:text-xs ${className}`}>{children}</p>;
};

export default Text;
