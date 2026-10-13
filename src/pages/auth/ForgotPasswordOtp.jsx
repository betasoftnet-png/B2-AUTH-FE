import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { ChevronLeft, RefreshCw } from 'lucide-react';

const ForgotPasswordOtp = () => {
  const {
    setView,
    loading,
    formData,
    setFormData,
    handleVerifyOtp,
    handleSendOtp,
    selectedRecoveryMethod,
    recoveryOptions,
    error,
    setError,
  } = useAppContext();

  // 6-digit OTP array
  const [otpDigits, setOtpDigits] = useState(() => {
    const initial = (formData.otp || '').slice(0, 6).split('');
    while (initial.length < 6) initial.push('');
    return initial;
  });

  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const inputRefs = useRef([]);

  // Resend countdown timer
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      setCanResend(false);
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);

  // Sync OTP to formData.otp
  const updateOtp = (newDigits) => {
    setOtpDigits(newDigits);
    const combined = newDigits.join('');
    setFormData((prev) => ({ ...prev, otp: combined }));
    if (error && setError) {
      setError('');
    }
  };

  const handleDigitChange = (index, e) => {
    const val = e.target.value;

    // Handle typing or pasting multiple digits into one field
    if (val.length > 1) {
      const pastedDigits = val.replace(/\D/g, '').slice(0, 6).split('');
      if (pastedDigits.length > 0) {
        const updated = [...otpDigits];
        pastedDigits.forEach((d, idx) => {
          if (index + idx < 6) {
            updated[index + idx] = d;
          }
        });
        updateOtp(updated);
        const nextIndex = Math.min(index + pastedDigits.length, 5);
        inputRefs.current[nextIndex]?.focus();
      }
      return;
    }

    // Only allow single digit 0-9
    const cleanDigit = val.replace(/\D/g, '');
    const updated = [...otpDigits];
    updated[index] = cleanDigit;
    updateOtp(updated);

    if (cleanDigit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otpDigits[index] && index > 0) {
        // Current is empty; step back and clear previous
        const updated = [...otpDigits];
        updated[index - 1] = '';
        updateOtp(updated);
        inputRefs.current[index - 1]?.focus();
      } else if (otpDigits[index]) {
        // Clear current box
        const updated = [...otpDigits];
        updated[index] = '';
        updateOtp(updated);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const digits = pasted.split('');
    const updated = [...otpDigits];
    for (let i = 0; i < 6; i++) {
      updated[i] = digits[i] || '';
    }
    updateOtp(updated);
    const focusIndex = Math.min(digits.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleResend = async () => {
    if (!canResend || loading) return;
    if (setError) setError('');
    const method = selectedRecoveryMethod || (recoveryOptions?.phoneNumber ? 'PHONE' : 'EMAIL');
    await handleSendOtp(method);
    setCountdown(30);
    setCanResend(false);
    setResendSuccess(true);
    setTimeout(() => setResendSuccess(false), 4000);

    // Clear inputs and refocus first input
    const cleared = ['', '', '', '', '', ''];
    updateOtp(cleared);
    inputRefs.current[0]?.focus();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    const code = otpDigits.join('');
    if (code.length < 6) {
      if (setError) setError('Please enter a valid 6-digit verification code.');
      return;
    }
    handleVerifyOtp(e);
  };

  return (
    <div className="b2auth-recovery-container">
      <div className="b2auth-recovery-header">
        <h1 className="b2auth-recovery-title">Verify Your Code</h1>
        <p className="b2auth-recovery-description">
          We sent a 6-digit verification code to your recovery method. Enter the code below to continue.
        </p>
      </div>

      {error && (
        <div className="b2auth-inline-error" role="alert" style={{ marginTop: '0', marginBottom: '18px' }}>
          {error}
        </div>
      )}

      {resendSuccess && (
        <div className="b2auth-inline-success" role="status">
          Verification code resent successfully.
        </div>
      )}

      <form onSubmit={onSubmit} className="otp-verification-form" noValidate>
        <div className="otp-inputs-wrapper" onPaste={handlePaste}>
          {otpDigits.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              autoComplete={idx === 0 ? 'one-time-code' : 'off'}
              value={digit}
              onChange={(e) => handleDigitChange(idx, e)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              onFocus={(e) => e.target.select()}
              autoFocus={idx === 0}
              className={`otp-digit-input ${digit ? 'filled' : ''} ${error ? 'has-error' : ''}`}
              aria-label={`Digit ${idx + 1} of verification code`}
              disabled={loading}
            />
          ))}
        </div>

        <div className="otp-resend-wrapper">
          <span className="otp-resend-text">Didn't receive the code? </span>
          {canResend ? (
            <button
              type="button"
              className="otp-resend-btn"
              onClick={handleResend}
              disabled={loading}
            >
              Resend code
            </button>
          ) : (
            <span className="otp-countdown-text">
              Resend code in {countdown}s
            </span>
          )}
        </div>

        <button
          type="submit"
          className="otp-verify-submit-btn"
          disabled={loading || otpDigits.join('').length < 6}
        >
          {loading ? (
            <span className="otp-btn-loading">
              <RefreshCw size={18} className="otp-spinner" /> Verifying...
            </span>
          ) : (
            'Verify & Continue'
          )}
        </button>

        <div className="otp-back-wrapper">
          <button
            type="button"
            className="otp-back-link"
            onClick={() => {
              if (setError) setError('');
              setView('forgot-password-options');
            }}
          >
            <ChevronLeft size={16} /> Back to recovery options
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordOtp;
