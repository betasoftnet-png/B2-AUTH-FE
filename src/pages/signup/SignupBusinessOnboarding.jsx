import React from 'react';
import { motion } from 'framer-motion';
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

const SignupBusinessOnboarding = () => {

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
      <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (onboardingStep === 1) {
                  if (!onboardingData.businessType || !onboardingData.industry.trim()) {
                    setError('Please fill in all required fields');
                    return;
                  }
                  setError('');
                  setOnboardingStep(2);
                } else {
                  handleOnboardingSubmit(e);
                }
              }} 
              className="auth-step" 
              style={{ maxWidth: '650px' }}
            >
              <div className="onboarding-welcome" style={{ marginBottom: '24px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--primary)', marginBottom: '8px' }}>Welcome, {formData.firstName}!</h2>
                <p style={{ fontSize: '14px', color: '#64748b' }}>Please complete your Business Profile setup to unlock your dashboard.</p>
              </div>

              <div className="signup-inputs-container">
                {onboardingStep === 1 ? (
                  <>
                    <span className="onboarding-section-title">Business Information</span>
                    
                    <div className="name-grid">
                      <div className="input-group">
                        <select
                          name="businessType"
                          value={onboardingData.businessType}
                          onChange={(e) => setOnboardingData({ ...onboardingData, businessType: e.target.value })}
                          required
                        >
                          <option value="Sole Proprietorship">Sole Proprietorship</option>
                          <option value="Partnership">Partnership</option>
                          <option value="Private Limited">Private Limited</option>
                          <option value="LLP">LLP</option>
                          <option value="Corporation">Corporation</option>
                          <option value="Non-Profit">Non-Profit</option>
                          <option value="Other">Other</option>
                        </select>
                        <label className="floating-select-label">Business Type</label>
                      </div>

                      <div className="input-group">
                        <input
                          type="text"
                          name="industry"
                          value={onboardingData.industry}
                          onChange={(e) => setOnboardingData({ ...onboardingData, industry: e.target.value })}
                          required
                          placeholder=" "
                        />
                        <label>Industry</label>
                      </div>
                    </div>

                    <div className="name-grid">
                      <div className="input-group">
                        <select
                          name="companySize"
                          value={onboardingData.companySize}
                          onChange={(e) => setOnboardingData({ ...onboardingData, companySize: e.target.value })}
                        >
                          <option value="">Company Size (Optional)</option>
                          <option value="1-10">1-10 employees</option>
                          <option value="11-50">11-50 employees</option>
                          <option value="51-200">51-200 employees</option>
                          <option value="201-500">201-500 employees</option>
                          <option value="500+">500+ employees</option>
                        </select>
                        {onboardingData.companySize && (
                          <label className="floating-select-label">Company Size</label>
                        )}
                      </div>
                      
                      <div className="input-group">
                        <input
                          type="text"
                          name="businessWebsite"
                          value={onboardingData.businessWebsite}
                          onChange={(e) => setOnboardingData({ ...onboardingData, businessWebsite: e.target.value })}
                          placeholder=" "
                        />
                        <label>Website (Optional)</label>
                      </div>
                    </div>

                    <div className="input-group">
                      <input
                        type="text"
                        name="businessAddress"
                        value={onboardingData.businessAddress}
                        onChange={(e) => setOnboardingData({ ...onboardingData, businessAddress: e.target.value })}
                        placeholder=" "
                      />
                      <label>Business Address (Optional)</label>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="onboarding-section-title">Branding & Preferences</span>

                    <div className="name-grid" style={{ marginBottom: '20px' }}>
                      <div className="file-upload-box" style={{ border: '1.5px dashed var(--border)', borderRadius: '16px', padding: '12px', textAlign: 'center', position: 'relative', minHeight: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        {onboardingData.profilePhoto ? (
                          <div style={{ position: 'relative', width: '70px', height: '70px' }}>
                            <img src={onboardingData.profilePhoto} alt="Profile" style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover' }} />
                            <button type="button" onClick={() => setOnboardingData({ ...onboardingData, profilePhoto: null })} style={{ position: 'absolute', top: '-6px', right: '-6px', background: 'var(--danger)', color: 'white', border: 'none', borderRadius: '50%', width: '18px', height: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px' }}>✕</button>
                          </div>
                        ) : (
                          <>
                            <User size={20} style={{ color: '#64748b', marginBottom: '4px' }} />
                            <span style={{ fontSize: '11px', fontWeight: '600', color: '#64748b' }}>Profile Photo</span>
                            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'profilePhoto')} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
                          </>
                        )}
                      </div>

                      <div className="file-upload-box" style={{ border: '1.5px dashed var(--border)', borderRadius: '16px', padding: '12px', textAlign: 'center', position: 'relative', minHeight: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        {onboardingData.companyLogo ? (
                          <div style={{ position: 'relative', width: '70px', height: '70px' }}>
                            <img src={onboardingData.companyLogo} alt="Logo" style={{ width: '70px', height: '70px', borderRadius: '8px', objectFit: 'cover' }} />
                            <button type="button" onClick={() => setOnboardingData({ ...onboardingData, companyLogo: null })} style={{ position: 'absolute', top: '-6px', right: '-6px', background: 'var(--danger)', color: 'white', border: 'none', borderRadius: '50%', width: '18px', height: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px' }}>✕</button>
                          </div>
                        ) : (
                          <>
                            <Briefcase size={20} style={{ color: '#64748b', marginBottom: '4px' }} />
                            <span style={{ fontSize: '11px', fontWeight: '600', color: '#64748b' }}>Company Logo</span>
                            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'companyLogo')} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
                          </>
                        )}
                      </div>
                    </div>

                    <div className="name-grid">
                      <div className="input-group">
                        <select
                          name="timeZone"
                          value={onboardingData.timeZone}
                          onChange={(e) => setOnboardingData({ ...onboardingData, timeZone: e.target.value })}
                          required
                        >
                          <option value="UTC">UTC / GMT</option>
                          <option value="EST">EST (UTC-5)</option>
                          <option value="PST">PST (UTC-8)</option>
                          <option value="IST">IST (UTC+5:30)</option>
                          <option value="BST">BST (UTC+1)</option>
                          <option value="AEST">AEST (UTC+10)</option>
                        </select>
                        <label className="floating-select-label">Time Zone</label>
                      </div>

                      <div className="input-group">
                        <select
                          name="language"
                          value={onboardingData.language}
                          onChange={(e) => setOnboardingData({ ...onboardingData, language: e.target.value })}
                          required
                        >
                          <option value="English (US)">English (US)</option>
                          <option value="English (UK)">English (UK)</option>
                          <option value="Español">Español</option>
                          <option value="Français">Français</option>
                          <option value="Deutsch">Deutsch</option>
                          <option value="हिन्दी">हिन्दी</option>
                        </select>
                        <label className="floating-select-label">Language</label>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '12px', paddingLeft: '4px' }}>
                      <input
                        type="checkbox"
                        id="acceptTerms"
                        checked={onboardingData.acceptTerms}
                        onChange={(e) => setOnboardingData({ ...onboardingData, acceptTerms: e.target.checked })}
                        required
                        style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--primary)' }}
                      />
                      <label htmlFor="acceptTerms" style={{ fontSize: '13px', color: '#475569', cursor: 'pointer', userSelect: 'none' }}>
                        I accept the <a href="#" onClick={(e) => { e.preventDefault(); showLegalPage('terms'); }} style={{ color: 'var(--primary)', fontWeight: '600' }}>Terms of Service</a> & <a href="#" onClick={(e) => { e.preventDefault(); showLegalPage('privacy'); }} style={{ color: 'var(--primary)', fontWeight: '600' }}>Privacy Policy</a>
                      </label>
                    </div>
                  </>
                )}
              </div>

              <div className="auth-actions" style={{ marginTop: '24px' }}>
                <button 
                  type="button" 
                  className="text-btn" 
                  onClick={() => {
                    if (onboardingStep === 2) {
                      setOnboardingStep(1);
                    } else {
                      handleLogout();
                    }
                  }}
                >
                  {onboardingStep === 2 ? 'Back' : 'Log Out'}
                </button>
                <button type="submit" className="primary-btn" disabled={loading}>
                  {onboardingStep === 1 ? 'Next' : (loading ? 'Submitting...' : 'Submit & Continue')}
                </button>
              </div>
            </form>
    </>
  );
};

export default SignupBusinessOnboarding;
