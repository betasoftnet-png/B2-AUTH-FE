import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import authLogo from '../../assets/auth2.png';
import betaLogo from '../../assets/beta2.png';
import cliksBusinessLogo from '../../assets/cliks-business.png';
import cliksLogo from '../../assets/cliks.png';
import bitToolLogo from '../../assets/BIT-TOOL-2.png';
import {
  LayoutDashboard, Mail, ShieldCheck, Settings, Activity, LogOut,
  Smartphone, Monitor, Tablet, CheckCircle, AlertCircle, XCircle, Search, Building,
  Minus, FileText, Download, Briefcase, FileSignature, UploadCloud, UserPlus, Info,
  Trash2, Edit3, Save, Plus, ChevronRight, ChevronDown, User, Phone,
  Globe, Clock, MapPin,
  LockIcon,
  LockOpenIcon,
  Check,
  Circle,
  X,
  RefreshCw,
  ChevronLeft
} from 'lucide-react';

const LoginView = () => {

  const {
    view, setView, customAlert, setCustomAlert, accounts, setAccounts,
    handleLogin, handleLogout, loading, handleAddAccount, handleRemoveAccount,
    formData, setFormData, handleInputChange, passwordForm, setPasswordForm,
    handleSelectAccount, useSavedAccount, setUseSavedAccount, handleSwitchAccount,
    showAccountSwitcher, setShowAccountSwitcher, handleCreateAccountClick,
    handleGoToMailSignup, handleForgotInModal, handleVerifyLogin2fa,
    manualAuthData, setManualAuthData, handleVerifyOtp, timeLeft,
    handleSendOtp, handleForgotPasswordIdentifierSubmit,
    handleForgotPasswordClickWithEmail, handleVerifyPan, verifyPanResult,
    panData, setPanData, handleMakePrimary, selectedRecoveryMethod,
    setSelectedRecoveryMethod, recoveryOptions, handleSend2faRecoveryOtp,
    handleVerify2faRecoveryOtp, show2faRecovery, setShow2faRecovery,
    signupType, setSignupType, handleFileChange, handleProcessQR,
    registrationMode, setRegistrationMode, resetSignupForm,
    handleRegisterProfile, handleVerifyParentOtp, handleSendParentOtp,
    parentOtpSent, setParentOtpSent, handleSendMobileOtp, handleVerifyMobileOtp,
    mobileOtpStep, setMobileOtpStep, handleVerifyGst, gstData, setGstData,
    handleFetchGstins, fetchingGstins, fetchedGstins, handleSelectGstin,
    signupFetchedGstins, setSignupFetchedGstins, fetchingSignupGstins, setFetchingSignupGstins,
    primaryBusinessData, setPrimaryBusinessData, primaryBusinessStep, setPrimaryBusinessStep,
    handleOnboardingSubmit, handleFinalSignupSubmit, handleCreateMailbox,
    userEmails, usernameSuggestions, setUsernameSuggestions, 
    handleResetPassword, handleUpdateRecovery, language, setLanguage,
    PasswordRequirements, validatePassword, AuthenticatorCode,
    setup2FAData, setSetup2FACode, handleVerifyAndEnable2FA,
    cliksBusinessLogo, cliksLogo, authLogo, bitToolLogo, showLegalPage, handleForgotPasswordClick,
    accessToken, addAuthMode, authenticatorAccounts, businessSignupType, businessTypeData, calculateAge, clientId, dashboardTab, error, expandedExternalSessionId, expandedSessionId, externalSessions, fetchAuthenticatorAccounts, fetchEmails, fetchExternalSessions, fetchFullProfile, fetchRecoveryInfo, fetchSessions, handleAddAuthenticatorAccount, handleBusinessTypeSelect, handleChangePassword, handleDeleteAuthenticatorAccount, handleDisable2FA, handleEnable2FA, handleMailFormSubmit, handleProfileClick, handleRevokeExternalSession, handleRevokeSession, handleSignOutAll, handleVerificationCallback, isEditingRecovery, leaveLegalPage, normalizeIdentifier, onboardingData, onboardingStep, parseUserAgent, profileData, recoveryInfo, redirectUri, saveAccount, sessions, setAccessToken, setAddAuthMode, setAuthenticatorAccounts, setBusinessSignupType, setBusinessTypeData, setClientId, setDashboardTab, setError, setExpandedExternalSessionId, setExpandedSessionId, setExternalSessions, setFetchedGstins, setFetchingGstins, setIsEditingRecovery, setLoading, setOnboardingData, setOnboardingStep, setProfileData, setRecoveryInfo, setRecoveryOptions, setRedirectUri, setSessions, setSettingsData, setSetup2FAData, setShowAddAuthModal, setShowBusinessTypeModal, setShowChangePasswordModal, setShowGstModal, setShowPanModal, setShowSetup2FAModal, setSidebarCategory, setState, setSuccessMessage, setTempToken, setUserEmails, setVerificationStatus, setVerifyPanResult, setVkycUrl, settingsData, setup2FACode, showAddAuthModal, showAlert, showBusinessTypeModal, showChangePasswordModal, showGstModal, showPanModal, showSetup2FAModal, sidebarCategory, state, successMessage, tempToken, verificationStatus, vkycUrl,} = useAppContext();

  return (
    <form onSubmit={handleLogin} className="auth-step-merged" style={{ position: 'relative' }}>
      {(!useSavedAccount && accounts.length > 0) && (
        <button type="button" onClick={() => setView('account-selection')} style={{ position: 'absolute', top: 0, left: 0, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b' }}>
          <ChevronLeft size={16} /> Back
        </button>
      )}

      <div className="input-field-group" style={{ width: '100%', textAlign: 'center', marginTop: (!useSavedAccount && accounts.length > 0) ? '24px' : '0' }}>
        <img src={betaLogo} alt="b2auth beta" className="auth-logo" style={{ height: '48px', marginBottom: '16px' }} />
        <label style={{ fontSize: '24px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Sign in to B2Auth</label>
        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '32px' }}>
          Use your BETA Account
        </p>
      </div>

      {useSavedAccount && formData.identifier ? (
        <div className="relogin-container">
          <div className="account-relogin-header">
            <div className="avatar-circle-relogin">
              {formData.identifier.split('@')[0]?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="relogin-info">
              <span className="relogin-email">{formData.identifier.includes('@') ? formData.identifier : `${formData.identifier}@bnxmail.com`}</span>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button type="button" className="switch-account-btn" onClick={() => {
                  setUseSavedAccount(false);
                  setFormData(prev => ({ ...prev, identifier: '', password: '' }));
                  setView('login-email');
                }}>
                  Use another account
                </button>
                {accounts.length > 1 && (
                  <button type="button" className="switch-account-btn" onClick={() => {
                    setUseSavedAccount(false);
                    setView('account-selection');
                  }}>
                    Switch account
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="input-field-group relogin-password-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder='Enter your password'
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              autoFocus
            />
          </div>
        </div>
      ) : (
        <div className="login-grid">
          <div className="input-field-group">
            <label>Email:</label>
            <div className={`login-input-wrapper ${!formData.identifier?.includes('@') ? 'has-domain-hint' : ''}`}>
              <input
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleInputChange}
                required
                placeholder="Username"
              />
              {!formData.identifier?.includes('@') && <span className="domain-hint">@bnxmail.com</span>}
            </div>
          </div>
          <div className="input-field-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder='Enter your password'
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      )}

      <div className="forgot-password-link" onClick={handleForgotPasswordClick}>
        Forgot Password?
      </div>

      {accounts.length > 0 && (
        <div
          className="forgot-password-link"
          style={{ marginTop: '-20px', marginBottom: '32px' }}
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

      {error && <div className="error-message" style={{ color: 'red', marginTop: '16px', marginBottom: '16px', textAlign: 'center', width: '100%' }}>{error}</div>}
      <div className="login-btn-container">
        <button type="submit" className="merged-login-btn" disabled={loading}>
          {loading ? '...' : 'Login'}
        </button>
      </div>
      <div className="auth-footer-merged">
        <div className="footer-right-links">
          <div style={{ display: 'flex', flexDirection: 'row', gap: '9px' }}>
            <span>Help</span>
            <button type="button" onClick={() => showLegalPage('privacy')}>Privacy</button>
            <button type="button" onClick={() => showLegalPage('terms')}>Terms</button>
          </div>
          <div>
            <span style={{ fontSize: '12px', color: 'blue', fontFamily: 'inherit' }}>Report Issue</span>
          </div>
        </div>
        <div><img src={authLogo} alt="" className="auth-logo" height={40} style={{ marginRight: '25px' }} /></div>
        <div className="footer-left-link" onClick={handleCreateAccountClick}>
          Create Account
        </div>
      </div>
    </form>
  );
};

export default LoginView;
