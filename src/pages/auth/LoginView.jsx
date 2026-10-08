import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import betaLogo from '../../assets/beta2.png';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';

const LoginView = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    setView,
    accounts,
    handleLogin,
    loading,
    formData,
    setFormData,
    handleInputChange,
    useSavedAccount,
    setUseSavedAccount,
    handleCreateAccountClick,
    handleForgotPasswordClick,
    showLegalPage,
    error,
  } = useAppContext();

  return (
    <form onSubmit={handleLogin} className="b2auth-login-card">
      {(!useSavedAccount && accounts.length > 0) && (
        <button
          type="button"
          onClick={() => setView('account-selection')}
          className="b2auth-back-btn"
        >
          <ChevronLeft size={16} /> Back
        </button>
      )}

      {/* Header with B2Auth Logo */}
      <div className="b2auth-header">
        <img
          src={betaLogo}
          alt="B2Auth"
          className="b2auth-logo"
        />
        <h1 className="b2auth-title">Sign in to B2Auth</h1>
        <p className="b2auth-subtitle">Use your BETA Account</p>
      </div>

      {useSavedAccount && formData.identifier ? (
        <div className="relogin-container">
          <div className="account-relogin-header">
            <div className="avatar-circle-relogin">
              {formData.identifier.split('@')[0]?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="relogin-info">
              <span className="relogin-email">
                {formData.identifier.includes('@') ? formData.identifier : `${formData.identifier}@bnxmail.com`}
              </span>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '4px' }}>
                <button
                  type="button"
                  className="switch-account-btn"
                  onClick={() => {
                    setUseSavedAccount(false);
                    setFormData(prev => ({ ...prev, identifier: '', password: '' }));
                    setView('login-email');
                  }}
                >
                  Use another account
                </button>
                {accounts.length > 1 && (
                  <button
                    type="button"
                    className="switch-account-btn"
                    onClick={() => {
                      setUseSavedAccount(false);
                      setView('account-selection');
                    }}
                  >
                    Switch account
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="b2auth-form-group" style={{ marginTop: '20px' }}>
            <label className="b2auth-label">Password:</label>
            <div className="b2auth-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                autoFocus
                className="b2auth-input b2auth-password-input"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="b2auth-eye-btn"
                onClick={() => setShowPassword(prev => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="b2auth-form-fields">
          <div className="b2auth-form-group">
            <label htmlFor="b2auth-email-input" className="b2auth-label">Email:</label>
            <div className={`b2auth-input-wrapper ${formData.identifier && !formData.identifier.includes('@') ? 'has-domain-hint' : ''}`}>
              <input
                id="b2auth-email-input"
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleInputChange}
                required
                placeholder="Enter email address"
                className="b2auth-input"
                autoComplete="username"
              />
              {formData.identifier && !formData.identifier.includes('@') && (
                <span className="b2auth-domain-hint">@bnxmail.com</span>
              )}
            </div>
          </div>

          <div className="b2auth-form-group">
            <label htmlFor="b2auth-password-input" className="b2auth-label">Password:</label>
            <div className="b2auth-input-wrapper">
              <input
                id="b2auth-password-input"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="b2auth-input b2auth-password-input"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="b2auth-eye-btn"
                onClick={() => setShowPassword(prev => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Forgot Password Link */}
      <div className="b2auth-forgot-wrapper">
        <span
          className="b2auth-forgot-link"
          onClick={handleForgotPasswordClick}
          role="button"
          tabIndex={0}
        >
          Forgot Password?
        </span>
      </div>

      {accounts.length > 0 && !useSavedAccount && (
        <div
          className="b2auth-saved-account-link"
          onClick={() => {
            if (accounts.length === 1) {
              const acc = accounts[0];
              localStorage.setItem('bnx_last_identifier', acc.userData.email);
              setFormData(prev => ({ ...prev, identifier: acc.userData.email, password: '' }));
              setUseSavedAccount(true);
              setView('login-email');
            } else {
              setUseSavedAccount(false);
              setView('account-selection');
            }
          }}
        >
          Sign in with a saved account
        </div>
      )}

      {error && (
        <div className="b2auth-error-message">
          {error}
        </div>
      )}

      {/* Login Button */}
      <button
        type="submit"
        className="b2auth-login-btn"
        disabled={loading}
      >
        {loading ? '...' : 'Login'}
      </button>

      {/* Footer */}
      <div className="b2auth-footer">
        <div className="b2auth-footer-left">
          <div className="b2auth-footer-row">
            <span className="b2auth-footer-text">Help</span>
            <button
              type="button"
              className="b2auth-footer-link"
              onClick={() => showLegalPage('privacy')}
            >
              Privacy
            </button>
            <button
              type="button"
              className="b2auth-footer-link"
              onClick={() => showLegalPage('terms')}
            >
              Terms
            </button>
          </div>
          <div className="b2auth-footer-row">
            <span
              className="b2auth-report-link"
              role="button"
              tabIndex={0}
              onClick={() => {
                window.open('mailto:support@beta-softnet.com?subject=B2Auth%20Issue%20Report', '_blank');
              }}
            >
              Report Issue
            </span>
          </div>
        </div>

        <div className="b2auth-footer-right">
          <span
            className="b2auth-create-account-link"
            onClick={handleCreateAccountClick}
            role="button"
            tabIndex={0}
          >
            Create Account
          </span>
        </div>
      </div>
    </form>
  );
};

export default LoginView;
