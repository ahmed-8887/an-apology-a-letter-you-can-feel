import React from 'react';
import { useNavigate } from 'react-router-dom';
import CinematicLayout from '../components/CinematicLayout';
import Button from '../components/Button';
import { APOLOGY_CONFIG } from '../content/apology';

export default function WhatINeedToSaySection() {
  const navigate = useNavigate();
  const { title, paragraphs, buttonText } = APOLOGY_CONFIG.whatINeedToSay;

  return (
    <CinematicLayout currentStep={3} totalSteps={13} prevRoute="/2" nextRoute="/4">
      <div style={{ maxWidth: '600px', width: '100%', padding: '0 20px', textAlign: 'center' }}>
        <div 
          className="animate-fade-in"
          style={{
            padding: '36px 28px',
            background: 'rgba(22, 20, 20, 0.75)',
            border: '1px solid rgba(198, 167, 123, 0.18)',
            borderRadius: '16px',
            marginBottom: '36px',
            backdropFilter: 'blur(12px)'
          }}
        >
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.5rem',
            color: '#C6A77B',
            marginBottom: '24px',
            fontStyle: 'italic'
          }}>
            {title}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {paragraphs.map((para, idx) => (
              <p 
                key={idx}
                style={{
                  color: idx === paragraphs.length - 1 ? '#F5F2EE' : '#B8A8A0',
                  fontSize: '1rem',
                  lineHeight: '1.75',
                  fontWeight: idx === paragraphs.length - 1 ? '600' : '400'
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>

        <Button onClick={() => navigate('/4')}>
          {buttonText}
        </Button>
      </div>
    </CinematicLayout>

  );
}
