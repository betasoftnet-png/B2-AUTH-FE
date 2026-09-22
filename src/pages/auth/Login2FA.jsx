import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import authLogo from '../../assets/auth2.png';
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

const Login2FA = () => {

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
    cliksBusinessLogo, cliksLogo, authLogo, bitToolLogo,
    // Note: add more here if needed,
    accessToken, addAuthMode, authenticatorAccounts, businessSignupType, businessTypeData, calculateAge, clientId, dashboardTab, error, expandedExternalSessionId, expandedSessionId, externalSessions, fetchAuthenticatorAccounts, fetchEmails, fetchExternalSessions, fetchFullProfile, fetchRecoveryInfo, fetchSessions, handleAddAuthenticatorAccount, handleBusinessTypeSelect, handleChangePassword, handleDeleteAuthenticatorAccount, handleDisable2FA, handleEnable2FA, handleForgotPasswordClick, handleMailFormSubmit, handleProfileClick, handleRevokeExternalSession, handleRevokeSession, handleSignOutAll, handleVerificationCallback, isEditingRecovery, leaveLegalPage, normalizeIdentifier, onboardingData, onboardingStep, parseUserAgent, profileData, recoveryInfo, redirectUri, saveAccount, sessions, setAccessToken, setAddAuthMode, setAuthenticatorAccounts, setBusinessSignupType, setBusinessTypeData, setClientId, setDashboardTab, setError, setExpandedExternalSessionId, setExpandedSessionId, setExternalSessions, setFetchedGstins, setFetchingGstins, setIsEditingRecovery, setLoading, setOnboardingData, setOnboardingStep, setProfileData, setRecoveryInfo, setRecoveryOptions, setRedirectUri, setSessions, setSettingsData, setSetup2FAData, setShowAddAuthModal, setShowBusinessTypeModal, setShowChangePasswordModal, setShowGstModal, setShowPanModal, setShowSetup2FAModal, setSidebarCategory, setState, setSuccessMessage, setTempToken, setUserEmails, setVerificationStatus, setVerifyPanResult, setVkycUrl, settingsData, setup2FACode, showAddAuthModal, showAlert, showBusinessTypeModal, showChangePasswordModal, showGstModal, showLegalPage, showPanModal, showSetup2FAModal, sidebarCategory, state, successMessage, tempToken, verificationStatus, vkycUrl,} = useAppContext();

  return (
    <>
      <div className="auth-step-merged">
              {!show2faRecovery ? (
                <form onSubmit={handleVerifyLogin2fa}>
                  <div className="login-grid-2f">
                    <div className="input-field-group">
                      <label style={{ fontSize: '18px', fontWeight: '700', display: 'block', marginBottom: '8px' }}>2-Step Verification</label>
                      <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
                        To help keep your account safe, B2Auth wants to make sure it's really you.
                        Enter the 6-digit code from your <b>Authenticator App</b>.
                      </p>
                      <div className="login-input-wrapper">
                        <input
                          type="text"
                          name="otp"
                          placeholder="Enter code"
                          value={formData.otp}
                          onChange={handleInputChange}
                          required
                          autoFocus
                          className="otp-input-elite"
                          maxLength="6"
                          style={{
                            width: '100%',
                            padding: '16px',
                            borderRadius: '12px',
                            border: '2px solid #e2e8f0',
                            fontSize: '24px',
                            fontWeight: '700',
                            textAlign: 'center',
                            letterSpacing: '4px'
                          }}
                        />
                      </div>
                      <div style={{ marginTop: '16px' }}>
                        <button
                          type="button"
                          onClick={() => setShow2faRecovery(true)}
                          style={{ background: 'none', border: 'none', color: '#4f46e5', cursor: 'pointer', fontSize: '13px', fontWeight: '600', display: 'block', margin: '0 auto' }}
                        >
                          Don't have your device? Try another way
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="button-group-right" style={{ marginTop: '32px' }}>
                    <button type="submit" className="primary-btn" disabled={loading}>
                      {loading ? 'Verifying...' : 'Next'}
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleVerify2faRecoveryOtp}>
                  <div className="login-grid-2f">
                    <div className="input-field-group">
                      <label style={{ fontSize: '18px', fontWeight: '700', display: 'block', marginBottom: '8px' }}>Account Recovery</label>
                      <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
                        We will send a 6-digit recovery code to your registered secondary email address.
                      </p>

                      {successMessage && (
                        <div className="success-banner-elite" style={{ marginBottom: '16px' }}>
                          <CheckCircle size={18} />
                          <span>{successMessage}</span>
                        </div>
                      )}

                      <div style={{ marginBottom: '20px' }}>
                        <button
                          type="button"
                          className="recovery-send-btn"
                          onClick={handleSend2faRecoveryOtp}
                          disabled={loading}
                        >
                          {loading ? <RefreshCw className="spin" size={18} /> : 'Send Recovery Code to Email'}
                        </button>
                      </div>

                      <div className="login-input-wrapper">
                        <input
                          type="text"
                          name="otp"
                          placeholder="Enter 6-digit code"
                          value={formData.otp}
                          onChange={handleInputChange}
                          required
                          className="otp-input-elite"
                          maxLength="6"
                          style={{
                            width: '100%',
                            padding: '16px',
                            borderRadius: '12px',
                            border: '2px solid #e2e8f0',
                            fontSize: '24px',
                            fontWeight: '700',
                            textAlign: 'center',
                            letterSpacing: '4px'
                          }}
                        />
                      </div>
                      <div style={{ marginTop: '16px' }}>
                        <button
                          type="button"
                          onClick={() => setShow2faRecovery(false)}
                          style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}
                        >
                          ← Back to Authenticator
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="button-group-right" style={{ marginTop: '32px' }}>
                    <button type="submit" className="primary-btn" disabled={loading}>
                      {loading ? 'Verifying...' : 'Verify and Login'}
                    </button>
                  </div>
                </form>
              )}
            </div>
    </>
  );
};

export default Login2FA;
