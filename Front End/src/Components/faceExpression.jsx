import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import './FaceExpression.css'
const MoodDetector = () => {
  const videoRef = useRef(null);
  const [mood, setMood] = useState('');
  const [confidence, setConfidence] = useState('');

  useEffect(() => {
    // Load face-api models
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models')
      ]);
      startVideo();
    };

    const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch(err => {
          alert('Camera access failed!');
        });
    };

    loadModels();
  }, []);

  // This runs ONCE when you click the button
  const detectMoodOnce = async () => {
    if (!videoRef.current) return;
    const detection = await faceapi
      .detectSingleFace(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      )
      .withFaceExpressions();
    if (detection?.expressions) {
      const expressions = detection.expressions;
      const maxValue = Math.max(...Object.values(expressions));
      const dominant = Object.keys(expressions).find(
        k => expressions[k] === maxValue
      );
      setMood(dominant);
      setConfidence((maxValue * 100).toFixed(1));
    } else {
      setMood('No face detected');
      setConfidence('');
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
        <div style={{ marginTop: 20  }}>
          <b>{mood}</b>{' '}
          {confidence && `(${confidence}% confidence)`}
        </div>
      )}
    </div>
  );
};

export default MoodDetector;


