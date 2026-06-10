export default function SectionBadge({ text }) {
  return (
    <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-sky-500/10 text-sky-600 border border-sky-500/20 mb-4 shadow-sm">
      {text}
    </div>
  );
}