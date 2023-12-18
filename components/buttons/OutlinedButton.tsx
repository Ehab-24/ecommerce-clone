export default function OutlinedButton({
  children,
  onClick,
  disabled = false,
  props,
  className,
}: {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  props?: any;
  className?: string;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`select-none rounded-lg border-2 border-neutral-200 py-1
      hover:bg-neutral-200 shadow-sm shadow-neutral-500/10
      hover:shadow-lg hover:shadow-neutral-900/20
      px-2 text-center align-middle font-sans text-xs font-bold 
      text-neutral-900 transition-all focus:ring 
      focus:ring-neutral-300 active:opacity-[0.85] disabled:pointer-events-none 
      disabled:opacity-50 disabled:shadow-none bg-neutral-50"
      type="button ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
