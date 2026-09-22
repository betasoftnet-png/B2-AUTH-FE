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

                <div className="settings-grid">
                  <div className="glass-card settings-card">
                    <div className="card-header">
                      <ShieldCheck size={20} className="accent-icon" />
                      <h3>Recovery Information</h3>
                    </div>

                    <div className="settings-form">
                      <div className="settings-group">
                        <label>Recovery Email</label>
                        <div className="input-with-icon">
                          <Mail size={18} />
                          <input
                            type="email"
                            value={recoveryInfo.recoveryEmail || ''}
                            onChange={(e) => setRecoveryInfo({ ...recoveryInfo, recoveryEmail: e.target.value })}
                            placeholder="Add recovery email"
                            disabled={!isEditingRecovery}
                          />
                        </div>
                      </div>

                      <div className="settings-group">
                        <label>Phone Number</label>
                        <div className="input-with-icon">
                          <Phone size={18} />
                          <input
                            type="text"
                            value={recoveryInfo.phoneNumber || ''}
                            onChange={(e) => setRecoveryInfo({ ...recoveryInfo, phoneNumber: e.target.value })}
                            placeholder="Add phone number"
                            disabled={!isEditingRecovery}
                          />
                        </div>
                      </div>

                      <div className="settings-actions">
                        {isEditingRecovery ? (
                          <>
                            <button className="action-btn secondary" onClick={() => setIsEditingRecovery(false)}>Cancel</button>
                            <button className="action-btn primary-solid" onClick={handleUpdateRecovery} disabled={loading}>
                              <Save size={16} /> Save Changes
                            </button>
                          </>
                        ) : (
                          <button className="action-btn secondary" onClick={() => setIsEditingRecovery(true)}>
                            <Edit3 size={16} /> Edit Details
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="glass-card settings-card">
                    <div className="card-header">
                      <Settings size={20} className="accent-icon" />
                      <h3>Preferences</h3>
                    </div>
                    <div className="settings-placeholder">
                      <AlertCircle size={48} />
                      <p>Additional settings coming soon in the next update.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            
    </>
  );
};

export default SettingsTab;
