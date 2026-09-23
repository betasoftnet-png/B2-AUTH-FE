import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PhoneInputLib from 'react-phone-input-2';
const PhoneInput = PhoneInputLib.default || PhoneInputLib;
import 'react-phone-input-2/lib/style.css';
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

const SignupMobileVerify = () => {

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
        <div className="input-field-group" style={{ width: '100%', textAlign: 'center', marginBottom: '24px' }}>
          <img src={betaLogo} alt="b2auth" className="auth-logo" style={{ height: '48px', marginBottom: '16px' }} />
          <label style={{ fontSize: '18px', fontWeight: '700', display: 'block', marginBottom: '8px' }}>
            {mobileOtpStep === 'MOBILE' ? 'Verify your mobile number' : 'Enter OTP'}
          </label>
          <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '600', marginBottom: '8px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            {signupType === 'CHILD' ? 'Step 4 of 5' : 'Step 3 of 4'}
          </div>
        </div>

              {mobileOtpStep === 'MOBILE' ? (
                <form onSubmit={handleSendMobileOtp}>
                  <div className="auth-input-group" style={{ textAlign: 'left' }}>
                    <label>Mobile Number</label>
                    <PhoneInput
                      country={'in'}
                      value={formData.mobileNumber}
                      onChange={(phone) => setFormData(prev => ({ ...prev, mobileNumber: '+' + phone }))}
                      enableSearch={true}
                      containerStyle={{ width: '100%', marginTop: '8px' }}
                      inputStyle={{
                        width: '100%',
                        padding: '12px 12px 12px 50px',
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '12px',
                        fontSize: '16px',
                        color: 'var(--text-main)',
                        height: '48px'
                      }}
                      buttonStyle={{
                        background: 'transparent',
                        border: 'none',
                        left: '4px'
                      }}
                      dropdownStyle={{
                        background: 'var(--surface)',
                        color: 'var(--text-main)',
                        zIndex: 100
                      }}
                    />
                  </div>
                  <div className="btn-group" style={{ marginTop: '24px' }}>
                    <button type="button" className="text-btn" onClick={() => setView('signup-mail')}>Back</button>
                    <button type="submit" className="primary-btn" disabled={loading}>
                      {loading ? 'Sending...' : 'Send OTP'}
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleVerifyMobileOtp}>
                  <div className="auth-input-group" style={{ textAlign: 'left' }}>
                    <label>Enter the 6-digit OTP</label>
                    <input
                      type="text"
                      value={formData.mobileOtp || ''}
                      onChange={(e) => setFormData({ ...formData, mobileOtp: e.target.value })}
                      required
                      placeholder="123456"
                      style={{ textAlign: 'center', letterSpacing: '0.2em', fontSize: '1.25rem' }}
                    />
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px', textAlign: 'center' }}>
                      Code sent to {formData.mobileNumber}. <button type="button" onClick={() => setMobileOtpStep('MOBILE')} style={{ color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Change number</button>
                    </p>
                  </div>
                  <div className="btn-group" style={{ marginTop: '24px' }}>
                    <button type="button" className="text-btn" onClick={() => setMobileOtpStep('MOBILE')}>Back</button>
                    <button type="submit" className="primary-btn" disabled={loading}>
                      {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                  </div>
                </form>
              )}
            </div>
    </>
  );
};

export default SignupMobileVerify;
