import {type FormEvent, useState} from 'react'
import Navbar from "~/components/Navbar";

const Upload = () => {
    const[isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
    <main className="bg-[url('/images/bg-main.svg)] bg-cover">
        <Navbar />
        <section className="main-section">
            <div className="page-heading py-16">
                <h1>Smart feedback for your dream job</h1>
                {isProcessing ? (
                    <>
                        <h2>{statusText}</h2>
                        <img src="/images/resume-scan.gif" className="w-full"/>
                    </>
                ):(
                    <h2>Drop your resume for generating an ATS score</h2>
                )}
                {!isProcessing && (
                    <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">

                        <div className="form-div">
                            <label htmlFor="company-name">Company Name</label>
                            <input type="text" name="company-name" id="company-name" placeholder="Company Name"></input>
                        </div>
                        <div className="form-div">
                            <label htmlFor="job-title">Job Title</label>
                            <input type="text" name="job-title" id="job-title" placeholder="Job Title"></input>
                        </div>
                        <div className="form-div">
                            <label htmlFor="job-description">Job Description</label>
                            <textarea rows={5} name="job-description" id="job-description" placeholder="Job Description"></input>
                        </div>
                        <div className="form-div">
                            <label htmlFor="uploader">Upload Resume</label>
                            <div>Uploader</div>
                        </div>
                        <button className="primary-button" type="submit">
                            Analyze Resume
                        </button>

                    </form>

                )}

            </div>
        </section>
    </main>

    )
}
export default Upload
