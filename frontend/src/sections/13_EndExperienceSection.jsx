import React, { useState } from 'react';
import CinematicLayout from '../components/CinematicLayout';
import Button from '../components/Button';
import { APOLOGY_CONFIG } from '../content/apology';

export default function EndExperienceSection() {
  const { 
    title, 
    paragraphs, 
    closing, 
    signature, 
    thankYou, 
    buttonText, 
    buttonAriaLabel, 
    fallbackMessage 
  } = APOLOGY_CONFIG.endExperience;
  const [ended, setEnded] = useState(false);

  const handleEndExperience = () => {
    setEnded(true);
    try {
      window.close();
    } catch (err) {
      // Browser security may prevent script-triggered window.close()
    }
  };

  return (
    <CinematicLayout currentStep={13} totalSteps={13} prevRoute="/12">
      <div style={{ width: '100%', maxWidth: '580px', textAlign: 'center', padding: '0 20px' }}>
        {/* Subtle Ambient Light Motif */}
        <div 
          className="animate-fade-in"
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#C6A77B',
            margin: '0 auto 24px auto',
            boxShadow: '0 0 16px rgba(198, 167, 123, 0.6)',
            opacity: 0.8
          }}
        />

        {/* Heading */}
        <h2 className="animate-fade-in"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
              color: '#F5F2EE',
              marginBottom: '28px',
              fontWeight: '400'
            }}>
          {title}
        </h2>

        {/* Reflection Paragraphs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '32px' }}>
          {paragraphs.map((para, idx) => (
            <p 
              key={idx}
              className={`animate-fade-in animate-delay-${Math.min(idx + 1, 4)}`}
              style={{
                color: idx === paragraphs.length - 1 ? '#F5F2EE' : '#B8A8A0',
                fontSize: '1rem',
                lineHeight: '1.85',
                fontWeight: idx === paragraphs.length - 1 ? '500' : '400'
              }}>
              {para}
            </p>
          ))}
        </div>

        {/* Sincere Signature Block */}
        <div className="animate-fade-in animate-delay-3" style={{ marginBottom: '24px' }}>
          {closing && (
            <p style={{
              color: '#8A7E78',
              fontSize: '0.9rem',
              marginBottom: '4px',
              fontStyle: 'italic'
            }}>
              {closing}
            </p>
          )}
          <p style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '1.4rem',
            color: '#C6A77B',
            fontStyle: 'italic',
            fontWeight: '600'
          }}>
            {signature}
          </p>
        </div>

        {/* Final Thank You Line */}
        {thankYou && (
          <p 
            className="animate-fade-in animate-delay-4"
            style={{
              color: '#7A6F69',
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '36px'
            }}
          >
            {thankYou}
          </p>
        )}

        {/* End Experience Action & Fallback */}
        {!ended ? (
          <div className="animate-fade-in animate-delay-5">
            <Button 
              variant="close" 
              onClick={handleEndExperience}
              aria-label={buttonAriaLabel || "Close the apology experience"}
            >
              {buttonText}
            </Button>
          </div>
        ) : (
          <div 
            className="animate-fade-in"
            style={{
              padding: '24px 28px',
              background: 'rgba(22, 20, 20, 0.85)',
              border: '1px solid rgba(198, 167, 123, 0.3)',
              borderRadius: '16px',
              color: '#C6A77B',
              fontSize: '0.98rem',
              lineHeight: '1.75',
              boxShadow: '0 16px 40px rgba(0,0,0,0.5)'
            }}>
            <p style={{ margin: 0 }}>{fallbackMessage}</p>
          </div>
        )}
      </div>
    </CinematicLayout>
  );
}
