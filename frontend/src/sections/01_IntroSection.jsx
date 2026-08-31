import React from 'react';
import { useNavigate } from 'react-router-dom';
import CinematicLayout from '../components/CinematicLayout';
import Button from '../components/Button';
import { APOLOGY_CONFIG } from '../content/apology';

export default function IntroSection() {
  const navigate = useNavigate();
  const { line1, line2, subtext, buttonText } = APOLOGY_CONFIG.intro;

  return (
    <CinematicLayout currentStep={1} totalSteps={13} nextRoute="/2">
      <div style={{ textAlign: 'center', maxWidth: '640px', padding: '0 20px' }}>
        <p className="animate-fade-in-slow" 
           style={{
             fontFamily: 'Playfair Display, Georgia, serif',
             fontSize: 'clamp(1.45rem, 3vw, 2.05rem)',
             lineHeight: '1.5',
             color: '#F5F2EE',
             marginBottom: '20px',
             fontWeight: '400',
             letterSpacing: '0.01em'
           }}>
          {line1}
        </p>

        <p className="animate-fade-in animate-delay-2"
           style={{
             fontFamily: 'Playfair Display, Georgia, serif',
             fontSize: 'clamp(1.25rem, 2.4vw, 1.65rem)',
             lineHeight: '1.6',
             color: '#C6A77B',
             marginBottom: subtext ? '24px' : '48px',
             fontStyle: 'italic'
           }}>
          {line2}
        </p>

        {subtext && (
          <p className="animate-fade-in animate-delay-3"
             style={{
               color: '#7A6F69',
               fontSize: '0.875rem',
               letterSpacing: '0.05em',
               marginBottom: '44px'
             }}>
            {subtext}
          </p>
        )}

        <div className="animate-fade-in animate-delay-4">
          <Button onClick={() => navigate('/2')}>
            {buttonText}
          </Button>
        </div>
      </div>
    </CinematicLayout>
  );
}
