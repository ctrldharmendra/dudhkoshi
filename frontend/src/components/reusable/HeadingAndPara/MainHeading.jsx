// import "../../../app/globals.css"


export default function MainHeading({ text }) {
  return (
    <h2 
      className="text-3xl sm:text-4xl md:text-[44px] font-black tracking-tight leading-[1.15] max-w-2xl mx-auto mb-4 text-center"
      style={{ color: 'var(--primaryTextColor)' }}
    >
      {text}
    </h2>
  );
}