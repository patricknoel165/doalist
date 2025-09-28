import React, { forwardRef, useImperativeHandle, useRef } from 'react';

interface AudioFeedbackProps {
  enabled: boolean;
}

export interface AudioFeedbackRef {
  playFeedback: (type: 'success' | 'error' | 'info') => void;
}

const AudioFeedback = forwardRef<AudioFeedbackRef, AudioFeedbackProps>(
  ({ enabled }, ref) => {
    const audioContextRef = useRef<AudioContext | null>(null);

    // Initialize audio context
    const getAudioContext = () => {
      if (!audioContextRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioContextClass();
      }
      return audioContextRef.current;
    };

    // Create different tones for different feedback types
    const createTone = (frequency: number, duration: number, type: 'sine' | 'square' | 'triangle' = 'sine') => {
      if (!enabled) return;

      try {
        const audioContext = getAudioContext();
        
        // Resume audio context if suspended (required by some browsers)
        if (audioContext.state === 'suspended') {
          audioContext.resume();
        }

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = type;

        // Create envelope for smooth audio
        const now = audioContext.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.1, now + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

        oscillator.start(now);
        oscillator.stop(now + duration);
      } catch (error) {
        console.warn('Audio feedback failed:', error);
      }
    };

    const playFeedback = (type: 'success' | 'error' | 'info') => {
      switch (type) {
        case 'success':
          // Pleasant ascending chime
          setTimeout(() => createTone(523, 0.15), 0);   // C5
          setTimeout(() => createTone(659, 0.15), 100); // E5
          setTimeout(() => createTone(784, 0.2), 200);  // G5
          break;
          
        case 'error':
          // Warning tone
          createTone(220, 0.3, 'square');
          setTimeout(() => createTone(196, 0.3, 'square'), 150);
          break;
          
        case 'info':
          // Neutral notification
          createTone(440, 0.15);
          setTimeout(() => createTone(554, 0.15), 100);
          break;
          
        default:
          createTone(440, 0.1);
      }
    };

    useImperativeHandle(ref, () => ({
      playFeedback
    }));

    return null; // This component doesn't render anything
  }
);

AudioFeedback.displayName = 'AudioFeedback';

export default AudioFeedback;