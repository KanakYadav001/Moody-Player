import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import './FaceExpression.css';
import axios from 'axios';

export default function MoodDetector({ setSongs }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null); 
  const [mood, setMood] = useState('');
  const [confidence, setConfidence] = useState('');

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models'),
      ]);
      startVideo();
    };

    const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) videoRef.current.srcObject = stream;
          streamRef.current = stream; // Save for cleanup
        })
        .catch(() => {
          alert('Camera access failed!');
        });
    };

    loadModels();

    // Clean up video stream on unmount
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const detectMoodOnce = async () => {
    if (!videoRef.current) return;
    const detection = await faceapi
      .detectSingleFace(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      )
      .withFaceExpressions();
    
    let dominant = '';
    if (detection?.expressions) {
      const expressions = detection.expressions;
      const maxValue = Math.max(...Object.values(expressions));
      dominant = Object.keys(expressions).find(
        k => expressions[k] === maxValue
      );
      setMood(dominant);
      setConfidence((maxValue * 100).toFixed(1));
    } else {
      setMood('No face detected');
      setConfidence('');
    }

    if (dominant) {
      axios.get(`http://localhost:3000/songs?mood=${dominant}`)
        .then(response => {
          console.log(response.data);
          setSongs(response.data.songs);
        });
    }
  };

  return (
    <div className='mood-element'>
      <video
        ref={videoRef}
        autoPlay
        muted
        className='user-video-feed'
      />
      <button onClick={detectMoodOnce}>Detect Mood</button>
      {mood && (
        <div className='mood' style={{ marginTop: 20 }}>
          <b>{mood}</b>
        </div>
      )}
    </div>
  );
}



