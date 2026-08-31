import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CinematicLayout from '../components/CinematicLayout';
import Button from '../components/Button';
import { APOLOGY_CONFIG } from '../content/apology';
import { tracker } from '../services/tracker';

export default function YourMessageSection() {
  const navigate = useNavigate();
  const config = (APOLOGY_CONFIG && APOLOGY_CONFIG.yourMessage) || {
    title: "There’s Something I Want to Hear From You",
    subtitle: "If there is anything you want to say, share how you felt, or leave a thought for me — you can write a message or record your voice below. Take your time, with zero pressure.",
    textPlaceholder: "Write anything you want to say...",
    recordButtonText: "Record a Voice Message",
    recordingText: "Recording audio...",
    stopButtonText: "Stop Recording",
    deleteButtonText: "Delete Recording",
    recordAgainText: "Record Again",
    submitButtonText: "SEND MESSAGE",
    successMessage: "Thank you. Your message has been safely saved.",
    micErrorText: "Your microphone isn't available right now. You can still write your message instead.",
    continueWithoutMessageText: "CONTINUE →"
  };

  const [textMessage, setTextMessage] = useState('');
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [voiceDurationFormatted, setVoiceDurationFormatted] = useState('');
  const [micError, setMicError] = useState(null);

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const streamRef = useRef(null);

  // Track page view
  useEffect(() => {
    tracker.trackEvent('message_page_viewed');
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleTextChange = (e) => {
    setTextMessage(e.target.value);
    if (!hasStartedTyping) {
      setHasStartedTyping(true);
      tracker.trackEvent('text_message_started');
    }
  };

  const startVoiceRecording = async () => {
    setMicError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setMicError(config.micErrorText);
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const mimeType = mediaRecorder.mimeType || 'audio/webm';
        const blob = new Blob(audioChunksRef.current, { type: mimeType });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(t => t.stop());
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);
      try { tracker.trackEvent('voice_recording_started'); } catch (e) {}

      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.warn('Microphone error:', err);
      setMicError(config.micErrorText);
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
      const durationStr = formatTimer(recordingSeconds);
      setVoiceDurationFormatted(durationStr);
      try { tracker.trackEvent('voice_recording_stopped', { durationSeconds: recordingSeconds, duration: durationStr }); } catch (e) {}
    }
  };

  const deleteVoiceRecording = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingSeconds(0);
    setVoiceDurationFormatted('');
    try { tracker.trackEvent('voice_recording_deleted'); } catch (e) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!textMessage.trim() && !audioBlob) {
      setSubmitError('Please write a message or record a voice note before sending.');
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    try {
      const ok = await tracker.submitMessage({
        textMessage: textMessage.trim() || null,
        voiceBlob: audioBlob || null,
        voiceDuration: voiceDurationFormatted || (audioBlob ? formatTimer(recordingSeconds) : null)
      });

      if (ok) {
        setSubmitted(true);
        try {
          tracker.trackEvent('message_submission_completed', {
            hasText: Boolean(textMessage.trim()),
            hasVoice: Boolean(audioBlob),
            voiceDuration: voiceDurationFormatted
          });
        } catch (e) {}
      } else {
        setSubmitError('Unable to send message right now. You can still continue to the next step.');
      }
    } catch (err) {
      setSubmitError('Unable to send message right now. You can still continue to the next step.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <CinematicLayout currentStep={11} totalSteps={13} prevRoute="/11" nextRoute="/12">
      <div style={{ width: '100%', maxWidth: '640px', textAlign: 'center', padding: '0 20px' }}>
        {/* Heading */}
        <h2 className="animate-fade-in"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
              color: '#F5F2EE',
              marginBottom: '14px',
              fontWeight: '400'
            }}>
          {config.title}
        </h2>

        {/* Subtitle */}
        <p className="animate-fade-in animate-delay-1"
           style={{
             color: '#B8A8A0',
             fontSize: '0.95rem',
             lineHeight: '1.7',
             maxWidth: '560px',
             margin: '0 auto 28px auto'
           }}>
          {config.subtitle}
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="animate-fade-in animate-delay-2" style={{ textAlign: 'left' }}>
            {/* Written Message Area */}
            <div style={{ marginBottom: '24px' }}>
              <label 
                htmlFor="visitor-text-message"
                style={{
                  display: 'block',
                  fontSize: '0.78rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#C6A77B',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}
              >
                Write a Message
              </label>
              <textarea
                id="visitor-text-message"
                rows={5}
                value={textMessage}
                onChange={handleTextChange}
                placeholder={config.textPlaceholder}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: 'rgba(22, 20, 20, 0.75)',
                  border: '1px solid rgba(198, 167, 123, 0.25)',
                  borderRadius: '12px',
                  color: '#F5F2EE',
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#C6A77B'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(198, 167, 123, 0.25)'  }
              />
            </div>

            {/* Voice Message Recorder Area */}
            <div style={{
              padding: '20px',
              background: 'rgba(22, 20, 20, 0.6)',
              border: '1px solid rgba(198, 167, 123, 0.2)',
              borderRadius: '12px',
              marginBottom: '28px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{
                  fontSize: '0.78rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#C6A77B',
                  fontWeight: '600'
                }}>
                  Voice Message (Optional)
                </span>
                {isRecording && (
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#E0556D',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}>
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#E0556D',
                      display: 'inline-block',
                      animation: 'pulse 1.2s infinite'
                    }} />
                    {formatTimer(recordingSeconds)}
                  </span>
                )}
              </div>

              {/* Mic Error Banner */}
              {micError && (
                <p style={{ color: '#A89990', fontSize: '0.85rem', lineHeight: '1.5', margin: '0 0 12px 0' }}>
                  {micError}
                </p>
              )}

              {/* Voice Controls */}
              {!isRecording && !audioUrl && (
                <button
                  type="button"
                  onClick={startVoiceRecording}
                  style={{
                    padding: '12px 20px',
                    background: 'rgba(198, 167, 123, 0.1)',
                    border: '1px solid rgba(198, 167, 123, 0.3)',
                    borderRadius: '8px',
                    color: '#F5F2EE',
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    minHeight: '44px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = '#C6A77B'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(198, 167, 123, 0.3)'}
                >
                  🎙 {config.recordButtonText}
                </button>
              )}

              {isRecording && (
                <button
                  type="button"
                  onClick={stopVoiceRecording}
                  style={{
                    padding: '12px 24px',
                    background: 'rgba(224, 90, 109, 0.25)',
                    border: '1px solid #E05A6D',
                    borderRadius: '8px',
                    color: '#F5F2EE',
                    fontSize: '0.88rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    minHeight: '44px'
                  }}
                >
                  ⏱ {config.stopButtonText}
                </button>
              )}

              {audioUrl && !isRecording && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <audio controls src={audioUrl} style={{ width: '100%', height: '40px' }} />
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={deleteVoiceRecording}
                      style={{
                        padding: '8px 14px',
                        background: 'transparent',
                        border: '1px solid rgba(224, 90, 109, 0.4)',
                        borderRadius: '6px',
                        color: '#E05A6D',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        minHeight: '38px'
                      }}
                    >
                      🗑 {config.deleteButtonText}
                    </button>
                    <button
                      type="button"
                      onClick={startVoiceRecording}
                      style={{
                        padding: '8px 14px',
                        background: 'transparent',
                        border: '1px solid rgba(198, 167, 123, 0.3)',
                        borderRadius: '6px',
                        color: '#C6A77B',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        minHeight: '38px'
                      }}
                    >
                      🎙 {config.recordAgainText}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Error Message */}
            {submitError && (
              <p style={{ color: '#E05A6D', fontSize: '0.88rem', marginBottom: '16px' }}>
                {submitError}
              </p>
            )}

            {/* Submission Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
              {(textMessage.trim() || audioBlob) && (
                <Button 
                  type="submit" 
                  disabled={submitting}
                  style={{ width: '100%', maxWidth: '320px' }}
                >
                  {submitting ? 'SENDING...' : config.submitButtonText}
                </Button>
              )}

              <button
                type="button"
                onClick={() => navigate('/12')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#8A7E78',
                  fontSize: '0.85rem',
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  padding: '10px 16px',
                  textTransform: 'uppercase',
                  minHeight: '44px',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#F5F2EE'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#8A7E78'}
              >
                {config.continueWithoutMessageText}
              </button>
            </div>
          </form>
        ) : (
          <div className="animate-fade-in" style={{
            padding: '28px 24px',
            background: 'rgba(198, 167, 123, 0.08)',
            border: '1px solid rgba(198, 167, 123, 0.3)',
            borderRadius: '16px',
            marginBottom: '32px'
          }}>
            <p style={{
              color: '#F5F2EE',
              fontSize: '1.05rem',
              lineHeight: '1.7',
              marginBottom: '20px'
            }}>
              {config.successMessage}
            </p>
            <Button onClick={() => navigate('/12')}>
              {config.continueWithoutMessageText}
            </Button>
          </div>
        )}
      </div>
    </CinematicLayout>
  );
}