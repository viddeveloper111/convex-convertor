import React from "react";

export interface TwoColumnData {
  name: string;
  title: string;
  about: string;
  photoUrl: string;
  contact: { phone: string; email: string; address: string };
  education: { school: string; degree: string; years: string }[];
  skills: string[];
  languages: { name: string; level: string }[];
  experience: { role: string; company: string; years: string; details: string }[];
  references: { name: string; title: string; phone: string; email: string }[];
}

export default function TwoColumnResume({ data }: { data: TwoColumnData }) {
  return (
    <div
      id="resume-content"
      className="mx-auto max-w-4xl bg-white shadow-lg border border-gray-200 md:grid md:grid-cols-3 font-serif"
    >
      {/* LEFT COLUMN */}
      <aside className="bg-[#f5f0eb] p-6 flex flex-col items-center md:items-start md:col-span-1">
        <img
          src={data.photoUrl}
          alt={data.name}
          className="w-32 h-32 object-cover rounded-full border-4 border-white mb-6"
        />
        <section className="space-y-6 w-full">
          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold tracking-wide mb-2">Contact</h3>
            <p className="text-sm flex items-center gap-2">
              <span>📞</span>{data.contact.phone}
            </p>
            <p className="text-sm flex items-center gap-2">
              <span>✉️</span>{data.contact.email}
            </p>
            <p className="text-sm flex items-center gap-2">
              <span>📍</span>{data.contact.address}
            </p>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-lg font-bold tracking-wide mb-2">Education</h3>
            {data.education.map((e, i) => (
              <div key={i} className="mb-3">
                <p className="font-semibold">{e.school}</p>
                <p className="text-sm">{e.degree}</p>
                <p className="text-xs text-gray-600">{e.years}</p>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-lg font-bold tracking-wide mb-2">Skills</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              {data.skills.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-lg font-bold tracking-wide mb-2">Language</h3>
            {data.languages.map((l, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span>{l.name}</span>
                <span className="text-gray-600">{l.level}</span>
              </div>
            ))}
          </div>
        </section>
      </aside>

      {/* RIGHT COLUMN */}
      <main className="col-span-2 p-8 space-y-8">
        <header>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide">
            {data.name.toUpperCase()}
          </h1>
          <p className="text-xl text-gray-700">{data.title}</p>
        </header>

        {/* About */}
        <section>
          <h2 className="font-bold text-lg border-b mb-2">About Me</h2>
          <p className="text-gray-700 leading-relaxed">{data.about}</p>
        </section>

        {/* Experience */}
        <section>
          <h2 className="font-bold text-lg border-b mb-4">Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between">
                <p className="font-semibold">
                  {exp.role} – <span className="italic">{exp.company}</span>
                </p>
                <p className="text-sm text-gray-600">{exp.years}</p>
              </div>
              <p className="text-sm text-gray-700">{exp.details}</p>
            </div>
          ))}
        </section>

        {/* References */}
        <section>
          <h2 className="font-bold text-lg border-b mb-4">References</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.references.map((ref, i) => (
              <div key={i}>
                <p className="font-semibold">{ref.name}</p>
                <p className="text-sm">{ref.title}</p>
                <p className="text-sm">Phone: {ref.phone}</p>
                <p className="text-sm">Email: {ref.email}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
