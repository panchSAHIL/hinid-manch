import s from './Practice.module.scss'
import { useLocation } from "react-router-dom"
import React, { useState, useRef } from 'react';

export default function SubmitAudio(){
    const { state } = useLocation();
    const [isRecording, setIsRecording] = useState(false);
    const [data, setData] = useState(null);
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);
    const [score, updateScore] = useState("")

    const handleStartRecording = () => {
        navigator.mediaDevices.getUserMedia({
            audio: {
              mimeType: 'audio/wav', // Set the desired audio format
            }
          })
            .then((stream) => {
            const mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                chunksRef.current.push(e.data);
                }
            };

            mediaRecorder.onstop = () => {
                const recordedBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
                const recordedFile = new File([recordedBlob], 'recording.wav', { type: 'audio/wav' });
                // Handle the recorded audio blob (recordedBlob)
                // setData(recordedBlob);
                setData(recordedFile);
            };

            mediaRecorder.start();
            setIsRecording(true);
            mediaRecorderRef.current = mediaRecorder;
            })
            .catch((error) => {
            console.error('Error accessing microphone:', error);
            });
        };

        const handleStopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };


    //  un-comment to send this to your server
    //  start the server and make a endpoint
    //  then send the request
    
    const sendAudioToServer = async () => {
        if(data === null) return;
        console.log(data);
        try {
            const formData = new FormData();
            formData.append('audio', data, 'recorded_audio.wav');
            formData.append('text', state.text);
            console.log(state.text);
                
            fetch("http://localhost:5000/upload-audio", {
                method: 'POST',
                body: formData,
            })
            .then(resp => resp.json())
            .then(data => updateScore(data['sim_score']))
            .catch(error => console.log(error))

            // const response = await fetch('http://localhost:5000/upload-audio', {
            // method: 'POST',
            // body: formData,
            // });
            
            // console.log(response);
            // if (response.ok) {
            // console.log('Audio successfully sent to the server');
            
            // } else {
            // console.error('Failed to send audio to the server');
            // }
        } catch (error) {
            console.error('Error sending audio to the server:', error);
        }
    };

    return(
        <div id={s.submitaudio}>
            <div id={s.title}>
                {state.text}
            </div>

            <img src={state.image} alt="" />  

            <div id={s.btns}>
                <button type='button' className={s.btn} onClick={handleStartRecording} disabled={isRecording}>
                    Start Recording
                </button>
                <button type='button' className={s.btn} onClick={handleStopRecording} disabled={!isRecording}>
                    Stop Recording
                </button>
            </div>

            <div id={s.submit} onClick={sendAudioToServer}>
                Send to Verify
            </div>
            {
                score ?
                    score > 80 ?
                        <h1> 🎉 Good job, you score is {score}% 🎉 </h1> :
                        score > 60 ? <h1> your score is {score}%, you can do it better </h1> : <h1> Try again Failed! 😔 you scored {score}%</h1>
                : <h1> Please record your voice to get your score. </h1>
            }
        </div>
    )
}