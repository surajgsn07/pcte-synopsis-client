import React, { useState } from 'react';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import axios from "axios";
import { structure } from './prompt';
import { FaSpinner } from 'react-icons/fa'; // Import the spinner icon
import './doc.css';
import Modal from './Modal/Modal';

const DocGenerator = () => {
    const [name, setName] = useState('');
    const [course, setCourse] = useState('');
    const [topic, setTopic] = useState('');
    const [subject, setSubject] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const [modalOpen, setmodalOpen] = useState(false);

    // Extract JSON safely with regex
function extractJson(responseText) {
    const regex = /{[\s\S]*}/; // greedy match for first {...} block
    const match = responseText.match(regex);
    if (!match) {
        throw new Error("No valid JSON object found in response");
    }
    return match[0]; // first valid JSON substring
}

    const generateDocument = async () => {
    if (!name || !course || !topic || !subject || !rollNo || !email) {
        alert("Please fill in all the required fields.");
        return;
    }

    const promptContent = `
        You are an AI that MUST return only valid JSON.
        No explanations, no markdown, no extra text outside JSON.
        The JSON structure must strictly follow this format: ${structure}.
        The topic is "${topic}".
        Every field must be filled properly.
        References must always be https:// links.
    `;

    setLoading(true);
    try {
        const res = await axios.post(
            "https://pcte-synopsis-server.onrender.com/api/getcontent",
            { prompt: promptContent }
        );

        let rawResponse = res.data.data.trim();

        // Ensure response is pure JSON
        if (!rawResponse.startsWith("{") || !rawResponse.endsWith("}")) {
            throw new Error("Response is not valid JSON");
        }

        const data = extractJson(rawResponse);

        const formattedData = {
            name,
            course,
            topic,
            subject,
            rollNo,
            email,
            introduction: data.introduction,
            main_points: data.main_points
                .map(
                    (point) =>
                        ` ▣ ${point.point}\n${point.sub_points
                            .map((sub) => `  - ${sub}`)
                            .join("\n")}`
                )
                .join("\n\n"),
            key_applications: data.key_applications
                .map((app) => `- ${app}`)
                .join("\n"),
            latest_news: data.latest_news.map((news) => `- ${news}`).join("\n"),
            conclusion: data.conclusion,
            references: data.references.map((ref) => `- ${ref.link}`).join("\n"),
        };

        // Load template
        const response = await fetch("/template.docx");
        if (!response.ok)
            throw new Error(`Failed to fetch template: ${response.statusText}`);

        const content = await response.arrayBuffer();
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        doc.setData(formattedData);
        doc.render();

        const output = doc.getZip().generate({
            type: "blob",
            mimeType:
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });

        saveAs(output, `${name}.docx`);

        setmodalOpen(true);
        setCourse("");
        setEmail("");
        setName("");
        setRollNo("");
        setSubject("");
        setTopic("");
    } catch (error) {
        console.error("Error generating document:", error);
        alert("Failed to generate document. Please try again.");
    } finally {
        setLoading(false);
    }
};


    const generateDocument = async () => {
        const promptContent = `The response should follow this structure and should be a valid JSON only, not even a single line should be non-JSON: ${structure} and the topic is ${topic}. Provide proper https links in reference links.`;
        
        if(!name || !course || !topic || !subject || !rollNo || !email) {
            alert("Please fill in all the required fields.");
            return;
        }
        
        setLoading(true); // Set loading to true when process starts
        try {
            const res = await axios.post("https://pcte-synopsis-server.onrender.com/api/getcontent", { prompt: promptContent });
            



            const jsonStartIndex = res.data.data.indexOf('{');
            const jsonString = res.data.data.slice(jsonStartIndex);
            const data = JSON.parse(jsonString);
            

            const formattedData = {
                name,
                course,
                topic,
                subject,
                rollNo,
                email,
                introduction: data.introduction,
                main_points: data.main_points.map(
                    (point) => ` ▣ ${point.point}\n${point.sub_points.map(
                        (sub) => `  - ${sub}`
                    ).join("\n")}`
                ).join("\n\n"),
                key_applications: data.key_applications.map((app) => `- ${app}`).join("\n"),
                latest_news: data.latest_news.map((news) => `- ${news}`).join("\n"),
                conclusion: data.conclusion,
                references: data.references.map((ref) => `- ${ref.link}`).join("\n")
            };

            const response = await fetch("/template.docx");
            if (!response.ok) throw new Error(`Failed to fetch template: ${response.statusText}`);

            const content = await response.arrayBuffer();
            const zip = new PizZip(content);
            const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

            doc.setData(formattedData);
            doc.render();

            const output = doc.getZip().generate({
                type: "blob",
                mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            });

            saveAs(output, `${name}.docx`);
            setmodalOpen(true);
            setCourse('');
            setEmail("")
            setName("");
            setRollNo("");
            setSubject("");
            setTopic("");
        } catch (error) {
            console.error("Error generating document:", error);
        } finally {
            setLoading(false); // Set loading to false when process completes
        }
    };

    return (
        <div className="container">
            <h1>Make Synopsis</h1>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Course with section" value={course} onChange={(e) => setCourse(e.target.value)} />
            <input type="text" placeholder="Topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
            <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
            <input type="text" placeholder="Roll No" value={rollNo} onChange={(e) => setRollNo(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            
            <button onClick={generateDocument} disabled={loading}>
                {loading ? <FaSpinner className="spinner" /> : 'Generate Document'}
            </button>

            <Modal isOpen={modalOpen} onClose={() => setmodalOpen(false)}  />
        </div>
    );
};

export default DocGenerator;
