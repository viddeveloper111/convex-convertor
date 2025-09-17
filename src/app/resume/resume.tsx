export interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone: string;
  summary: string;
  experience: {
    company: string;
    role: string;
    period: string;
    details: string[];
  }[];
  education: {
    school: string;
    degree: string;
    year: string;
  }[];
  skills: string[];
}
