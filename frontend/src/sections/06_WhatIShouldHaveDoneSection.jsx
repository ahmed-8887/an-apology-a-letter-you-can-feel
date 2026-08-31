import React from 'react';
import { useNavigate } from 'react-router-dom';
import CinematicLayout from '../components/CinematicLayout';
import ComparisonRow from '../components/ComparisonRow';
import Button from '../components/Button';
import { APOLOGY_CONFIG } from '../content/apology';

export default function WhatIShouldHaveDoneSection() {
  const navigate = useNavigate();
  const { shouldHaveDone } = APOLOGY_CONFIG;

  return (
    <CinematicLayout currentStep={6} totalSteps={13} prevRoute="/5" nextRoute="/7">
      <div style={{ width: '100%', textAlign: 'center', padding: '0 20px' }}>
        <h2 className="animate-fade-in"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1.5rem, 3.5vw, 2.05rem)',
              color: '#F5F2EE',
              marginBottom: '28px'
            }}>
          What I Should Have Done
        </h2>

        <div style={{ marginBottom: '36px' }}>
          <ComparisonRow items={shouldHaveDone} />
        </div>

        <Button onClick={() => navigate('/7')}>
          CONTINUE →
        </Button>
      </div>
    </CinematicLayout>
  );
}
