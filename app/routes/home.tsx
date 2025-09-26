import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import {resumes} from "../../constants";
import ResumeCard from "~/components/ResumeCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume Analyzer" },
    { name: "description", content: "Analyze your Resume!" },
  ];
}

export default function Home() {
  return <main className="bg-[url('/images/bg-main.svg)] bg-cover">
    <Navbar />
    <section className="main-section">
      <div className="page-heading py-20">
        <h1>Track your Application and Resume Ratings</h1>
          <h3>Review your submissions and get AI powered feedback.</h3>
      </div>

    {resumes.length > 0 && (
        <div className="resume-section">
          {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume}/>
          ))}
        </div>
    )}
    </section>
  </main>
}
