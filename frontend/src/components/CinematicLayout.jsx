import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CinematicLayout({ 
  children, 
  currentStep = 1, 
  totalSteps = 13,
  prevRoute,
  nextRoute,
  onNext,
  onPrev
}) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['input', 'textarea'].includes(document.activeElement?.tagName?.toLowerCase())) {
        return;
      }
      if ((e.key === 'ArrowRight' || e.key === ' ') && nextRoute) {
        e.preventDefault();
        if (onNext) onNext();
        else navigate(nextRoute);
      } else if (e.key === 'ArrowLeft' && prevRoute) {
        e.preventDefault();
        if (onPrev) onPrev();
        else navigate(prevRoute);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextRoute, prevRoute, onNext, onPrev, navigate]);

  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  // Dynamic ambient glow mapping according to emotional progression
  const getAmbientBackground = () => {
    if (currentStep <= 4) {
      // Beginning: quiet, dark, restrained
      return 'radial-gradient(circle, rgba(111, 38, 56, 0.09) 0%, rgba(198, 167, 123, 0.03) 45%, transparent 75%)';
    } else if (currentStep <= 8) {
      // Middle: warmer, intimate, reflective
      return 'radial-gradient(circle, rgba(111, 38, 56, 0.14) 0%, rgba(198, 167, 123, 0.08) 50%, transparent 80%)';
    } else {
      // Ending: calm, spacious, dignified clarity
      return 'radial-gradient(circle, rgba(198, 167, 123, 0.08) 0%, rgba(111, 38, 56, 0.05) 45%, transparent 75%)';
    }
  };

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#090909',
      color: '#F5F2EE',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'fixed',
        top: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '640px',
        maxWidth: '92vw',
        height: '420px',
        background: getAmbientBackground(),
        transition: 'background 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '20px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 20,
        background: 'linear-gradient(to bottom, rgba(9,9,9,0.90) 0%, transparent 100%)',
        backdropFilter: 'blur(4px)'
      }}>
        <div style={{
          fontSize: '0.75rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#B8A8A0',
          opacity: 0.85,
          fontFamily: 'Inter, sans-serif'
        }}>
          An Apology
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            fontSize: '0.75rem',
            color: '#7A6F69',
            letterSpacing: '0.08em',
            fontFamily: 'Inter, sans-serif'
          }}>
            {currentStep} / {totalSteps}
          </span>
          <div style={{
            width: '50px',
            height: '2px',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #6F2638, #C6A77B)',
              transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }} />
          </div>
        </div>
      </header>

      <main style={{
        position: 'relative',
        zIndex: 10,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '90px 20px 60px 20px',
        maxWidth: '800px',
        width: '100%',
        margin: '0 auto'
      }}>
        {children}
      </main>

      <footer style={{
        position: 'relative',
        zIndex: 10,
        padding: '12px 24px 20px 24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '24px'
      }}>
        {prevRoute && (
          <button
            onClick={() => onPrev ? onPrev() : navigate(prevRoute)}
            style={{
              color: '#7A6F69',
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              transition: 'color 0.3s ease',
              padding: '6px 12px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#F5F2EE'  }
            onMouseLeave={(e) => e.currentTarget.style.color = '#7A6F69'  }
          >
            ← Previous
          </button>
        )}
      </footer>
    </div>
  );
}
