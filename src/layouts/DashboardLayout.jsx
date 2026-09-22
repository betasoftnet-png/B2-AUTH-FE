import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
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
import authLogo from '../assets/auth2.png';
import cliksLogo from '../assets/cliks.png';
import cliksBusinessLogo from '../assets/cliks-business.png';
import bitToolLogo from '../assets/BIT-TOOL-2.png';

const DashboardLayout = () => {
  const {
    profileData, redirectUri, handleLogout, handleAddAccount,
    topbarRightRef, showAccountSwitcher, setShowAccountSwitcher, accounts,
    handleSwitchAccount, handleProfileClick, sidebarCategory, setSidebarCategory,
    accessToken, fetchFullProfile, fetchAuthenticatorAccounts, fetchSessions, fetchExternalSessions,
    handleGoToMailSignup,
    AuthenticatorCode, PasswordRequirements, addAuthMode, authenticatorAccounts, businessSignupType, businessTypeData, calculateAge, clientId, customAlert, dashboardTab, error, expandedExternalSessionId, expandedSessionId, externalSessions, fetchEmails, fetchRecoveryInfo, fetchedGstins, fetchingGstins, fetchingSignupGstins, formData, gstData, handleAddAuthenticatorAccount, handleBusinessTypeSelect, handleChangePassword, handleCreateAccountClick, handleCreateMailbox, handleDeleteAuthenticatorAccount, handleDisable2FA, handleEnable2FA, handleFetchGstins, handleFileChange, handleFinalSignupSubmit, handleForgotInModal, handleForgotPasswordClick, handleForgotPasswordClickWithEmail, handleForgotPasswordIdentifierSubmit, handleInputChange, handleLogin, handleMailFormSubmit, handleMakePrimary, handleOnboardingSubmit, handleProcessQR, handleRegisterProfile, handleResetPassword, handleRevokeExternalSession, handleRevokeSession, handleSelectAccount, handleSend2faRecoveryOtp, handleSendMobileOtp, handleSendOtp, handleSendParentOtp, handleSignOutAll, handleUpdateRecovery, handleVerificationCallback, handleVerify2faRecoveryOtp, handleVerifyAndEnable2FA, handleVerifyGst, handleVerifyLogin2fa, handleVerifyMobileOtp, handleVerifyOtp, handleVerifyPan, handleVerifyParentOtp, isEditingRecovery, language, leaveLegalPage, loading, manualAuthData, mobileOtpStep, normalizeIdentifier, onboardingData, onboardingStep, panData, parentOtpSent, parseUserAgent, passwordForm, primaryBusinessData, primaryBusinessStep, recoveryInfo, recoveryOptions, registrationMode, resetSignupForm, saveAccount, selectedRecoveryMethod, sessions, setAccessToken, setAccounts, setAddAuthMode, setAuthenticatorAccounts, setBusinessSignupType, setBusinessTypeData, setClientId, setCustomAlert, setDashboardTab, setError, setExpandedExternalSessionId, setExpandedSessionId, setExternalSessions, setFetchedGstins, setFetchingGstins, setFetchingSignupGstins, setFormData, setGstData, setIsEditingRecovery, setLanguage, setLoading, setManualAuthData, setMobileOtpStep, setOnboardingData, setOnboardingStep, setPanData, setParentOtpSent, setPasswordForm, setPrimaryBusinessData, setPrimaryBusinessStep, setProfileData, setRecoveryInfo, setRecoveryOptions, setRedirectUri, setRegistrationMode, setSelectedRecoveryMethod, setSessions, setSettingsData, setSetup2FACode, setSetup2FAData, setShow2faRecovery, setShowAddAuthModal, setShowBusinessTypeModal, setShowChangePasswordModal, setShowGstModal, setShowPanModal, setShowSetup2FAModal, setSignupFetchedGstins, setSignupType, setState, setSuccessMessage, setTempToken, setUseSavedAccount, setUserEmails, setUsernameSuggestions, setVerificationStatus, setVerifyPanResult, setView, setVkycUrl, settingsData, setup2FACode, setup2FAData, show2faRecovery, showAddAuthModal, showAlert, showBusinessTypeModal, showChangePasswordModal, showGstModal, showLegalPage, showPanModal, showSetup2FAModal, signupFetchedGstins, signupType, state, successMessage, tempToken, useSavedAccount, userEmails, usernameSuggestions, validatePassword, verificationStatus, verifyPanResult, view, vkycUrl, authLogo, cliksBusinessLogo, cliksLogo, bitToolLogo,} = useAppContext();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!accessToken) {
      navigate('/');
    }
  }, [accessToken, navigate]);

  const currentTab = location.pathname.split('/')[1] || 'dashboard';

  return (
      <div className="dashboard-container">
        {/* Top Navigation / Account Switcher */}
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <div className="navbar-brand">
              <img src={authLogo} alt="B2Auth" className="navbar-logo-img" />
              <span className="brand-text">B2Auth</span>
            </div>
          </div>

          <div className="topbar-center">
            <div className="navbar-pill-container">
              <button
                className={`navbar-pill-item ${currentTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </button>
              <button
                className={`navbar-pill-item ${currentTab === 'security' ? 'active' : ''}`}
                onClick={() => {
                  navigate('/security');
                  fetchFullProfile(accessToken);
                  fetchAuthenticatorAccounts(accessToken);
                  fetchSessions(accessToken);
                  fetchExternalSessions(accessToken);
                }}
              >
                Security
              </button>
              <button
                className={`navbar-pill-item ${currentTab === 'settings' ? 'active' : ''}`}
                onClick={() => navigate('/settings')}
              >
                Settings
              </button>
            </div>
          </div>

          <div className="topbar-right" ref={topbarRightRef}>
            <div className="account-switcher-container">
              <button
                className="profile-trigger-btn"
                onClick={() => setShowAccountSwitcher(!showAccountSwitcher)}
              >
                <div className="avatar-circle-elite">
                  {formData.firstName?.[0] || formData.identifier?.[0]?.toUpperCase() || 'U'}
                </div>
                <span className="profile-display-name">
                  {formData.firstName ? `${formData.firstName} ${formData.lastName || ''}`.trim() : (formData.identifier || 'User')}
                </span>
                <ChevronDown 
                  size={16} 
                  style={{ 
                    color: '#5f6368', 
                    transition: 'transform 0.2s ease',
                    transform: showAccountSwitcher ? 'rotate(180deg)' : 'rotate(0deg)'
                  }} 
                />
              </button>

              {showAccountSwitcher && (
                <>
                  <div className="switcher-overlay-fixed" onClick={() => setShowAccountSwitcher(false)} />
                  <div className="switcher-panel animate-scale-in">
                    <div className="current-account-banner">
                      <div className="banner-avatar">
                        {formData.firstName?.[0] || formData.identifier?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <div className="banner-info">
                        <div className="banner-name">{formData.firstName} {formData.lastName}</div>
                        <div className="banner-email">{formData.identifier}</div>
                      </div>
                      <button className="manage-link" onClick={handleProfileClick}>Manage your Account</button>
                    </div>

                    <div className="other-accounts-section">
                      {accounts.filter(a => a.token !== accessToken).map(account => (
                        <div
                          key={account.userData?.email}
                          className="account-row"
                          onClick={() => handleSwitchAccount(account)}
                        >
                          <div className="row-avatar">
                            {account.userData?.firstName?.[0] || account.userData?.email?.[0]?.toUpperCase() || 'U'}
                          </div>
                          <div className="row-info">
                            <div className="row-name">{account.userData?.firstName} {account.userData?.lastName}</div>
                            <div className="row-email">{account.userData?.email}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="switcher-actions-list">
                      <button className="action-item-btn" onClick={handleAddAccount}>
                        <Plus size={18} />
                        <span>Add another account</span>
                      </button>
                      <button className="action-item-btn" onClick={handleSignOutAll}>
                        <LogOut size={18} />
                        <span>Sign out of all accounts</span>
                      </button>
                    </div>

                    <footer className="switcher-legal">
                      <button onClick={() => showLegalPage('privacy')}>Privacy Policy</button>
                      <span className="dot">•</span>
                      <button onClick={() => showLegalPage('terms')}>Terms of Service</button>
                    </footer>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <aside className="dashboard-sidebar">
          <nav className="sidebar-nav">
            <div className="sidebar-group-label" style={{ padding: '0 16px 8px', fontSize: '12px', fontWeight: 600, color: '#5f6368', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Your Accounts
            </div>
            {['ALL', 'PRIMARY', 'BUSINESS', 'PERSONAL', 'CHILD'].map((category) => {
              const isActive = sidebarCategory === category;
              const typeLabel = category === 'ALL' ? 'All Accounts' : 
                  category.charAt(0).toUpperCase() + category.slice(1).toLowerCase() + ' Account';
                  
              const getIcon = () => {
                if (category === 'BUSINESS') return <Briefcase size={16} />;
                if (category === 'PERSONAL') return <User size={16} />;
                if (category === 'CHILD') return <User size={16} />;
                if (category === 'PRIMARY') return <CheckCircle size={16} />;
                return <Mail size={16} />;
              };

              return (
                <button
                  key={category}
                  className={`sidebar-item ${isActive ? 'active' : ''}`}
                  onClick={() => setSidebarCategory(category)}
                  style={{ height: 'auto', padding: '12px 16px', alignItems: 'center' }}
                >
                  <div className="icon-box" style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: isActive ? '#e8f0fe' : '#f1f3f4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isActive ? '#1a73e8' : '#5f6368', flexShrink: 0 }}>
                    {getIcon()}
                  </div>
                  <div className="label" style={{ marginLeft: '12px', fontWeight: 600, fontSize: '14px', color: isActive ? '#1a73e8' : '#202124' }}>
                    {typeLabel}
                  </div>
                </button>
              );
            })}

            <button
              className="sidebar-item"
              onClick={handleAddAccount}
              style={{ marginTop: '8px' }}
            >
              <div className="icon-box"><Plus size={18} /></div>
              <span className="label">Add account</span>
            </button>
          </nav>

          <div className="sidebar-spacer"></div>

          <footer className="sidebar-footer">
            <button className="sidebar-item logout-minimal" onClick={handleLogout}>
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </footer>
        </aside>

        <main className="dashboard-content">
          <AnimatePresence mode="wait">
            <Outlet />
          </AnimatePresence>
        </main>
      </div>
  );
};

export default DashboardLayout;
