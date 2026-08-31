import React from 'react';
import { useNavigate } from 'react-router-dom';
import CinematicLayout from '../components/CinematicLayout';
import Button from '../components/Button';
import { APOLOGY_CONFIG } from '../content/apology';

export default function IDontExpectAnythingSection() {
  const navigate = useNavigate();
  const { transitionLeadIn, points, buttonText } = APOLOGY_CONFIG.iDontExpectAnything;

  return (
    <CinematicLayout currentStep={10} totalSteps={13} prevRoute="/9" nextRoute="/11">
      <div style={{ maxWidth: '580px', width: '100%', textAlign: 'center', padding: '0 20px' }}>
        <h2 className="animate-fade-in"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
              color: '#C6A77B',
              marginBottom: transitionLeadIn ? '12px' : '28px',
              fontStyle: 'italic'
            }}>
          I Don't Expect Anything
        </h2>

        {transitionLeadIn && (
          <p className="animate-fade-in animate-delay-1"
             style={{
               color: '#B8A8A0',
               fontSize: '0.95rem',
               marginBottom: '28px',
               lineHeight: '1.6'
             }}>
            {transitionLeadIn}
          </p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '40px' }}>
          {points.map((point, idx) => (
            <p 
              key={idx}
              className={`animate-fade-in animate-delay-${Math.min(idx + 1, 5)}`}
              style={{
                color: idx === points.length - 1 ? '#F5F2EE' : '#B8A8A0',
                fontSize: '1.05rem',
                lineHeight: '1.7',
                fontWeight: idx === points.length - 1 ? '500' : '400'
              }}>
              {point}
            </p>
          ))}
        </div>

        <div className="animate-fade-in animate-delay-5">
          <Button onClick={() => navigate('/11')}>
            {buttonText}
          </Button>
        </div>
      </div>
    </CinematicLayout>
  );
}
