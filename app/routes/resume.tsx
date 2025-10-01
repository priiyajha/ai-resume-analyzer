import React, {useEffect, useState} from 'react'
import {Link, useParams} from "react-router";
import {usePuterStore} from "~/lib/puter";

export const meta = () =>{[
    {title: 'ResumeAnalyzer|review'},
    {name: 'description', content:'Resume Review.'},
]}

const Resume = () => {
    const {fs, auth, kv, isLoading } = usePuterStore();
    const {id} = useParams();

    const[imageUrl, setImageUrl] = useState('');
    const[resumeUrl, setResumeUrl] = useState('');
    const[feedback, setFeedback] = useState('');
    const navigate = useNavigate();


    useEffect(() => {

        const loadResume = async () =>{
            const resume = await kv.get(`resume${id}`);

            if(!resume) return;

            const data = resume.parse(resume);

            const resumeBlob = await fs.read(data.resumePath);
            if(!resumeBlob) return;

            const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
            const resumeUrl = URL.createObjectURL(pdfBlob);

            setResumeUrl(resumeUrl);


            const imageBlob = await fs.read(data.imagePath);
            if(!imageBlob) return;
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);

            setFeedback(data.feedback);

        }
        loadResume();

    }, [id]);

    return (
       <main className="!pt-0">
           <nav className="resume-nav">
               <Link to="/" className="back-button">
                   <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5"/>
                   <span className="text-gray-800 text-sm font-semibold">
                       Back to HomePage
                   </span>
               </Link>
           </nav>

           <div className="flex flex-row w-full max-lg:flex-col-reverse">
               <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-[100vh] sticky top-0 items-center justify-center">
                   {imageUrl && resumeUrl && (
                       <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
                           <a>
                               <img
                               src={imageUrl}
                               className="h-full w-full rounded-2xl object-contain"
                               title="resume"/>
                           </a>
                       </div>
                   )}
               </section>

           </div>

       </main>
    )
}
export default Resume
