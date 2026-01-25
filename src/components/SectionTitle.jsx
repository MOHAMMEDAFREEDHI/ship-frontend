export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-white">{title}</h2>
      <p className="mt-4 text-steel">{subtitle}</p>
    </div>
  );
}
