import SectionTitle from "../components/SectionTitle.jsx";

export default function Contact() {
  return (
    <section className="min-h-screen pt-32 px-10">
      <SectionTitle
        title="Contact Us"
        subtitle="Let’s build something powerful together"
      />

      <div className="max-w-xl mx-auto text-center text-steel">
        <p>Email: contact@shipyard.com</p>
        <p className="mt-2">Phone: +91 9XXXXXXXXX</p>
      </div>
    </section>
  );
}
