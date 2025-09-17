import React from "react";
import { ResumeData } from "./resume";

interface Props {
  data: ResumeData;
}

export const ClassicTemplate: React.FC<Props> = ({ data }) => (
  <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg">
    <h1 className="text-3xl font-bold">{data.name}</h1>
    <p className="text-gray-600">{data.title}</p>
    <p className="mt-1 text-sm">{data.email} • {data.phone}</p>

    <section className="mt-6">
      <h2 className="text-xl font-semibold border-b pb-1">Summary</h2>
      <p className="mt-2">{data.summary}</p>
    </section>

    <section className="mt-6">
      <h2 className="text-xl font-semibold border-b pb-1">Experience</h2>
      {data.experience.map((exp, i) => (
        <div key={i} className="mt-4">
          <h3 className="font-semibold">{exp.role} – {exp.company}</h3>
          <p className="text-sm text-gray-500">{exp.period}</p>
          <ul className="list-disc ml-5 mt-1">
            {exp.details.map((d, j) => <li key={j}>{d}</li>)}
          </ul>
        </div>
      ))}
    </section>

    <section className="mt-6">
      <h2 className="text-xl font-semibold border-b pb-1">Education</h2>
      {data.education.map((edu, i) => (
        <p key={i} className="mt-2">
          {edu.degree}, {edu.school} ({edu.year})
        </p>
      ))}
    </section>

    <section className="mt-6">
      <h2 className="text-xl font-semibold border-b pb-1">Skills</h2>
      <p className="mt-2">{data.skills.join(", ")}</p>
    </section>
  </div>
);
