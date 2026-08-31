import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CinematicLayout from '../components/CinematicLayout';
import Button from '../components/Button';
import { APOLOGY_CONFIG } from '../content/apology';

export default function FinalChoiceSection() {
  const navigate = useNavigate();
  const { title, intro, options, closingNote } = APOLOGY_CONFIG.finalChoice;
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <CinematicLayout currentStep={12} totalSteps={13} prevRoute="/11" nextRoute="/13">
      <div style={{ width: '100%', maxWidth: '620px', textAlign: 'center', padding: '0 20px' }}>
        {/* Title */}
        <h2 className="animate-fade-in"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
              color: '#F5F2EE',
              marginBottom: '16px'
            }}>
          {title || "Whatever you feel right now is okay."}
        </h2>

        {/* Intro Points */}
        <div style={{ marginBottom: '32px' }}>
          {intro && intro.map((line, idx) => (
            <p 
              key={idx}
              className={`animate-fade-in animate-delay-${Math.min(idx + 1, 3)}`}
              style={{
                color: idx === intro.length - 1 ? '#F5F2EE' : '#B8A8A0',
                fontSize: '0.95rem',
                lineHeight: '1.7',
                marginBottom: '6px',
                fontWeight: idx === intro.length - 1 ? '500' : '400'
              }}
            >
              {line}
            </p>
          ))}
        </div>

        {/* The 3 Equal Respectful Choices */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
          {options.map((opt, idx) => {
            const isSelected = selectedOption?.id === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedOption(opt)}
                className={`animate-fade-in animate-delay-${Math.min(idx + 2, 5)}`}
                style={{
                  padding: '18px 24px',
                  background: isSelected ? 'rgba(111, 38, 56, 0.3)' : 'rgba(22, 20, 20, 0.65)',
                  border: isSelected ? '1px solid #C6A77B' : '1px solid rgba(198, 167, 123, 0.18)',
                  borderRadius: '12px',
                  color: isSelected ? '#F5F2EE' : '#D0C4BC',
                  fontSize: '0.95rem',
                  letterSpacing: '0.02em',
                  fontWeight: '500',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isSelected ? '0 8px 24px rgba(111, 38, 56, 0.2)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = 'rgba(198, 167, 123, 0.4)';
                    e.currentTarget.style.color = '#F5F2EE';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = 'rgba(198, 167, 123, 0.18)';
                    e.currentTarget.style.color = '#D0C4BC';
                  }
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Respectful Acknowledgement */}
        {selectedOption && (
          <div 
            className="animate-fade-in"
            style={{
              padding: '20px 24px',
              background: 'rgba(198, 167, 123, 0.08)',
              border: '1px solid rgba(198, 167, 123, 0.25)',
              borderRadius: '12px',
              marginBottom: '24px',
              textAlign: 'center'
            }}
          >
            <p style={{
              color: '#F5F2EE',
              fontSize: '0.98rem',
              lineHeight: '1.7',
              fontStyle: 'italic',
              margin: 0
            }}>
              “{selectedOption.acknowledgement}”
            </p>
          </div>
        )}

        {/* Closing Note & Continuation */}
        {closingNote && (
          <p 
            className="animate-fade-in animate-delay-3"
            style={{
              color: '#8A7E78',
              fontSize: '0.88rem',
              letterSpacing: '0.03em',
              marginBottom: '24px',
              maxWidth: '500px',
              margin: '0 auto 24px auto'
            }}
          >
            {closingNote}
          </p>
        )}

        <div className="animate-fade-in animate-delay-4">
          <Button onClick={() => navigate('/13')}>
            CONTINUE →
          </Button>
        </div>
      </div>
    </CinematicLayout>
  );
}
