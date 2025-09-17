import { useRouter } from "next/router";
import { ClassicTemplate } from "../resume/ClassicTemplate"; // ✅ correct path
import { ResumeData } from "../resume/resume";                     // ✅ correct path

const sampleData: ResumeData = {
  name: "Jane Doe",
  title: "Full Stack Developer",
  email: "jane@example.com",
  phone: "555-1234",
  summary: "Experienced developer with a passion for building scalable web apps.",
  experience: [
    {
      company: "TechCorp",
      role: "Senior Developer",
      period: "2021–Present",
      details: ["Lead team of 5", "Built microservices", "Optimized performance"],
    },
  ],
  education: [
    { school: "ABC University", degree: "B.Sc. Computer Science", year: "2020" },
  ],
  skills: ["React", "Next.js", "TypeScript", "Node.js"],
};

export default function ResumePage() {
  const { query } = useRouter();
  const template = query.template as string;

  switch (template) {
    case "classic":
      return <ClassicTemplate data={sampleData} />;
    // Add other templates here
    default:
      return <p>Template not found</p>;
  }
}
