import React from 'react';
import { useNavigate } from 'react-router-dom';
import CinematicLayout from '../components/CinematicLayout';
import Button from '../components/Button';
import { APOLOGY_CONFIG } from '../content/apology';

export default function WhatIGotWrongSection() {
  const navigate = useNavigate();
  const { whatIGotWrong } = APOLOGY_CONFIG;

  return (
    <CinematicLayout currentStep={5} totalSteps={13} prevRoute="/4" nextRoute="/6">
      <div style={{ width: '100%', maxWidth: '700px', textAlign: 'center', padding: '0 20px' }}>
        <h2 className="animate-fade-in"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1.5rem, 3.5vw, 2.05rem)',
              color: '#F5F2EE',
              marginBottom: '24px'
            }}>
          What I Got Wrong
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
          marginBottom: '36px'
        }}>
          {whatIGotWrong.map((card, idx) => (
            <div 
              key={card.id}
              className={`animate-fade-in animate-delay-${Math.min(idx + 1, 5)}`}
              style={{
                padding: '20px',
                background: 'rgba(22, 20, 20, 0.65)',
                border: '1px solid rgba(198, 167, 123, 0.15)',
                borderRadius: '14px',
                textAlign: 'left',
                backdropFilter: 'blur(10px)'
              }}
            >
              <span style={{
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                color: '#C6A77B',
                fontWeight: '600',
                display: 'block',
                marginBottom: '6px'
              }}>
                {card.category}
              </span>
              <p style={{ color: '#B8A8A0', fontSize: '0.95rem', lineHeight: '1.6' }}>
                {card.description}
              </p>
            </div>
          ))}
        </div>

        <Button onClick={() => navigate('/6')}>
          CONTINUE →
        </Button>
      </div>
    </CinematicLayout>
  );
}
