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

const SignupMail = () => {

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
    accessToken, addAuthMode, authenticatorAccounts, businessSignupType, businessTypeData, calculateAge, clientId, dashboardTab, error, expandedExternalSessionId, expandedSessionId, externalSessions, fetchAuthenticatorAccounts, fetchEmails, fetchExternalSessions, fetchFullProfile, fetchRecoveryInfo, fetchSessions, handleAddAuthenticatorAccount, handleBusinessTypeSelect, handleChangePassword, handleDeleteAuthenticatorAccount, handleDisable2FA, handleEnable2FA, handleForgotPasswordClick, handleMailFormSubmit, handleProfileClick, handleRevokeExternalSession, handleRevokeSession, handleSignOutAll, handleVerificationCallback, isEditingRecovery, leaveLegalPage, normalizeIdentifier, onboardingData, onboardingStep, parseUserAgent, profileData, recoveryInfo, redirectUri, saveAccount, sessions, setAccessToken, setAddAuthMode, setAuthenticatorAccounts, setBusinessSignupType, setBusinessTypeData, setClientId, setDashboardTab, setError, setExpandedExternalSessionId, setExpandedSessionId, setExternalSessions, setFetchedGstins, setFetchingGstins, setIsEditingRecovery, setLoading, setOnboardingData, setOnboardingStep, setProfileData, setRecoveryInfo, setRecoveryOptions, setRedirectUri, setSessions, setSettingsData, setSetup2FAData, setShowAddAuthModal, setShowBusinessTypeModal, setShowChangePasswordModal, setShowGstModal, setShowPanModal, setShowSetup2FAModal, setSidebarCategory, setState, setSuccessMessage, setTempToken, setUserEmails, setVerificationStatus, setVerifyPanResult, setVkycUrl, settingsData, setup2FACode, showAddAuthModal, showAlert, showBusinessTypeModal, showChangePasswordModal, showGstModal, showLegalPage, showPanModal, showSetup2FAModal, sidebarCategory, state, successMessage, tempToken, verificationStatus, vkycUrl,} = useAppContext();

  return (
    <>
      <form onSubmit={handleMailFormSubmit} className="auth-step-merged">
              <div className="login-grid-2f">
                <div className="input-field-group" style={{ width: '100%', textAlign: 'center' }}>
                  <img src={betaLogo} alt="b2auth" className="auth-logo" style={{ height: '48px', marginBottom: '16px' }} />
                  <label style={{ fontSize: '18px', fontWeight: '700', display: 'block', marginBottom: '8px' }}>Choose your email address</label>
                  <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '600', marginBottom: '8px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                    {signupType === 'CHILD' ? 'Step 3 of 5' : 'Step 2 of 4'}
                  </div>
                  <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
                    Select one of the suggested handles or enter a custom one.
                  </p>

                  {usernameSuggestions && usernameSuggestions.length > 0 && (
                    <div className="username-suggestions-container" style={{ marginBottom: '24px', width: '100%' }}>
                      <span className="suggestions-title" style={{ fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '12px', display: 'block' }}>Suggested email addresses:</span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', width: '100%' }}>
                        {usernameSuggestions.map((suggestion) => {
                          const fullEmail = `${suggestion}@bnxmail.com`;
                          const isSelected = formData.emailName === suggestion;
                          return (
                            <button
                              key={suggestion}
                              type="button"
                              className={`suggestion-chip ${isSelected ? 'active' : ''}`}
                              style={{
                                background: isSelected ? 'var(--primary)' : 'rgba(241, 245, 249, 0.8)',
                                border: '1px solid',
                                borderColor: isSelected ? 'var(--primary)' : '#e2e8f0',
                                borderRadius: '20px',
                                padding: '8px 16px',
                                fontSize: '13px',
                                color: isSelected ? '#ffffff' : '#334155',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                outline: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                              }}
                              onClick={() => {
                                setFormData(prev => ({ ...prev, username: suggestion, emailName: suggestion }));
                                setError('');
                              }}
                            >
                              <Mail size={14} style={{ color: isSelected ? '#ffffff' : '#64748b' }} />
                              <span>{fullEmail}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="manual-handle-section" style={{ marginTop: '16px', width: '100%' }}>
                    <span className="suggestions-title" style={{ fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '8px', display: 'block' }}>Or create your own:</span>
                    <div className="input-group-mail" style={{ display: 'flex', alignItems: 'center', position: 'relative', width: '100%' }}>
                      <input
                        type="text"
                        name="emailName"
                        value={formData.emailName}
                        onChange={(e) => {
                          const val = e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "");
                          setFormData(prev => ({ ...prev, username: val, emailName: val }));
                          setError('');
                        }}
                        placeholder="Choose your handle"
                        className="custom-handle-input"
                      />
                      <span className="domain-suffix">@bnxmail.com</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="auth-actions">
                <button type="button" className="text-btn" onClick={() => {
                  if (signupType === 'CHILD') setView('signup-parent-verify');
                  else if (signupType === 'BUSINESS') setView('signup-business');
                  else setView('signup-profile');
                }}>Back</button>
                <button type="submit" className="primary-btn" disabled={loading}>
                  {tempToken ? (loading ? 'Creating...' : 'Create Email') : 'Next'}
                </button>
              </div>
            </form>
    </>
  );
};

export default SignupMail;
