import React from 'react'
import {useParams} from "react-router";

export const meta = () =>{[
    {title: 'ResumeAnalyzer|review'},
    {name: 'description', content:'Resume Review.'},
]}

const Resume = () => {

    const {id} = useParams();

    return (
        <div>Resume {id}</div>
    )
}
export default Resume
