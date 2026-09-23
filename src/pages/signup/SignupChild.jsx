import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
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

const SignupChild = () => {

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
    cliksBusinessLogo, cliksLogo, bitToolLogo,
    // Note: add more here if needed,
    accessToken, addAuthMode, authenticatorAccounts, businessSignupType, businessTypeData, calculateAge, clientId, dashboardTab, error, expandedExternalSessionId, expandedSessionId, externalSessions, fetchAuthenticatorAccounts, fetchEmails, fetchExternalSessions, fetchFullProfile, fetchRecoveryInfo, fetchSessions, handleAddAuthenticatorAccount, handleBusinessTypeSelect, handleChangePassword, handleDeleteAuthenticatorAccount, handleDisable2FA, handleEnable2FA, handleForgotPasswordClick, handleMailFormSubmit, handleProfileClick, handleRevokeExternalSession, handleRevokeSession, handleSignOutAll, handleVerificationCallback, isEditingRecovery, leaveLegalPage, normalizeIdentifier, onboardingData, onboardingStep, parseUserAgent, profileData, recoveryInfo, redirectUri, saveAccount, sessions, setAccessToken, setAddAuthMode, setAuthenticatorAccounts, setBusinessSignupType, setBusinessTypeData, setClientId, setDashboardTab, setError, setExpandedExternalSessionId, setExpandedSessionId, setExternalSessions, setFetchedGstins, setFetchingGstins, setIsEditingRecovery, setLoading, setOnboardingData, setOnboardingStep, setProfileData, setRecoveryInfo, setRecoveryOptions, setRedirectUri, setSessions, setSettingsData, setSetup2FAData, setShowAddAuthModal, setShowBusinessTypeModal, setShowChangePasswordModal, setShowGstModal, setShowPanModal, setShowSetup2FAModal, setSidebarCategory, setState, setSuccessMessage, setTempToken, setUserEmails, setVerificationStatus, setVerifyPanResult, setVkycUrl, settingsData, setup2FACode, showAddAuthModal, showAlert, showBusinessTypeModal, showChangePasswordModal, showGstModal, showLegalPage, showPanModal, showSetup2FAModal, sidebarCategory, state, successMessage, tempToken, verificationStatus, vkycUrl,} = useAppContext();

  return (
    <>
      <form onSubmit={handleGoToMailSignup} className="auth-step">
              <div className="input-field-group" style={{ width: '100%', textAlign: 'center' }}>
                <img src={betaLogo} alt="b2auth" className="auth-logo" style={{ height: '48px', marginBottom: '16px' }} />
                <label style={{ fontSize: '18px', fontWeight: '700', display: 'block', marginBottom: '8px' }}>Create child profile</label>
                <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '600', marginBottom: '8px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Step 1 of 5</div>
                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
                  Tell us a bit about your child.
                </p>
                {error && <div className="error-message" style={{ marginBottom: '16px' }}>{error}</div>}
              </div>
              <div className="name-grid">
                <div className="input-group"><input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required placeholder=" " /><label>First name</label></div>
                <div className="input-group"><input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required placeholder=" " /><label>Last name</label></div>
              </div>
              <div className="input-group"><input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required placeholder=" " /><label>Date of Birth</label></div>

              <div className="auth-actions">
                <button type="button" className="text-btn" onClick={() => setView('signup-selection')}>Back</button>
                <button type="submit" className="primary-btn" disabled={loading}>Next</button>
              </div>
            </form>
    </>
  );
};

export default SignupChild;
