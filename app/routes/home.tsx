import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";

import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume Analyzer" },
    { name: "description", content: "Analyze your Resume!" },
  ];
}



export default function Home() {
  const {isLoading, auth, kv, fs} = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes ] = useState<Resume[]>([]);
  const [loadingResume, setLoadingResume] = useState(false);





  useEffect(() => {
    if(auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async ()=> {
      setLoadingResume(true);
      const resumes = (await kv.list('resumes:*', true)) as KVItem[];

      const parsedResumes: Resume[] = resumes?.map((resume) => (
          JSON.parse(resume.value) as Resume
    ))
      setResumes(parsedResumes||[]);
      setLoadingResume(false);
    }
    loadResumes();
  }, []);

  return <main className="bg-[url('/images/bg-main.svg)] bg-cover">
    <Navbar />
    <section className="main-section">
      <div className="page-heading py-20">
        <h1>Track your Application and Resume Ratings</h1>
        {!loadingResume && resumes?.length === 0?(
            <h3>Upload your first resume to get feedback.</h3>
        ):(
            <h3>Review your submissions and get AI powered feedback.</h3>
        )}
      </div>
        {!loadingResume && resumes.length > 0 && (
            <div className="resume-section">
              {resumes.map((resume) => (
                  <ResumeCard key={resume.id} resume={resume}/>
              ))}
            </div>
        )}

      {!loadingResume && resumes?.length === 0 && (
          <div className="flex flex-col justify-center items-center gap-4 mt-10">
            <Link to='/upload' className="primary-button w-fit text-xl font-semibold">
              Upload Resume
            </Link>
          </div>
      )}
    </section>
  </main>
}
