import React from 'react';
import { useNavigate } from 'react-router-dom';
import CinematicLayout from '../components/CinematicLayout';
import Button from '../components/Button';
import { APOLOGY_CONFIG } from '../content/apology';

export default function TheMainApologySection() {
  const navigate = useNavigate();
  const { heading, subheading, paragraphs } = APOLOGY_CONFIG.mainApology;

  return (
    <CinematicLayout currentStep={9} totalSteps={13} prevRoute="/8" nextRoute="/10">
      <div style={{ width: '100%', maxWidth: '640px', textAlign: 'center', padding: '0 20px' }}>
        <h1 className="animate-fade-in"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.3rem, 5vw, 3.2rem)',
              color: '#F5F2EE',
              marginBottom: '8px',
              letterSpacing: '0.01em'
            }}>
          {heading}
        </h1>

        <p className="animate-fade-in animate-delay-1"
           style={{
             fontFamily: 'Playfair Display, serif',
             fontSize: '1.1rem',
             color: '#C6A77B',
             marginBottom: '32px',
             fontStyle: 'italic'
           }}>
          {subheading}
        </p>

        <div 
          className="animate-fade-in animate-delay-2"
          style={{
            padding: '36px 30px',
            background: 'rgba(22, 20, 20, 0.75)',
            border: '1px solid rgba(198, 167, 123, 0.18)',
            borderRadius: '16px',
            marginBottom: '36px',
            backdropFilter: 'blur(12px)'
          }}
        >
          {paragraphs.map((para, idx) => (
            <p 
              key={idx}
              style={{
                color: '#B8A8A0',
                fontSize: '1rem',
                lineHeight: '1.85',
                marginBottom: idx === paragraphs.length - 1 ? 0 : '18px'
              }}>
              {para}
            </p>
          ))}
        </div>

        <Button onClick={() => navigate('/10')}>
          CONTINUE →
        </Button>
      </div>
    </CinematicLayout>
  );
}
