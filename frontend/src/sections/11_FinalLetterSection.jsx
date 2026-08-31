import React from 'react';
import { useNavigate } from 'react-router-dom';
import CinematicLayout from '../components/CinematicLayout';
import Envelope from '../components/Envelope';
import Button from '../components/Button';
import { APOLOGY_CONFIG } from '../content/apology';

export default function FinalLetterSection() {
  const navigate = useNavigate();
  const { finalLetter } = APOLOGY_CONFIG;

  return (
    <CinematicLayout currentStep={11} totalSteps={13} prevRoute="/10" nextRoute="/your-message">
      <div style={{ width: '100%', maxWidth: '720px', textAlign: 'center', padding: '0 20px' }}>
        {finalLetter.openingNote && (
          <p 
            className="animate-fade-in"
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: 'clamp(1.1rem, 2.2vw, 1.35rem)',
              lineHeight: '1.65',
              color: '#B8A8A0',
              marginBottom: '32px',
              fontStyle: 'italic',
              maxWidth: '580px',
              margin: '0 auto 32px auto'
            }}
          >
            “{finalLetter.openingNote}”
          </p>
        )}

        <div style={{ marginBottom: '32px' }}>
          <Envelope letterData={finalLetter} />
        </div>

        {finalLetter.transitionPrompt && (
          <p 
            className="animate-fade-in animate-delay-2"
            style={{
              color: '#8A7E78',
              fontSize: '0.9rem',
              letterSpacing: '0.04em',
              marginBottom: '24px',
              maxWidth: '520px',
              margin: '0 auto 24px auto'
            }}
          >
            {finalLetter.transitionPrompt}
          </p>
        )}

        <div className="animate-fade-in animate-delay-3">
          <Button onClick={() => navigate('/your-message')}>
            CONTINUE →
          </Button>
        </div>
      </div>
    </CinematicLayout>
  );
}
