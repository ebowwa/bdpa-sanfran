// AudioAnalysis.tsx
import React, { useState, useEffect } from 'react';

interface AudioAnalysisProps {
  onAudioLevelChange: (level: number) => void;
}

const AudioAnalysis: React.FC<AudioAnalysisProps> = ({ onAudioLevelChange }) => {
  const [smoothedLevel, setSmoothedLevel] = useState<number>(0);

  useEffect(() => {
    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let microphone: MediaStreamAudioSourceNode | null = null;

    const getMicrophoneInput = async () => {
      try {
        const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new AudioContext();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(audioStream);
        microphone.connect(analyser);
        analyser.fftSize = 512;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const getAudioLevel = () => {
          if (analyser) {
            analyser.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < bufferLength; i++) {
              sum += dataArray[i];
            }
            let average = sum / bufferLength;
            setSmoothedLevel((prevLevel) => average * 0.2 + prevLevel * 0.8);
          }
          requestAnimationFrame(getAudioLevel);
        };

        getAudioLevel();
      } catch (error) {
        console.error('Error accessing the microphone', error);
      }
    };

    getMicrophoneInput();

    return () => {
      if (microphone) {
        microphone.disconnect();
      }
      if (analyser) {
        analyser.disconnect();
      }
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  useEffect(() => {
    onAudioLevelChange(smoothedLevel);
  }, [smoothedLevel, onAudioLevelChange]);

  return null;
};

export default AudioAnalysis;