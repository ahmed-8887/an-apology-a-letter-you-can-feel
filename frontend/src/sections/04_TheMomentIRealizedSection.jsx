import React from 'react';
import { useNavigate } from 'react-router-dom';
import CinematicLayout from '../components/CinematicLayout';
import Timeline from '../components/Timeline';
import Button from '../components/Button';
import { APOLOGY_CONFIG } from '../content/apology';

export default function TheMomentIRealizedSection() {
  const navigate = useNavigate();
  const { timelineStages } = APOLOGY_CONFIG;

  return (
    <CinematicLayout currentStep={4} totalSteps={13} prevRoute="/3" nextRoute="/5">
      <div style={{ width: '100%', textAlign: 'center', padding: '0 20px' }}>
        <h2 className="animate-fade-in"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1.5rem, 3.5vw, 2.05rem)',
              color: '#F5F2EE',
              marginBottom: '24px'
            }}>
          The Moment I Realized
        </h2>

        <div style={{ marginBottom: '36px' }}>
          <Timeline stages={timelineStages} />
        </div>

        <Button onClick={() => navigate('/5')}>
          CONTINUE →
        </Button>
      </div>
    </CinematicLayout>

  );
}
