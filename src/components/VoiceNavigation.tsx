import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, Volume2 } from 'lucide-react';

interface VoiceNavigationProps {
  enabled: boolean;
  onCommand: (command: string) => void;
  language: string;
}

export interface VoiceNavigationRef {
  speak: (text: string) => void;
  startListening: () => void;
  stopListening: () => void;
}

const VoiceNavigation = forwardRef<VoiceNavigationRef, VoiceNavigationProps>(
  ({ enabled, onCommand, language }, ref) => {
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [isSupported, setIsSupported] = useState(false);

    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const synthRef = useRef<SpeechSynthesis | null>(null);

    useEffect(() => {
      // Check for browser support
      const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const speechSynthesis = window.speechSynthesis;
      
      setIsSupported(!!(SpeechRecognitionClass && speechSynthesis));
      
      if (SpeechRecognitionClass && speechSynthesis) {
        synthRef.current = speechSynthesis;
        
        const recognition = new SpeechRecognitionClass();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = getLanguageCode(language);
        
        recognition.onstart = () => {
          setIsListening(true);
          setTranscript('');
        };
        
        recognition.onresult = (event) => {
          let interimTranscript = '';
          let finalTranscript = '';
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            if (result.isFinal) {
              finalTranscript += result[0].transcript;
            } else {
              interimTranscript += result[0].transcript;
            }
          }
          
          setTranscript(finalTranscript || interimTranscript);
          
          if (finalTranscript) {
            onCommand(finalTranscript);
          }
        };
        
        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };
        
        recognition.onend = () => {
          setIsListening(false);
        };
        
        recognitionRef.current = recognition;
      }
      
      return () => {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
      };
    }, [language, onCommand]);

    const getLanguageCode = (lang: string) => {
      const langMap: { [key: string]: string } = {
        'en': 'en-US',
        'es': 'es-ES',
        'tl': 'tl-PH',
        'ja': 'ja-JP'
      };
      return langMap[lang] || 'en-US';
    };

    const speak = (text: string) => {
      if (!synthRef.current || !enabled) return;
      
      // Cancel any ongoing speech
      synthRef.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = getLanguageCode(language);
      utterance.rate = 0.8;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      synthRef.current.speak(utterance);
    };

    const startListening = () => {
      if (!recognitionRef.current || !enabled || isListening) return;
      
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
      }
    };

    const stopListening = () => {
      if (!recognitionRef.current || !isListening) return;
      
      recognitionRef.current.stop();
    };

    useImperativeHandle(ref, () => ({
      speak,
      startListening,
      stopListening
    }));

    if (!enabled || !isSupported) {
      return null;
    }

    return (
      <div className="fixed bottom-4 left-4 z-50">
        <Card className="p-4 space-y-3 bg-card/95 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Button
              variant={isListening ? "destructive" : "default"}
              size="sm"
              onClick={isListening ? stopListening : startListening}
              className="touch-target"
              aria-label={isListening ? "Stop listening" : "Start voice commands"}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => speak("Voice navigation is ready. Say 'add task colon' followed by your task, or say 'read tasks' to hear your current list.")}
              className="touch-target"
              aria-label="Test text-to-speech"
              disabled={isSpeaking}
            >
              <Volume2 className={`h-4 w-4 ${isSpeaking ? 'animate-pulse' : ''}`} />
            </Button>
          </div>
          
          {/* Live Transcript */}
          {isListening && (
            <div className="text-sm text-muted-foreground min-h-[20px]">
              {transcript || "Listening..."}
            </div>
          )}
          
          {/* Voice Commands Help */}
          <div className="text-xs text-muted-foreground space-y-1">
            <div><strong>Commands:</strong></div>
            <div>• "Add task: [task name]"</div>
            <div>• "Read tasks"</div>
            <div>• "Focus mode"</div>
          </div>
        </Card>
      </div>
    );
  }
);

VoiceNavigation.displayName = 'VoiceNavigation';

export default VoiceNavigation;