import React, { useState } from 'react';

export default function Timeline({ stages = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentStage = stages[activeIndex] || stages[0];

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '32px',
        padding: '6px',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(198, 167, 123, 0.15)',
        borderRadius: '9999px'
      }}>
        {stages.map((stage, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveIndex(idx)}
              style={{
                flex: 1,
                padding: '10px 16px',
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                borderRadius: '9999px',
                background: isActive ? 'linear-gradient(135deg, #6F2638, #832C42)' : 'transparent',
                color: isActive ? '#F5F2EE' : '#7A6F69',
                border: isActive ? '1px solid rgba(198, 167, 123, 0.4)' : '1px solid transparent',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                fontWeight: isActive ? '600' : '400',
                boxShadow: isActive ? '0 4px 16px rgba(111, 38, 56, 0.3)' : 'none'
              }}
            >
              {stage.label}
            </button>
          );
        })}
      </div>

      <div
        key={currentStage.id}
        className="animate-fade-in"
        style={{
          padding: '32px 28px',
          background: 'rgba(22, 20, 20, 0.75)',
          border: '1px solid rgba(198, 167, 123, 0.18)',
          borderRadius: '16px',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.35)'
        }}
      >
        <h3 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1.35rem',
          color: '#C6A77B',
          marginBottom: '14px',
          fontWeight: '400',
          fontStyle: 'italic'
        }}>
          {currentStage.title}
        </h3>
        <p style={{
          color: '#B8A8A0',
          fontSize: '1.05rem',
          lineHeight: '1.8',
          fontFamily: 'Inter, sans-serif'
        }}>
          {currentStage.content}
        </p>
      </div>
    </div>
  );
}
