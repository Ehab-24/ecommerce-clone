export default function FilledButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      className="select-none rounded-lg bg-neutral-700 py-1.5 
      px-2 text-center align-middle font-sans text-xs 
      font-bold text-white shadow-lg border-2 border-neutral-500 shadow-neutral-900/10 
      transition-all hover:shadow-lg hover:shadow-neutral-900/20 
      focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] 
      active:shadow-none disabled:pointer-events-none disabled:opacity-50 
      disabled:shadow-none hover:bg-neutral-800"
      type="button"
    >
      {children}
    </button>
  );
}
