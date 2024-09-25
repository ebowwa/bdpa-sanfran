import React, { useState } from 'react';
import styles from '@/styles/VoiceRecorder.module.css';
import RecordingControls from '@/components/utility/audio/RecordingControls';
import AudioAnalysis from '@/components/utility/audio/AudioAnalysis';

interface VoiceRecorderProps {
  isRecording: boolean;
  recordingTime: number;
  startRecording: () => void;
  stopRecording: () => void;
  onAudioLevelChange: (level: number) => void;
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  isRecording,
  recordingTime,
  startRecording,
  stopRecording,
  onAudioLevelChange,
}) => {
  const [audioLevel, setAudioLevel] = useState<number>(0);

  const handleAudioLevelChange = (level: number) => {
    setAudioLevel(level);
    onAudioLevelChange(level);
  };

  const circleStyle = {
    transform: `scale(${1 + audioLevel / 50})`,
    opacity: audioLevel / 100,
    boxShadow: `0 0 ${audioLevel * 2}px rgba(255, 255, 255, 0.7)`,
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Live Agent</h1>
      </div>
      <div className={styles.recorder}>
        <div className={styles.circleContainer}>
          <div className={styles.circle} style={circleStyle}>
            <div className={styles.pulsingRing} />
          </div>
          <AudioAnalysis onAudioLevelChange={handleAudioLevelChange} />
        </div>
        <div className={styles.instructions}>
          {isRecording ? 'Listening...' : 'Start speaking'}
        </div>
        {isRecording && (
          <div className={styles.recordingTime}>{formatTime(recordingTime)}</div>
        )}
        <RecordingControls
          isRecording={isRecording}
          onStartRecording={startRecording}
          onStopRecording={stopRecording}
        />
      </div>
    </div>
  );
};

export default VoiceRecorder;