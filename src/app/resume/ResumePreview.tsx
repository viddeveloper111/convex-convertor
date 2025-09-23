import React from "react";

export type TemplateName =
  | "celestial"
  | "modern"
  | "elegant"
  | "classic"
  | "minimal"
  | "creative";

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  education: string;
  experience: string;
  skills: string;
  address: string;
}

interface PreviewProps {
  template: TemplateName;
  data: ResumeData;
}

export default function ResumePreview({ template, data }: PreviewProps) {
  const TemplateComponent = templates[template];
  return TemplateComponent ? (
    <TemplateComponent data={data} />
  ) : (
    <p className="text-center text-gray-500">No template selected.</p>
  );
}

/* ---------- Template Registry ---------- */
const templates: Record<TemplateName, React.FC<{ data: ResumeData }>> = {
  celestial: CelestialTemplate,
  modern: ModernTemplate,
  elegant: (p) => <BaseTemplate {...p} theme="Elegant" />,
  classic: (p) => <BaseTemplate {...p} theme="Classic" />,
  minimal: (p) => <BaseTemplate {...p} theme="Minimal" />,
  creative: (p) => <BaseTemplate {...p} theme="Creative" />,
};

/* ---------- Individual Templates ---------- */
function CelestialTemplate({ data }: { data: ResumeData }) {
  return (
    <OuterContainer gradient>
      <Header
        name={data.name}
        email={data.email}
        phone={data.phone}
        extraClass="font-playfair tracking-tight text-gray-900"
      />
      <CommonSections data={data} />
    </OuterContainer>
  );
}

function ModernTemplate({ data }: { data: ResumeData }) {
  return (
    <OuterContainer>
      <Header
        name={data.name}
        email={data.email}
        phone={data.phone}
        extraClass="text-purple-600"
      />
      <CommonSections data={data} />
    </OuterContainer>
  );
}

function BaseTemplate({
  data,
  theme,
}: {
  data: ResumeData;
  theme: string;
}) {
  return (
    <OuterContainer>
      <Header
        name={data.name}
        email={data.email}
        phone={data.phone}
        subtitle={`(${theme} Template)`}
      />
      <CommonSections data={data} />
    </OuterContainer>
  );
}

/* ---------- Shared Building Blocks ---------- */
function OuterContainer({
  children,
  gradient = false,
}: {
  children: React.ReactNode;
  gradient?: boolean;
}) {
  const base =
    "max-w-3xl mx-auto p-8 sm:p-10 shadow-xl rounded-2xl border border-gray-200";
  const bg = gradient
    ? "bg-gradient-to-br from-gray-50 to-white"
    : "bg-white";
  return <div id="resume-content" className={`${base} ${bg}`}>{children}</div>;
}

function Header({
  name,
  email,
  phone,
  subtitle,
  extraClass,
}: {
  name: string;
  email: string;
  phone: string;
  subtitle?: string;
  extraClass?: string;
}) {
  return (
    <header className="text-center mb-6 border-b border-gray-300 pb-4">
      <h1 className={`text-4xl sm:text-5xl font-bold ${extraClass ?? ""}`}>
        {name || "Your Name"}
      </h1>
      <p className="mt-2 text-lg text-gray-600">
        {email || "email@example.com"}
      </p>
      <p className="text-gray-600">{phone || "000-000-0000"}</p>
      {subtitle && <p className="italic text-gray-500">{subtitle}</p>}
    </header>
  );
}

function CommonSections({ data }: { data: ResumeData }) {
  return (
    <>
      <Section title="Education">{data.education}</Section>
      <Section title="Experience">{data.experience}</Section>
      <Section title="Skills">{data.skills}</Section>
      <Section title="Address">{data.address}</Section>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6">
      <h2 className="text-2xl font-semibold mb-2 border-b-2 border-gray-200 pb-1">
        {title}
      </h2>
      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
        {children || "—"}
      </p>
    </section>
  );
}
