import axios from 'axios';
import { useState } from 'react';

const SpeechToText = () => {
    const [recording, setRecording] = useState(false);
    const [transcription, setTranscription] = useState('');

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        mediaRecorder.ondataavailable = async (event) => {
            const audioBlob = event.data;
            const base64Audio = await audioBlobToBase64(audioBlob);
            const response = await axios.post(
                `https://speech.googleapis.com/v1/speech:recognize?key=AIzaSyDlFBBFruCOr8RPayC1H3m4ZE5N0Dvl4YE`,
                {
                    config: {
                        encoding: 'WEBM_OPUS',
                        sampleRateHertz: 48000,
                        languageCode: 'en-US',
                    },
                    audio: {
                        content: base64Audio,
                    },
                }
            );
            setTranscription(response.data.results[0].alternatives[0].transcript);
        };

        setRecording(true);
    };

    const stopRecording = () => {
        setRecording(false);
    };

    const audioBlobToBase64 = (blob: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    const base64Audio = btoa(
                        new Uint8Array(reader.result as ArrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
                    );
                    resolve(base64Audio);
                } else {
                    reject(new Error('FileReader result is null'));
                }
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(blob);
        });
    };

    return (
        <div>
            <h1>Speech to Text</h1>
            {!recording ? (
                <button onClick={startRecording}>Start Recording</button>
            ) : (
                <button onClick={stopRecording}>Stop Recording</button>
            )}
            <p>Transcription: {transcription}</p>
        </div>
    );
};

export default SpeechToText;
