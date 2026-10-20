import React, { useState, useRef, useEffect } from 'react';
import PhoneInputLib from 'react-phone-input-2';
const PhoneInput = PhoneInputLib.default || PhoneInputLib;
import 'react-phone-input-2/lib/style.css';
import { useAppContext } from '../../context/AppContext';
import betaLogo from '../../assets/beta2.png';
import {
  ChevronLeft,
  RefreshCw,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

const SignupMobileVerify = () => {
  const {
    setView,
    loading,
    formData,
    setFormData,
    error,
    setError,
    signupType,
    handleSendMobileOtp,
    handleVerifyMobileOtp,
    mobileOtpStep,
    setMobileOtpStep,
  } = useAppContext();

  // 6-digit OTP array state
  const [otpDigits, setOtpDigits] = useState(() => {
    const initial = (formData.mobileOtp || '').slice(0, 6).split('');
    while (initial.length < 6) initial.push('');
    return initial;
  });

  const [activeIndex, setActiveIndex] = useState(null);
  const [resendCountdown, setResendCountdown] = useState(30);
  const [resendSuccess, setResendSuccess] = useState(false);
  const inputRefs = useRef([]);

  // Resend countdown timer
  useEffect(() => {
    let timer;
    if (resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [resendCountdown]);

  // Sync when formData.mobileOtp is cleared or reset externally
  useEffect(() => {
    if (!formData.mobileOtp) {
      setOtpDigits(['', '', '', '', '', '']);
    }
  }, [formData.mobileOtp]);

  // Sync OTP digits to formData.mobileOtp
  const updateOtp = (newDigits) => {
    setOtpDigits(newDigits);
    const combined = newDigits.join('');
    setFormData((prev) => ({ ...prev, mobileOtp: combined }));
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
        // Current box is empty: step back, clear previous box and focus it
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

  const handleResend = async (e) => {
    if (resendCountdown > 0 || loading) return;
    if (setError) setError('');
    await handleSendMobileOtp(e);
    setResendCountdown(30);
    setResendSuccess(true);
    setTimeout(() => setResendSuccess(false), 4000);

    // Clear inputs and refocus first input
    const cleared = ['', '', '', '', '', ''];
    updateOtp(cleared);
    inputRefs.current[0]?.focus();
  };

  const onVerifySubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    const code = otpDigits.join('');
    if (code.length < 6) {
      if (setError) setError('Please enter the complete 6-digit verification code.');
      return;
    }
    setFormData((prev) => ({ ...prev, mobileOtp: code }));
    handleVerifyMobileOtp(e);
  };

  // Helper to format masked mobile number: e.g. +91 9876543210 -> +91 ••••• •3210
  const formatMaskedMobile = (phone) => {
    if (!phone) return 'your registered mobile number';
    const clean = String(phone).trim();
    if (clean.length < 7) return clean;
    const last4 = clean.slice(-4);
    const prefix = clean.startsWith('+') ? clean.slice(0, 3) : clean.slice(0, 2);
    return `${prefix} ••••• •${last4}`;
  };

  const stepText = signupType === 'CHILD' ? 'STEP 4 OF 5' : 'STEP 3 OF 4';

  return (
    <div className="b2auth-otp-card-container">
      {/* Mobile Input Step */}
      {mobileOtpStep === 'MOBILE' ? (
        <>
          <div className="b2auth-otp-header">
            <img src={betaLogo} alt="B2Auth" className="b2auth-otp-logo" />
            <div className="b2auth-otp-step-badge">{stepText}</div>
            <h1 className="b2auth-otp-title">Verify your mobile number</h1>
            <p className="b2auth-otp-description">
              We will send a 6-digit verification code to your registered mobile number.
            </p>
          </div>

          {error && (
            <div className="b2auth-otp-inline-error" role="alert">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSendMobileOtp} className="b2auth-otp-form">
            <div className="b2auth-otp-phone-input-group">
              <label className="b2auth-otp-input-label">Mobile Number</label>
              <PhoneInput
                country={'in'}
                value={formData.mobileNumber}
                onChange={(phone) => setFormData((prev) => ({ ...prev, mobileNumber: '+' + phone }))}
                enableSearch={true}
                containerStyle={{ width: '100%', marginTop: '6px' }}
                inputStyle={{
                  width: '100%',
                  padding: '12px 12px 12px 50px',
                  background: '#f8fafc',
                  border: '1.5px solid #cbd5e1',
                  borderRadius: '12px',
                  fontSize: '15px',
                  color: '#1e293b',
                  height: '48px',
                  boxSizing: 'border-box',
                }}
                buttonStyle={{
                  background: 'transparent',
                  border: 'none',
                  left: '4px',
                }}
                dropdownStyle={{
                  background: '#ffffff',
                  color: '#1e293b',
                  zIndex: 100,
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                }}
              />
            </div>

            <div className="b2auth-otp-actions" style={{ marginTop: '24px' }}>
              <button
                type="submit"
                className="b2auth-otp-submit-btn"
                disabled={loading || !formData.mobileNumber}
              >
                {loading ? (
                  <div className="b2auth-otp-btn-loading">
                    <RefreshCw size={18} className="b2auth-otp-spinner" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  <span>Send OTP</span>
                )}
              </button>

              <button
                type="button"
                className="b2auth-otp-back-text-btn"
                onClick={() => {
                  if (setError) setError('');
                  setView('signup-mail');
                }}
                disabled={loading}
              >
                <ChevronLeft size={16} />
                <span>Back</span>
              </button>
            </div>
          </form>
        </>
      ) : (
        /* OTP Verification Step */
        <>
          <div className="b2auth-otp-header">
            <img src={betaLogo} alt="B2Auth" className="b2auth-otp-logo" />
            <div className="b2auth-otp-step-badge">{stepText}</div>
            <h1 className="b2auth-otp-title">Verify Your Account</h1>
            <p className="b2auth-otp-description">
              Enter the 6-digit verification code sent to your registered mobile number.
            </p>

            <div className="b2auth-otp-phone-pill">
              <span className="b2auth-otp-phone-text">
                Sent to <strong>{formatMaskedMobile(formData.mobileNumber)}</strong>
              </span>
              <button
                type="button"
                className="b2auth-otp-change-number-btn"
                onClick={() => {
                  if (setError) setError('');
                  setMobileOtpStep('MOBILE');
                }}
              >
                Change number
              </button>
            </div>
          </div>

          {error && (
            <div className="b2auth-otp-inline-error" role="alert">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {resendSuccess && (
            <div className="b2auth-otp-inline-success" role="status">
              <CheckCircle size={16} />
              <span>Verification code resent successfully.</span>
            </div>
          )}

          <form onSubmit={onVerifySubmit} className="b2auth-otp-form" noValidate>
            <div className="b2auth-otp-inputs-wrapper" onPaste={handlePaste}>
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
                  onFocus={(e) => {
                    setActiveIndex(idx);
                    e.target.select();
                  }}
                  onBlur={() => setActiveIndex(null)}
                  autoFocus={idx === 0}
                  className={`b2auth-otp-digit-input ${digit ? 'filled' : ''} ${
                    activeIndex === idx ? 'active' : ''
                  } ${error ? 'has-error' : ''}`}
                  aria-label={`Digit ${idx + 1} of 6`}
                  disabled={loading}
                />
              ))}
            </div>

            <div className="b2auth-otp-resend-row">
              <span className="b2auth-otp-resend-text">Didn't receive code? </span>
              {resendCountdown > 0 ? (
                <span className="b2auth-otp-countdown-text">
                  Resend code in {resendCountdown}s
                </span>
              ) : (
                <button
                  type="button"
                  className="b2auth-otp-resend-btn"
                  onClick={handleResend}
                  disabled={loading}
                >
                  Resend code
                </button>
              )}
            </div>

            <div className="b2auth-otp-actions">
              <button
                type="submit"
                className="b2auth-otp-submit-btn"
                disabled={loading || otpDigits.join('').length !== 6}
              >
                {loading ? (
                  <div className="b2auth-otp-btn-loading">
                    <RefreshCw size={18} className="b2auth-otp-spinner" />
                    <span>Verifying...</span>
                  </div>
                ) : (
                  <span>Verify OTP</span>
                )}
              </button>

              <button
                type="button"
                className="b2auth-otp-back-text-btn"
                onClick={() => {
                  if (setError) setError('');
                  setMobileOtpStep('MOBILE');
                }}
                disabled={loading}
              >
                <ChevronLeft size={16} />
                <span>Back</span>
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default SignupMobileVerify;
