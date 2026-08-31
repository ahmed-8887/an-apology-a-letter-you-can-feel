import React, { useState } from 'react';

export default function Envelope({ letterData }) {
  const [opened, setOpened] = useState(false);

  return (
    <div style={{ width: '100%', maxWidth: '680px', margin: '0 auto' }}>
      {!opened ? (
        <button
          type="button"
          onClick={() => setOpened(true)}
          style={{
            width: '100%',
            maxWidth: '460px',
            height: '270px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, #1C1919 0%, #121111 100%)',
            border: '1px solid rgba(198, 167, 123, 0.35)',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '18px',
            cursor: 'pointer',
            boxShadow: '0 20px 50px rgba(0,0,0,0.55)',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            padding: '24px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.borderColor = 'rgba(198, 167, 123, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'rgba(198, 167, 123, 0.35)';
          }}
        >
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6F2638, #882E46)',
            border: '1px solid rgba(198, 167, 123, 0.45)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.25rem',
            boxShadow: '0 6px 16px rgba(111, 38, 56, 0.45)',
            color: '#F5F2EE'
          }}>
            ✉
          </div>

          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '1.15rem',
              color: '#C6A77B',
              marginBottom: '6px',
              fontWeight: '500'
            }}>
              {letterData.heading}
            </p>
            <span style={{
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#8A7E78'
            }}>
              Click to open and read
            </span>
          </div>
        </button>
      ) : (
        <div
          className="animate-fade-in-slow"
          style={{
            padding: '44px 38px',
            background: 'linear-gradient(180deg, #181615 0%, #121010 100%)',
            border: '1px solid rgba(198, 167, 123, 0.28)',
            borderTop: '2px solid #C6A77B',
            borderRadius: '16px',
            boxShadow: '0 24px 60px rgba(0,0,0,0.65)',
            textAlign: 'left'
          }}
        >
          <p style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '1.5rem',
            color: '#C6A77B',
            marginBottom: '28px',
            fontStyle: 'italic',
            letterSpacing: '0.02em'
          }}>
            {letterData.recipient}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {letterData.body.map((para, i) => (
              <p 
                key={i}
                style={{
                  color: '#F5F2EE',
                  fontSize: '1.05rem',
                  lineHeight: '1.9',
                  opacity: 0.95,
                  letterSpacing: '0.01em'
                }}
              >
                {para}
              </p>
            ))}
          </div>

          <div style={{ marginTop: '36px', textAlign: 'right', borderTop: '1px solid rgba(198, 167, 123, 0.15)', paddingTop: '24px' }}>
            <p style={{ color: '#A89990', fontSize: '0.95rem', marginBottom: '6px' }}>
              {letterData.closing}
            </p>
            <p style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: '1.35rem',
              color: '#C6A77B',
              fontStyle: 'italic',
              fontWeight: '600',
              marginBottom: '8px'
            }}>
              {letterData.signature}
            </p>
            {letterData.postscript && (
              <p style={{
                color: '#8A7E78',
                fontSize: '0.9rem',
                fontStyle: 'italic',
                letterSpacing: '0.04em'
              }}>
                {letterData.postscript}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
