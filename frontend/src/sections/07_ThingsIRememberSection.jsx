import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CinematicLayout from '../components/CinematicLayout';
import MemoryCard from '../components/MemoryCard';
import Button from '../components/Button';
import { APOLOGY_CONFIG } from '../content/apology';
import { getPrivatePhotoUrl } from '../config/photoConfig';

export default function ThingsIRememberSection() {
  const navigate = useNavigate();
  const { memories, memoriesIntro } = APOLOGY_CONFIG;
  const [expandedMemory, setExpandedMemory] = useState(null);
  const [expandedImageLoaded, setExpandedImageLoaded] = useState(false);
  const [expandedImageFailed, setExpandedImageFailed] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && expandedMemory) {
        setExpandedMemory(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expandedMemory]);

  const expandedPhotoUrl = expandedMemory?.imageKey ? getPrivatePhotoUrl(expandedMemory.imageKey) : null;

  return (
    <CinematicLayout currentStep={7} totalSteps={13} prevRoute="/6" nextRoute="/8">
      <div style={{ width: '100%', maxWidth: '760px', textAlign: 'center', padding: '0 20px' }}>
        {/* Title */}
        <h2 className="animate-fade-in"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
              color: '#F5F2EE',
              marginBottom: '14px'
            }}>
          {memoriesIntro?.title || 'Things I Remember'}
        </h2>

        {/* Introduction / Subtitle */}
        {memoriesIntro?.subtitle && (
          <p className="animate-fade-in animate-delay-1"
             style={{
               color: '#B8A8A0',
               fontSize: '0.95rem',
               lineHeight: '1.7',
               maxWidth: '600px',
               margin: '0 auto 36px auto'
             }}>
            {memoriesIntro.subtitle}
          </p>
        )}

        {/* Memories Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '36px'
        }}>
          {memories.map((rec) => (
            <MemoryCard 
              key={rec.id} 
              memory={rec} 
              onExpand={(mem) => {
                setExpandedImageLoaded(false);
                setExpandedImageFailed(false);
                setExpandedMemory(mem);
              }}
            />
          ))}
        </div>

        {/* Transition Out */}
        {memoriesIntro?.transitionOut && (
          <p className="animate-fade-in animate-delay-3"
             style={{
               color: '#8A7E78',
               fontSize: '0.9rem',
               lineHeight: '1.6',
               fontStyle: 'italic',
               maxWidth: '540px',
               margin: '0 auto 28px auto'
             }}>
            “{memoriesIntro.transitionOut}”
          </p>
        )}

        <div className="animate-fade-in animate-delay-4">
          <Button onClick={() => navigate('/8')}>
            CONTINUE →
          </Button>
        </div>

        {/* Expanded Memory Modal */}
        {expandedMemory && (
          <div 
            role="dialog"
            aria-modal="true"
            aria-label={expandedMemory.title}
            className="animate-fade-in"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              background: 'rgba(9, 9, 9, 0.88)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '24px'
            }}
            onClick={() => setExpandedMemory(null)}
          >
            <div 
              style={{
                width: '100%',
                maxWidth: '560px',
                background: 'linear-gradient(180deg, #181615 0%, #121010 100%)',
                border: '1px solid rgba(198, 167, 123, 0.3)',
                borderRadius: '16px',
                padding: '28px',
                boxShadow: '0 24px 60px rgba(0,0,0,0.8)',
                textAlign: 'left',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setExpandedMemory(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(198, 167, 123, 0.25)',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  color: '#C6A77B',
                  fontSize: '1rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#C6A77B'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(198, 167, 123, 0.25)'}
              >
                ✕
              </button>

              {/* Date Header */}
              <span style={{
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                color: '#C6A77B',
                textTransform: 'uppercase',
                fontWeight: '600',
                display: 'block',
                marginBottom: '8px'
              }}>
                {expandedMemory.date || '[DATE]'}
              </span>

              {/* Title */}
              <h3 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.4rem',
                color: '#F5F2EE',
                marginBottom: '16px'
              }}>
                {expandedMemory.title}
              </h3>

              {/* Large Photo Area */}
              <div style={{
                height: '240px',
                width: '100%',
                background: 'linear-gradient(135deg, rgba(111, 38, 56, 0.3) 0%, rgba(20, 18, 18, 0.95) 100%)',
                borderRadius: '12px',
                border: '1px dashed rgba(198, 167, 123, 0.3)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                marginBottom: '18px'
              }}>
                {expandedPhotoUrl && !expandedImageFailed && (
                  <img 
                    src={expandedPhotoUrl}
                    alt={expandedMemory.title}
                    onLoad={() => setExpandedImageLoaded(true)}
                    onError={() => setExpandedImageFailed(true)}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: expandedImageLoaded ? 1 : 0,
                      transition: 'opacity 0.6s ease'
                    }}
                  />
                )}

                {(!expandedPhotoUrl || expandedImageFailed || !expandedImageLoaded) && (
                  <span style={{
                    fontSize: '0.85rem',
                    letterSpacing: '0.1em',
                    color: '#C6A77B',
                    padding: '8px 20px',
                    border: '1px solid rgba(198, 167, 123, 0.35)',
                    borderRadius: '9999px',
                    background: 'rgba(9, 9, 9, 0.85)'
                  }}>
                    ✦ {expandedMemory.placeholderLabel || expandedMemory.placeholderNote || '[PHOTO_PLACEHOLDER]'}
                  </span>
                )}
              </div>

              {/* Caption & Personal Note */}
              <p style={{
                color: '#F5F2EE',
                fontSize: '0.98rem',
                lineHeight: '1.7',
                marginBottom: expandedMemory.personalNote ? '14px' : '0'
              }}>
                {expandedMemory.caption}
              </p>

              {expandedMemory.personalNote && (
                <div style={{
                  padding: '12px 16px',
                  background: 'rgba(198, 167, 123, 0.08)',
                  borderLeft: '2px solid #C6A77B',
                  borderRadius: '4px',
                  color: '#C6A77B',
                  fontSize: '0.88rem',
                  lineHeight: '1.6',
                  fontStyle: 'italic'
                }}>
                  “{expandedMemory.personalNote}”
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </CinematicLayout>
  );
}
