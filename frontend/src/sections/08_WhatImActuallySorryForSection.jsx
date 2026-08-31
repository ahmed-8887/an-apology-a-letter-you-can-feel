import React from 'react';
import { useNavigate } from 'react-router-dom';
import CinematicLayout from '../components/CinematicLayout';
import Button from '../components/Button';
import { APOLOGY_CONFIG } from '../content/apology';

export default function WhatImActuallySorryForSection() {
  const navigate = useNavigate();
  const { intro, transitionLeadIn, points } = APOLOGY_CONFIG.actuallySorryFor;

  return (
    <CinematicLayout currentStep={8} totalSteps={13} prevRoute="/7" nextRoute="/9">
      <div style={{ width: '100%', maxWidth: '600px', textAlign: 'center', padding: '0 20px' }}>
        <h2 className="animate-fade-in"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              color: '#C6A77B',
              marginBottom: transitionLeadIn ? '12px' : '28px',
              fontStyle: 'italic'
            }}>
          {intro}
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
          {points.map((point, idx) => (
            <div 
              key={idx}
              className={`animate-fade-in animate-delay-${Math.min(idx + 1, 5)}`}
              style={{
                padding: '20px 24px',
                background: 'rgba(22, 20, 20, 0.75)',
                border: '1px solid rgba(198, 167, 123, 0.16)',
                borderRadius: '12px',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}>
              <span style={{ color: '#6F2638', fontSize: '1.2rem' }}>—</span>
              <p style={{ color: '#F5F2EE', fontSize: '0.95rem', lineHeight: '1.6' }}>
                {point}
              </p>
            </div>
          ))}
        </div>

        <Button onClick={() => navigate('/9')}>
          CONTINUE →
        </Button>
      </div>
    </CinematicLayout>
  );
}
