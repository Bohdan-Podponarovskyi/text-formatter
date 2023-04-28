import React, { useState } from 'react';
import './App.css';

function App() {
    const [text, setText] = useState('');
    const [cleanedUrls, setCleanedUrls] = useState([]);

    const cleanURLs = (urls) => {
        return urls.map((url) => {
            const urlObj = new URL(url);
            const pathSegments = urlObj.pathname.split('/');
            const lastSegment = pathSegments[pathSegments.length - 1];
            const cleanedSegment = lastSegment.replace(/[-\d]+/, '');
            pathSegments[pathSegments.length - 1] = cleanedSegment;
            urlObj.pathname = pathSegments.join('/');
            return urlObj.toString();
        });
    };

    const handleChange = (event) => {
        setText(event.target.value);
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const urls = event.target.value.match(urlRegex);
        if (urls) {
            const cleaned = cleanURLs(urls);
            setCleanedUrls(cleaned);
        }
    };

    const copyCleanedUrls = async () => {
        try {
            await navigator.clipboard.writeText(cleanedUrls.join('\n'));
            alert('Cleaned URLs copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className="App">
            <header>
                <h1>URLs Cleaner</h1>
            </header>
            <h2>Enter URLs</h2>
            <textarea
                value={text}
                onChange={handleChange}
                rows="10"
                cols="50"
                // placeholder="Введіть URL"
            />
            <div className="output">
                {cleanedUrls.map((url, index) => (
                    <p key={index}>{url}</p>
                ))}
                {cleanedUrls.length > 0 && (
                    <button onClick={copyCleanedUrls}>Copy cleaned URLs</button>
                )}
            </div>
        </div>
    );
}

export default App;
