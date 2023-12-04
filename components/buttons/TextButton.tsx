export default function TextButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="button"
    >
      {children}
    </button>
  )
}
