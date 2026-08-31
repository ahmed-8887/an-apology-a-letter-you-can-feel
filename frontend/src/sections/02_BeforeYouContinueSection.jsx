import React from 'react';
import { useNavigate } from 'react-router-dom';
import CinematicLayout from '../components/CinematicLayout';
import Button from '../components/Button';
import { APOLOGY_CONFIG } from '../content/apology';

export default function BeforeYouContinueSection() {
  const navigate = useNavigate();
  const { title, points, buttonText } = APOLOGY_CONFIG.beforeYouContinue;

  return (
    <CinematicLayout currentStep={2} totalSteps={13} prevRoute="/1" nextRoute="/3">
      <div style={{ textAlign: 'center', maxWidth: '580px', padding: '0 20px' }}>
        <h2 className="animate-fade-in"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
              color: '#C6A77B',
              marginBottom: '28px',
              fontItalic: 'italic'
            }}>
          {title}
        </h2>

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
          <Button onClick={() => navigate('/3')}>
            {buttonText}
          </Button>
        </div>
      </div>
    </CinematicLayout>
  );
}
