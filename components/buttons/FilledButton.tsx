export default function FilledButton({
  children,
  onClick,
  disabled = false,
  bgClass = "bg-neutral-700",
}: {
  bgClass?: string;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`select-none rounded-lg ${bgClass} 
      py-1 px-2 text-center align-middle font-sans text-xs border-2 border-neutral-500
      font-bold text-white shadow-md shadow-neutral-900/10 hover:bg-neutral-800
      transition-all hover:shadow-lg hover:shadow-neutral-900/20 
      focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85]
      active:shadow-none disabled:pointer-events-none disabled:opacity-50
      disabled:shadow-none`}
      type="button"
    >
      {children}
    </button>
  );
}
