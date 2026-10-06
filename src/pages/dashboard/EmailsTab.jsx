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
  ChevronLeft,
  Crown
} from 'lucide-react';

const EmailsTab = () => {
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
        key="emails"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="content-section"
      >
        <header className="section-header">
          <h2>Admin</h2>
          <p>Manage your linked mail accounts and primary address.</p>
        </header>

        {error && !showGstModal && !showPanModal && !showSetup2FAModal && !showChangePasswordModal && (
          <div className="error-message" style={{ color: 'red', marginBottom: '16px', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '8px' }}>
            {error}
          </div>
        )}

        {/* Primary Account Card Section */}
        <div className="admin-primary-cards-list">
          {userEmails.map(email => (
            <div key={email.id} className="admin-primary-card">
              <div className="admin-primary-card-leading">
                <div className="admin-primary-icon-box">
                  <Mail size={20} />
                </div>
                <div className="admin-primary-card-info">
                  <div className="admin-primary-email">{email.email}</div>
                  <div className="admin-primary-meta">
                    <span className="admin-primary-username">{email.emailName}</span>
                    <span className="admin-status-wrap">
                      <span className={`admin-status-dot ${email.active ? 'active' : 'inactive'}`} />
                      <span className="admin-status-text">{email.active ? 'Active' : 'Inactive'}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="admin-primary-card-trailing">
                {email.isPrimary ? (
                  <span className="admin-primary-badge">
                    <Crown size={14} /> Primary
                  </span>
                ) : (
                  <button
                    className="btn-admin-make-primary"
                    onClick={() => handleMakePrimary(email.id)}
                    disabled={loading}
                  >
                    <Crown size={14} /> Make Primary
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Logged-in Identities Section */}
        <div className="admin-identities-section">
          <header className="admin-section-header">
            <h2>Logged-in Identities</h2>
            <p>Quickly switch between your active B2Auth accounts.</p>
          </header>

          {/* Business Accounts Section */}
          {(sidebarCategory === 'ALL' ? accounts.some(a => a.userData.accountType === 'BUSINESS') : sidebarCategory === 'BUSINESS') && (
            <div className="admin-identity-group">
              <div className="admin-group-title">
                <Building size={15} />
                <span>BUSINESS ACCOUNTS</span>
              </div>
              <div className="admin-accounts-list">
                {accounts.filter(a => a.userData.accountType === 'BUSINESS').length > 0 ? (
                  accounts.filter(a => a.userData.accountType === 'BUSINESS').map(account => {
                    const isCurrent = account.token === accessToken;
                    return (
                      <div
                        key={account.userData.email}
                        className={`admin-account-card ${isCurrent ? 'current-account' : ''}`}
                        onClick={() => !isCurrent && handleSwitchAccount(account)}
                      >
                        <div className="admin-account-leading">
                          <div className={`admin-account-avatar ${isCurrent ? 'purple' : 'blue'}`}>
                            {account.userData.firstName?.[0] || account.userData.email[0].toUpperCase()}
                          </div>
                          <div className="admin-account-info">
                            <div className="admin-account-name-row">
                              <span className="admin-account-name">
                                {account.userData.firstName} {account.userData.lastName}
                              </span>
                              {isCurrent && <span className="admin-current-badge">CURRENT</span>}
                              {account.userData.isPrimary && <span className="admin-primary-tag">Primary</span>}
                            </div>
                            <div className="admin-account-email">{account.userData.email}</div>
                          </div>
                        </div>
                        <div className="admin-account-trailing">
                          <div className="admin-chevron-circle">
                            <ChevronRight size={17} />
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="admin-empty-accounts">
                    No business accounts found.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Personal Accounts Section */}
          {(sidebarCategory === 'ALL' ? accounts.some(a => a.userData.accountType === 'PERSONAL' || a.userData.accountType === 'PUBLIC') : sidebarCategory === 'PERSONAL') && (
            <div className="admin-identity-group">
              <div className="admin-group-title">
                <User size={15} />
                <span>PERSONAL ACCOUNTS</span>
              </div>
              <div className="admin-accounts-list">
                {accounts.filter(a => a.userData.accountType === 'PERSONAL' || a.userData.accountType === 'PUBLIC').length > 0 ? (
                  accounts.filter(a => a.userData.accountType === 'PERSONAL' || a.userData.accountType === 'PUBLIC').map(account => {
                    const isCurrent = account.token === accessToken;
                    return (
                      <div
                        key={account.userData.email}
                        className={`admin-account-card ${isCurrent ? 'current-account' : ''}`}
                        onClick={() => !isCurrent && handleSwitchAccount(account)}
                      >
                        <div className="admin-account-leading">
                          <div className={`admin-account-avatar ${isCurrent ? 'purple' : 'blue'}`}>
                            {account.userData.firstName?.[0] || account.userData.email[0].toUpperCase()}
                          </div>
                          <div className="admin-account-info">
                            <div className="admin-account-name-row">
                              <span className="admin-account-name">
                                {account.userData.firstName} {account.userData.lastName}
                              </span>
                              {isCurrent && <span className="admin-current-badge">CURRENT</span>}
                              {account.userData.isPrimary && <span className="admin-primary-tag">Primary</span>}
                            </div>
                            <div className="admin-account-email">{account.userData.email}</div>
                          </div>
                        </div>
                        <div className="admin-account-trailing">
                          <div className="admin-chevron-circle">
                            <ChevronRight size={17} />
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="admin-empty-accounts">
                    No personal accounts found.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Child Accounts Section */}
          {(sidebarCategory === 'ALL' ? accounts.some(a => a.userData.accountType === 'CHILD') : sidebarCategory === 'CHILD') && (
            <div className="admin-identity-group">
              <div className="admin-group-title">
                <User size={15} />
                <span>CHILD ACCOUNTS</span>
              </div>
              <div className="admin-accounts-list">
                {accounts.filter(a => a.userData.accountType === 'CHILD').length > 0 ? (
                  accounts.filter(a => a.userData.accountType === 'CHILD').map(account => {
                    const isCurrent = account.token === accessToken;
                    return (
                      <div
                        key={account.userData.email}
                        className={`admin-account-card ${isCurrent ? 'current-account' : ''}`}
                        onClick={() => !isCurrent && handleSwitchAccount(account)}
                      >
                        <div className="admin-account-leading">
                          <div className={`admin-account-avatar ${isCurrent ? 'purple' : 'blue'}`}>
                            {account.userData.firstName?.[0] || account.userData.email[0].toUpperCase()}
                          </div>
                          <div className="admin-account-info">
                            <div className="admin-account-name-row">
                              <span className="admin-account-name">
                                {account.userData.firstName} {account.userData.lastName}
                              </span>
                              {isCurrent && <span className="admin-current-badge">CURRENT</span>}
                              {account.userData.isPrimary && <span className="admin-primary-tag">Primary</span>}
                            </div>
                            <div className="admin-account-email">{account.userData.email}</div>
                          </div>
                        </div>
                        <div className="admin-account-trailing">
                          <div className="admin-chevron-circle">
                            <ChevronRight size={17} />
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="admin-empty-accounts">
                    No child accounts found.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Primary Accounts Section */}
          {(sidebarCategory === 'ALL' ? accounts.some(a => a.userData.isPrimary) : sidebarCategory === 'PRIMARY') && (
            <div className="admin-identity-group">
              <div className="admin-group-title">
                <CheckCircle size={15} />
                <span>PRIMARY ACCOUNTS</span>
              </div>
              <div className="admin-accounts-list">
                {accounts.filter(a => a.userData.isPrimary).length > 0 ? (
                  accounts.filter(a => a.userData.isPrimary).map(account => {
                    const isCurrent = account.token === accessToken;
                    return (
                      <div
                        key={account.userData.email}
                        className={`admin-account-card ${isCurrent ? 'current-account' : ''}`}
                        onClick={() => !isCurrent && handleSwitchAccount(account)}
                      >
                        <div className="admin-account-leading">
                          <div className={`admin-account-avatar ${isCurrent ? 'purple' : 'blue'}`}>
                            {account.userData.firstName?.[0] || account.userData.email[0].toUpperCase()}
                          </div>
                          <div className="admin-account-info">
                            <div className="admin-account-name-row">
                              <span className="admin-account-name">
                                {account.userData.firstName} {account.userData.lastName}
                              </span>
                              {isCurrent && <span className="admin-current-badge">CURRENT</span>}
                              {account.userData.isPrimary && <span className="admin-primary-tag">Primary</span>}
                            </div>
                            <div className="admin-account-email">{account.userData.email}</div>
                          </div>
                        </div>
                        <div className="admin-account-trailing">
                          <div className="admin-chevron-circle">
                            <ChevronRight size={17} />
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="admin-empty-accounts">
                    No primary accounts found.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default EmailsTab;

