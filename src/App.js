import React, { useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import {Grid, List, ListItem, ListItemText, Typography} from "@mui/material";

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
            <TextareaAutosize
                aria-label="empty textarea"
                value={text}
                onChange={handleChange}
                minRows={20}
                style={{ width: 1000 }}
            />
            {/*<Grid container spacing={2}>*/}
            <Grid item xs={12} md={6}>
                <Typography sx={{mt: 4, mb: 2}} variant="h6" component="div">
                    Text only
                </Typography>


                <List>

                    {cleanedUrls.map((url, index) => (
                        <ListItem key={index}>
                            <ListItemText>{url}</ListItemText>
                        </ListItem>
                    ))}
                    {cleanedUrls.length > 0 && (
                        <Button variant="contained" onClick={copyCleanedUrls}>Copy cleaned URLs</Button>
                    )}

                    {/*<ListItem>*/}
                    {/*    <ListItemText*/}
                    {/*        primary="Single-line item"*/}

                    {/*    />*/}
                    {/*</ListItem>*/}
                </List>
            </Grid>


            {/*<div className="output">*/}
            {/*    {cleanedUrls.map((url, index) => (*/}
            {/*        <p key={index}>{url}</p>*/}
            {/*    ))}*/}
            {/*    {cleanedUrls.length > 0 && (*/}
            {/*        <Button variant="contained" onClick={copyCleanedUrls}>Copy cleaned URLs</Button>*/}
            {/*    )}*/}
            {/*</div>*/}
        </div>
    );
}

export default App;
