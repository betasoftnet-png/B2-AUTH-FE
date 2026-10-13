import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Eye, EyeOff, Check, ChevronLeft, RefreshCw } from 'lucide-react';

const ForgotPasswordReset = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    loading,
    formData,
    handleInputChange,
    handleResetPassword,
    validatePassword,
    error,
    setError,
    setView,
  } = useAppContext();

  const newPassword = formData.newPassword || '';
  const confirmPassword = formData.confirmPassword || '';
  const { requirements } = validatePassword(newPassword);

  const isMismatch = confirmPassword && newPassword !== confirmPassword;
  const isMatch = confirmPassword && newPassword === confirmPassword && newPassword.length > 0;

  return (
    <div className="b2auth-recovery-container">
      <div className="b2auth-recovery-header">
        <h1 className="b2auth-recovery-title">Reset Password</h1>
        <p className="b2auth-recovery-description">
          Create a new, strong password for your account.
        </p>
      </div>

      {error && (
        <div className="b2auth-inline-error" role="alert" style={{ marginTop: '0', marginBottom: '18px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleResetPassword} className="reset-password-form" noValidate>
        {/* New Password */}
        <div className="b2auth-form-group">
          <label htmlFor="reset-new-password" className="b2auth-label">New Password</label>
          <div className="b2auth-input-wrapper">
            <input
              id="reset-new-password"
              type={showNewPassword ? 'text' : 'password'}
              name="newPassword"
              placeholder="Enter new password"
              value={newPassword}
              onChange={handleInputChange}
              required
              autoFocus
              className="b2auth-input b2auth-password-input"
              autoComplete="new-password"
            />
            <button
              type="button"
              className="b2auth-eye-btn"
              onClick={() => setShowNewPassword((prev) => !prev)}
              aria-label={showNewPassword ? 'Hide new password' : 'Show new password'}
              tabIndex={-1}
            >
              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Password Requirements Checklist */}
        <div className="reset-requirements-container">
          <span className="reset-requirements-heading">Password requirements:</span>
          <div className="reset-requirements-list">
            <div className={`reset-req-item ${requirements.minLength ? 'met' : ''}`}>
              <span className="reset-req-icon">
                {requirements.minLength ? <Check size={12} strokeWidth={2.5} /> : <span className="reset-req-dot" />}
              </span>
              <span>8+ characters</span>
            </div>
            <div className={`reset-req-item ${requirements.hasUpper ? 'met' : ''}`}>
              <span className="reset-req-icon">
                {requirements.hasUpper ? <Check size={12} strokeWidth={2.5} /> : <span className="reset-req-dot" />}
              </span>
              <span>One uppercase letter</span>
            </div>
            <div className={`reset-req-item ${requirements.hasNumber ? 'met' : ''}`}>
              <span className="reset-req-icon">
                {requirements.hasNumber ? <Check size={12} strokeWidth={2.5} /> : <span className="reset-req-dot" />}
              </span>
              <span>One number</span>
            </div>
            <div className={`reset-req-item ${requirements.hasSpecial ? 'met' : ''}`}>
              <span className="reset-req-icon">
                {requirements.hasSpecial ? <Check size={12} strokeWidth={2.5} /> : <span className="reset-req-dot" />}
              </span>
              <span>One special character</span>
            </div>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="b2auth-form-group" style={{ marginTop: '18px' }}>
          <label htmlFor="reset-confirm-password" className="b2auth-label">Confirm Password</label>
          <div className="b2auth-input-wrapper">
            <input
              id="reset-confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={handleInputChange}
              required
              className={`b2auth-input b2auth-password-input ${isMismatch ? 'has-error' : ''}`}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="b2auth-eye-btn"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {isMismatch && (
            <span className="reset-field-error">Passwords do not match</span>
          )}
          {isMatch && (
            <span className="reset-field-success">Passwords match</span>
          )}
        </div>

        {/* Reset Button */}
        <button
          type="submit"
          className="reset-submit-btn"
          disabled={loading || !newPassword || !confirmPassword}
        >
          {loading ? (
            <span className="reset-btn-loading">
              <RefreshCw size={18} className="otp-spinner" /> Resetting...
            </span>
          ) : (
            'Reset Password'
          )}
        </button>

        <div className="reset-back-wrapper">
          <button
            type="button"
            className="otp-back-link"
            onClick={() => {
              if (setError) setError('');
              setView('login-email');
            }}
          >
            <ChevronLeft size={16} /> Back to Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordReset;
