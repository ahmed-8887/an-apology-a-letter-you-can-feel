import React, { useState } from 'react';
import { getPrivatePhotoUrl } from '../config/photoConfig';

export default function MemoryCard({ memory, onExpand }) {
  const [revealed, setRevealed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const photoUrl = memory.imageKey ? getPrivatePhotoUrl(memory.imageKey) : null;

  const handleCardClick = () => {
    if (!revealed) {
      setRevealed(true);
    } else if (onExpand) {
      onExpand(memory);
    }
  };

  return (
    <div style={{
      padding: '24px',
      background: 'rgba(22, 20, 20, 0.75)',
      border: '1px solid rgba(198, 167, 123, 0.18)',
      borderRadius: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      transition: 'all 0.4s ease',
      position: 'relative',
      overflow: 'hidden',
      textAlign: 'left'
    }}>
      {/* Date & Indicator */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{
          fontSize: '0.72rem',
          letterSpacing: '0.1em',
          color: '#C6A77B',
          textTransform: 'uppercase',
          fontWeight: '600'
        }}>
          {memory.date || '[DATE]'}
        </span>
        <button
          type="button"
          onClick={() => {
            if (!revealed) setRevealed(true);
            else if (onExpand) onExpand(memory);
          }}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '0.72rem',
            color: '#A89990',
            letterSpacing: '0.06em',
            cursor: 'pointer',
            padding: '2px 6px',
            borderRadius: '4px',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#F5F2EE'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#A89990'}
        >
          {revealed ? 'Expand ↗' : 'Click to view'}
        </button>
      </div>

      {/* Memory Photo & Visual Area */}
      <div 
        style={{
          height: '150px',
          background: 'linear-gradient(135deg, rgba(111, 38, 56, 0.25) 0%, rgba(20, 18, 18, 0.9) 100%)',
          borderRadius: '12px',
          border: '1px dashed rgba(198, 167, 123, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer'
        }}
        onClick={handleCardClick}
      >
        {/* Real photo if loaded and revealed */}
        {photoUrl && !imageFailed && revealed && (
          <img 
            src={photoUrl} 
            alt={memory.title}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageFailed(true)}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: imageLoaded ? 1 : 0,
              transition: 'opacity 0.6s ease'
            }}
          />
        )}

        <div style={{
          position: 'absolute',
          inset: 0,
          backdropFilter: revealed && (!photoUrl || imageFailed) ? 'none' : (!revealed ? 'blur(10px)' : 'none'),
          background: revealed ? (imageLoaded ? 'transparent' : 'rgba(0, 0, 0, 0.35)') : 'rgba(9, 9, 9, 0.6)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          {!revealed ? (
            <span style={{
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#C6A77B',
              padding: '8px 18px',
              border: '1px solid rgba(198, 167, 123, 0.3)',
              borderRadius: '9999px',
              background: 'rgba(9, 9, 9, 0.85)'
            }}>
              ✦ REVEAL MEMORY
            </span>
          ) : (!imageLoaded && (
            <span style={{ color: '#C6A77B', fontSize: '0.8rem', opacity: 0.9, letterSpacing: '0.08em' }}>
              {memory.placeholderLabel || memory.placeholderNote || '[PRIVATE_PHOTO_PLACEHOLDER]'}
            </span>
          ))}
        </div>
      </div>

      {/* Title & Description */}
      <div>
        <h4 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1.15rem',
          color: '#F5F2EE',
          marginBottom: '6px'
        }}>
          {memory.title}
        </h4>
        <p style={{ color: '#B8A8A0', fontSize: '0.9rem', lineHeight: '1.6' }}>
          {memory.caption}
        </p>

        {/* Revealed Personal Note */}
        {revealed && memory.personalNote && (
          <div 
            className="animate-fade-in"
            style={{
              marginTop: '12px',
              padding: '12px 14px',
              background: 'rgba(198, 167, 123, 0.08)',
              borderLeft: '2px solid #C6A77B',
              borderRadius: '4px',
              color: '#F5F2EE',
              fontSize: '0.85rem',
              lineHeight: '1.55',
              fontStyle: 'italic'
            }}
          >
            “{memory.personalNote}”
          </div>
        )}
      </div>
    </div>
  );
}
