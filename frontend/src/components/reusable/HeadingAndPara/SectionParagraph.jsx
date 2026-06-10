export default function SectionParagraph({ text }) {
  return (
    <p 
      className="text-sm sm:text-base max-w-2xl mx-auto text-center leading-relaxed font-medium mb-12"
      style={{ color: 'var(--text-muted)' }}
    >
      {text}
    </p>
  );
}