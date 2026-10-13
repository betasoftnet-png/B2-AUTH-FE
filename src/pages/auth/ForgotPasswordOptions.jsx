import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Smartphone, Mail, ChevronRight } from 'lucide-react';

const ForgotPasswordOptions = () => {
  const {
    setView,
    loading,
    recoveryOptions,
    handleSendOtp,
    selectedRecoveryMethod,
    setSelectedRecoveryMethod,
    error,
    setError,
  } = useAppContext();

  const [activeMethod, setActiveMethod] = useState(selectedRecoveryMethod || '');

  const onSelectMethod = (method) => {
    setActiveMethod(method);
    if (setSelectedRecoveryMethod) {
      setSelectedRecoveryMethod(method);
    }
    handleSendOtp(method);
  };

  return (
    <div className="b2auth-recovery-container">
      <div className="b2auth-recovery-header">
        <h1 className="b2auth-recovery-title">Account Recovery</h1>
        <p className="b2auth-recovery-description">
          Choose how you’d like to verify your identity and recover your account.
        </p>
      </div>

      {error && (
        <div className="b2auth-inline-error" role="alert" style={{ marginTop: '0', marginBottom: '16px' }}>
          {error}
        </div>
      )}

      <div className="recovery-options-group">
        {recoveryOptions?.phoneNumber && (
          <div
            className={`recovery-option-card ${activeMethod === 'PHONE' ? 'selected' : ''} ${loading ? 'loading' : ''}`}
            onClick={() => onSelectMethod('PHONE')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectMethod('PHONE');
              }
            }}
          >
            <div className="recovery-icon-box">
              <Smartphone size={20} strokeWidth={2} />
            </div>
            <div className="recovery-info">
              <span className="recovery-label">Phone</span>
              <span className="recovery-value">{recoveryOptions.phoneNumber}</span>
            </div>
            <ChevronRight size={18} className="recovery-arrow" />
          </div>
        )}

        {recoveryOptions?.recoveryEmail && (
          <div
            className={`recovery-option-card ${activeMethod === 'EMAIL' ? 'selected' : ''} ${loading ? 'loading' : ''}`}
            onClick={() => onSelectMethod('EMAIL')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectMethod('EMAIL');
              }
            }}
          >
            <div className="recovery-icon-box">
              <Mail size={20} strokeWidth={2} />
            </div>
            <div className="recovery-info">
              <span className="recovery-label">Email</span>
              <span className="recovery-value">{recoveryOptions.recoveryEmail}</span>
            </div>
            <ChevronRight size={18} className="recovery-arrow" />
          </div>
        )}
      </div>

      <div className="recovery-actions">
        <button
          type="button"
          className="recovery-secondary-btn"
          onClick={() => {
            if (setError) setError('');
            setView('forgot-password-identifier');
          }}
        >
          Try another way
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordOptions;
