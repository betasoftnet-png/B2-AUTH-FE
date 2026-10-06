import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
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

const SettingsTab = () => {
  const {
    userEmails, loading, handleMakePrimary,
    profileData, sessions, handleSignOutAll, expandedSessionId,
    setExpandedSessionId, handleRevokeSession, externalSessions,
    expandedExternalSessionId, setExpandedExternalSessionId, handleRevokeExternalSession,
    showSetup2FAModal, setShowSetup2FAModal, setup2FAData, setSetup2FACode,
    setup2FACode, error, setError, handleVerifyAndEnable2FA,
    show2faRecovery, setShow2faRecovery, handleSend2faRecoveryOtp,
    handleVerify2faRecoveryOtp, mobileOtpStep, setMobileOtpStep,
    code, setCode, timeLeft, handleDisable2FA, authenticatorAccounts,
    setShowAddAuthModal, handleFetchGstins, fetchingGstins, fetchedGstins,
    setShowPanModal, setShowGstModal, handleDeleteAuthenticatorAccount,
    showAddAuthModal, addAuthMode, setAddAuthMode, manualAuthData,
    handleInputChange, setManualAuthData, handleAddAuthenticatorAccount,
    showChangePasswordModal, setShowChangePasswordModal, passwordForm,
    handleChangePassword, language, setLanguage, recoveryInfo,
    isEditingRecovery, setIsEditingRecovery, handleUpdateRecovery,
    PasswordRequirements, handleProcessQR, onScanSuccess, onScanError,
    // Add any other destructured state from AppContext here,
    AuthenticatorCode, accessToken, accounts, businessSignupType, businessTypeData, calculateAge, clientId, customAlert, dashboardTab, fetchAuthenticatorAccounts, fetchEmails, fetchExternalSessions, fetchFullProfile, fetchRecoveryInfo, fetchSessions, fetchingSignupGstins, formData, gstData, handleAddAccount, handleBusinessTypeSelect, handleCreateAccountClick, handleCreateMailbox, handleEnable2FA, handleFileChange, handleFinalSignupSubmit, handleForgotInModal, handleForgotPasswordClick, handleForgotPasswordClickWithEmail, handleForgotPasswordIdentifierSubmit, handleGoToMailSignup, handleLogin, handleLogout, handleMailFormSubmit, handleOnboardingSubmit, handleProfileClick, handleRegisterProfile, handleResetPassword, handleSelectAccount, handleSendMobileOtp, handleSendOtp, handleSendParentOtp, handleSwitchAccount, handleVerificationCallback, handleVerifyGst, handleVerifyLogin2fa, handleVerifyMobileOtp, handleVerifyOtp, handleVerifyPan, handleVerifyParentOtp, leaveLegalPage, normalizeIdentifier, onboardingData, onboardingStep, panData, parentOtpSent, parseUserAgent, primaryBusinessData, primaryBusinessStep, recoveryOptions, redirectUri, registrationMode, resetSignupForm, saveAccount, selectedRecoveryMethod, setAccessToken, setAccounts, setAuthenticatorAccounts, setBusinessSignupType, setBusinessTypeData, setClientId, setCustomAlert, setDashboardTab, setExternalSessions, setFetchedGstins, setFetchingGstins, setFetchingSignupGstins, setFormData, setGstData, setLoading, setOnboardingData, setOnboardingStep, setPanData, setParentOtpSent, setPasswordForm, setPrimaryBusinessData, setPrimaryBusinessStep, setProfileData, setRecoveryInfo, setRecoveryOptions, setRedirectUri, setRegistrationMode, setSelectedRecoveryMethod, setSessions, setSettingsData, setSetup2FAData, setShowAccountSwitcher, setShowBusinessTypeModal, setSidebarCategory, setSignupFetchedGstins, setSignupType, setState, setSuccessMessage, setTempToken, setUseSavedAccount, setUserEmails, setUsernameSuggestions, setVerificationStatus, setVerifyPanResult, setView, setVkycUrl, settingsData, showAccountSwitcher, showAlert, showBusinessTypeModal, showGstModal, showLegalPage, showPanModal, sidebarCategory, signupFetchedGstins, signupType, successMessage, tempToken, useSavedAccount, usernameSuggestions, validatePassword, verificationStatus, verifyPanResult, view, vkycUrl, authLogo, cliksBusinessLogo, cliksLogo, bitToolLogo,} = useAppContext();

  return (
    <>
      
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="content-section"
              >
                <header className="section-header">
                  <h2>Account Settings</h2>
                  <p>Manage your recovery information and security preferences.</p>
                </header>

                <div className="account-settings-grid">
                  {/* Left: Recovery Information Card */}
                  <div className="account-settings-card">
                    <div className="account-settings-card-header recovery-header">
                      <div className="account-settings-header-icon-box shield-badge">
                        <ShieldCheck size={20} />
                      </div>
                      <div className="account-settings-header-text">
                        <h3>Recovery Information</h3>
                        <p>Keep your recovery details up to date to secure your account.</p>
                      </div>
                    </div>

                    <div className="account-settings-card-body">
                      <div className="account-settings-field">
                        <label className="account-settings-label">Recovery Email</label>
                        <span className="account-settings-helper">Used to recover your account and receive important notifications.</span>
                        <div className="account-settings-input-box">
                          <Mail size={18} className="field-icon" />
                          <input
                            type="email"
                            value={recoveryInfo.recoveryEmail || ''}
                            onChange={(e) => setRecoveryInfo({ ...recoveryInfo, recoveryEmail: e.target.value })}
                            placeholder="Add recovery email"
                            disabled={!isEditingRecovery}
                          />
                        </div>
                      </div>

                      <div className="account-settings-field">
                        <label className="account-settings-label">Phone Number</label>
                        <span className="account-settings-helper">Used for account recovery and security alerts.</span>
                        <div className="account-settings-input-box">
                          <Phone size={18} className="field-icon" />
                          <input
                            type="text"
                            value={recoveryInfo.phoneNumber || ''}
                            onChange={(e) => setRecoveryInfo({ ...recoveryInfo, phoneNumber: e.target.value })}
                            placeholder="Add phone number"
                            disabled={!isEditingRecovery}
                          />
                        </div>
                      </div>

                      <div className="account-settings-actions">
                        {isEditingRecovery ? (
                          <>
                            <button className="btn-account-settings-cancel" onClick={() => setIsEditingRecovery(false)}>
                              Cancel
                            </button>
                            <button className="btn-account-settings-primary" onClick={handleUpdateRecovery} disabled={loading}>
                              <Save size={15} /> Save Changes
                            </button>
                          </>
                        ) : (
                          <button className="btn-account-settings-primary" onClick={() => setIsEditingRecovery(true)}>
                            <Edit3 size={15} /> Edit Details
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Preferences Card */}
                  <div className="account-settings-card">
                    <div className="account-settings-card-header preferences-header">
                      <div className="account-settings-header-icon-box gear-badge">
                        <Settings size={20} />
                      </div>
                      <div className="account-settings-header-text">
                        <h3>Preferences</h3>
                        <p>Customize your account experience and security preferences.</p>
                      </div>
                    </div>

                    <div className="account-settings-card-body preferences-body">
                      <div className="preferences-empty-state">
                        <div className="preferences-empty-illustration">
                          <div className="preferences-empty-circle">
                            <Settings size={34} className="preferences-gear-icon" />
                          </div>
                          <span className="pref-sparkle p1"></span>
                          <span className="pref-sparkle p2"></span>
                          <span className="pref-sparkle p3"></span>
                          <span className="pref-sparkle p4"></span>
                        </div>
                        <h4>Additional settings coming soon</h4>
                        <p>We're working on new features to give you more control over your account.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            
    </>
  );
};

export default SettingsTab;
