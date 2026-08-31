import React from 'react';

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '', 
  disabled = false,
  ...props 
}) {
  const styleMap = {
    primary: {
      padding: '13px 30px',
      background: 'linear-gradient(135deg, #6F2638 0%, #832C42 100%)',
      color: '#F5F2EE',
      border: '1px solid rgba(198, 167, 123, 0.3)',
      borderRadius: '9999px',
      letterSpacing: '0.08em',
      fontSize: '0.85rem',
      fontWeight: '500',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: '0 8px 24px rgba(111, 38, 56, 0.25)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px'
    },
    outline: {
      padding: '12px 28px',
      background: 'rgba(255, 255, 255, 0.02)',
      color: '#F5F2EE',
      border: '1px solid rgba(198, 167, 123, 0.25)',
      borderRadius: '9999px',
      letterSpacing: '0.08em',
      fontSize: '0.85rem',
      fontWeight: '500',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px'
    },
    subtle: {
      padding: '9px 18px',
      background: 'transparent',
      color: '#B8A8A0',
      border: 'none',
      letterSpacing: '0.06em',
      fontSize: '0.8rem',
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px'
    },
    close: {
      padding: '15px 34px',
      background: 'rgba(24, 22, 22, 0.95)',
      color: '#C6A77B',
      border: '1px solid rgba(198, 167, 123, 0.45)',
      borderRadius: '9999px',
      letterSpacing: '0.1em',
      fontSize: '0.875rem',
      fontWeight: '600',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px'
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...styleMap[variant],
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}
