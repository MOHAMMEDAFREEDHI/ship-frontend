import SectionTitle from "../components/SectionTitle";

const services = [
  {
    title: "Stability Analysis & Documentation",
    desc: "We deliver comprehensive vessel stability services, including intact and damage stability assessments, preparation of stability booklets, addendums, and regulatory updates. Our team conducts inclining experiments, develops inclining procedures, and performs lightship weight estimations to ensure full compliance with international standards and safe vessel operations."
  },
  {
    title: "Structural Analysis (FEM & FEA)",
    desc: "Our engineers provide advanced structural analysis using Finite Element Method (FEM) and Finite Element Analysis (FEA). We evaluate structural integrity, load distribution, stress concentration, and fatigue life to ensure safe, optimized, and compliant marine structures."
  },
  {
    title: "Stowage Plans, Statutory Plans & Engineering Drawings",
    desc: "We prepare detailed stowage plans, statutory plans, and engineering drawings for vessels and marine structures. Our drafting services include structural drawings, arrangement plans, and technical documentation that meet class and regulatory requirements."
  },
  {
    title: "Sea Fastening Plans & Operational Method Statements",
    desc: "We develop complete sea fastening solutions, including drawings, engineering analysis reports, and method statements. Our scope covers the full operation cycle—lifting plans, loading plans, sea fastening plans, and unloading procedures—ensuring safe and efficient cargo handling throughout the project."
  },
  {
    title: "Vessel Design & Modification Engineering",
    desc: "From concept to detailed engineering, we design vessels and marine structures tailored to operational needs. Our services include concept design, preliminary design, detailed design, and modification engineering for newbuilds and existing vessels."
  },
  {
    title: "Marine Surveys & Inspections",
    desc: "We conduct professional marine surveys for vessels and cargo, including cargo condition surveys, sea fastening surveys, vessel inspections, and draft surveys. Our surveyors ensure accurate reporting, compliance, and safe operational readiness."
  },
  {
    title: "Vessel Loading Software",
    desc: "We develop and customize loading software solutions for vessels, enabling safe and efficient cargo planning, stability checks, and operational decision‑making in compliance with international regulations."
  },
  {
    title: "Supply of Marine Equipment & Spare Parts",
    desc: "We supply a wide range of marine equipment, spare parts, and container units. Our procurement network ensures reliable sourcing, competitive pricing, and timely delivery for all vessel and offshore requirements."
  },
  {
    title: "Supercargo & Port Captaincy Services",
    desc: "Our experienced supercargo and port captains oversee cargo loading, securing, and discharge operations. We ensure safe handling, proper stowage, and compliance with operational standards to protect both cargo and vessel."
  },
  {
    title: "Marine Consultancy for Critical Projects",
    desc: "We provide expert consultancy for complex and high‑risk marine projects. Our team supports feasibility studies, engineering evaluations, risk assessments, and operational planning to ensure safe and successful project execution."
  }
];

export default function Services() {
  return (
    <section className="min-h-screen pt-32 px-10">
      <SectionTitle
        title="Our Marine Consultancy & Engineering Services"
        subtitle="Expert solutions supporting safe, efficient, and compliant marine operations"
      />

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-steel mb-3">
              {service.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {service.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
    