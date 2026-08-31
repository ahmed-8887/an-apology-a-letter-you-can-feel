import React from 'react';

export default function ComparisonRow({ items = [] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '640px', margin: '0 auto' }}>
      {items.map((item, idx) => (
        <div 
          key={idx}
          className={`animate-fade-in animate-delay-${Math.min(idx + 1, 5)}`}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 24px 1fr',
            alignItems: 'center',
            padding: '18px 20px',
            background: 'rgba(22, 20, 20, 0.65)',
            border: '1px solid rgba(198, 167, 123, 0.12)',
            borderRadius: '12px',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.65rem', color: '#6F2638', letterSpacing: '0.1em', fontWeight: '600', textTransform: 'uppercase' }}>
              What I Did
            </span>
            <span style={{ color: '#B8A8A0', fontSize: '0.95rem', lineHeight: '1.4', textDecoration: 'line-through', opacity: 0.75 }}>
              {item.whatIDid}
            </span>
          </div>

          <div style={{ textAlign: 'center', color: '#C6A77B', fontSize: '1.1rem', opacity: 0.6 }}>
            →
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.65rem', color: '#C6A77B', letterSpacing: '0.1em', fontWeight: '600', textTransform: 'uppercase' }}>
              Should Have Done
            </span>
            <span style={{ color: '#F5F2EE', fontSize: '0.95rem', lineHeight: '1.4', fontWeight: '500' }}>
            {item.whatIShouldHaveDone}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
