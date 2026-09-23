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
import betaLogo from '../assets/beta2.png';
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
                        <div className="banner-tags" style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '6px' }}>
                          <span style={{ fontSize: '10px', background: 'var(--primary-soft)', color: 'var(--primary)', padding: '3px 10px', borderRadius: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            {profileData?.accountType === 'PUBLIC' ? 'PERSONAL' : (profileData?.accountType || 'PERSONAL')}
                          </span>
                          {profileData?.accountType === 'BUSINESS' && profileData?.isPrimary && (
                            <span style={{ fontSize: '10px', background: '#f0fdf4', color: '#15803d', padding: '3px 10px', borderRadius: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center' }}>
                              <Check size={12} style={{ marginRight: '4px' }} />
                              Primary
                            </span>
                          )}
                        </div>
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
                            <div className="row-tags" style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                              <span style={{ fontSize: '9px', background: 'var(--primary-soft)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                {account.userData?.accountType === 'PUBLIC' ? 'PERSONAL' : (account.userData?.accountType || 'PERSONAL')}
                              </span>
                              {account.userData?.accountType === 'BUSINESS' && account.userData?.isPrimary && (
                                <span style={{ fontSize: '9px', background: '#f0fdf4', color: '#15803d', padding: '2px 8px', borderRadius: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center' }}>
                                  <Check size={10} style={{ marginRight: '3px' }} />
                                  Primary
                                </span>
                              )}
                            </div>
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
              <div className="icon-box" style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LogOut size={18} />
              </div>
              <span className="label" style={{ marginLeft: '12px' }}>Sign Out</span>
            </button>
          </footer>
        </aside>

        <main className="dashboard-content">
          <AnimatePresence mode="wait">
            <Outlet />
          </AnimatePresence>
        </main>

        {/* Business Type Modal */}
        {showBusinessTypeModal && (
          <div className="auth-modal-overlay">
            <div className="auth-modal-content animate-scale-in" style={{ maxWidth: "450px", padding: '32px' }}>
              <div className="auth-modal-header" style={{ flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
                <img src={betaLogo} alt="b2auth beta" className="auth-logo" style={{ height: '40px', marginBottom: '16px' }} />
                <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Select Business Type</h3>
                <button className="auth-close-btn" onClick={() => { setShowBusinessTypeModal(false); setError(''); }} style={{ position: 'absolute', top: '16px', right: '16px' }}>
                  <X size={20} />
                </button>
              </div>
              <div className="auth-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '8px' }}>
                  Choose your business structure to proceed with primary account verification.
                </p>
                
                <div className="selection-card-premium" onClick={() => handleBusinessTypeSelect('Sole Proprietorship')} style={{ cursor: 'pointer' }}>
                  <div className="selection-icon-circle">
                    <User size={24} />
                  </div>
                  <div className="selection-content">
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>Sole Proprietorship</h3>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>For individual business owners & freelancers (Requires GSTIN)</p>
                  </div>
                  <ChevronRight className="arrow-icon" size={20} color="var(--text-tertiary)" />
                </div>

                <div className="selection-card-premium" onClick={() => handleBusinessTypeSelect('Organization')} style={{ cursor: 'pointer' }}>
                  <div className="selection-icon-circle business">
                    <Building size={24} />
                  </div>
                  <div className="selection-content">
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>Organization</h3>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>For registered companies, LLPs, etc. (Requires PAN)</p>
                  </div>
                  <ChevronRight className="arrow-icon" size={20} color="var(--text-tertiary)" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GST Verification Modal */}
        {showGstModal && (
          <div className="auth-modal-overlay">
            <div className="auth-modal-content animate-scale-in" style={{ maxWidth: "420px", padding: '32px' }}>
              <div className="auth-modal-header" style={{ flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
                <img src={betaLogo} alt="b2auth beta" className="auth-logo" style={{ height: '40px', marginBottom: '16px' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)' }}>
                  <ShieldCheck size={24} />
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>Verify GSTIN</h3>
                </div>
                <button className="auth-close-btn" onClick={() => { setShowGstModal(false); setError(''); }} style={{ position: 'absolute', top: '16px', right: '16px' }}>
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleVerifyGst} className="auth-modal-body">
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px', textAlign: 'center' }}>
                  Please verify your active GSTIN to secure and upgrade this email as your primary business account.
                </p>
                <div className="auth-input-group" style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px', display: 'block', color: 'var(--text-secondary)' }}>Enter GSTIN</label>
                  <input
                    type="text"
                    placeholder="e.g. 22AAAAA0000A1Z5"
                    value={gstData.gstin}
                    onChange={e => setGstData({ ...gstData, gstin: e.target.value.toUpperCase() })}
                    required
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '14px', textTransform: 'uppercase' }}
                  />
                </div>
                {error && <div className="error-message" style={{ color: 'red', marginBottom: '16px', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '4px', fontSize: '13px' }}>{error}</div>}
                <button
                  type="submit"
                  className="action-btn primary-solid"
                  disabled={loading || !gstData.gstin}
                  style={{ width: '100%', padding: '12px', fontSize: '15px', fontWeight: '600' }}
                >
                  {loading ? <RefreshCw className="spin" size={18} /> : "Verify GSTIN"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* PAN Verification Modal */}
        {/* PAN Verification Modal */}
        {showPanModal && (
          <div className="auth-modal-overlay">
            <div className="auth-modal-content animate-scale-in" style={{ maxWidth: "450px", padding: '32px' }}>
              <div className="auth-modal-header" style={{ flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
                <img src={betaLogo} alt="b2auth beta" className="auth-logo" style={{ height: '40px', marginBottom: '16px' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)' }}>
                  <ShieldCheck size={24} />
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>Verify Organization PAN</h3>
                </div>
                <button className="auth-close-btn" onClick={() => { setShowPanModal(false); setError(''); }} style={{ position: 'absolute', top: '16px', right: '16px' }}>
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleVerifyPan} className="auth-modal-body">
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px', textAlign: 'center' }}>
                  Please verify your organization's PAN to link this email as your primary business account.
                </p>
                
                <div className="auth-input-group" style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px', display: 'block', color: 'var(--text-secondary)' }}>Organization PAN Number</label>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <input
                      type="text"
                      placeholder="Enter 10-digit PAN"
                      value={panData.panNumber}
                      onChange={e => setPanData({ ...panData, panNumber: e.target.value.toUpperCase() })}
                      maxLength={10}
                      required
                      style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '14px', textTransform: 'uppercase' }}
                    />
                    {profileData?.accountType === 'BUSINESS' && (
                      <button
                        type="button"
                        className="action-btn outline"
                        onClick={handleFetchGstins}
                        disabled={fetchingGstins || panData.panNumber.length !== 10}
                        style={{ whiteSpace: 'nowrap', padding: '0 16px' }}
                      >
                        {fetchingGstins ? <RefreshCw className="spin" size={16} /> : "Fetch GSTINs"}
                      </button>
                    )}
                  </div>
                </div>
                
                {profileData?.accountType === 'BUSINESS' && fetchedGstins.length > 0 && (
                  <div className="auth-input-group animate-scale-in" style={{ marginBottom: '20px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px', display: 'block', color: 'var(--text-secondary)' }}>Select Associated GSTIN</label>
                    <div style={{ position: 'relative' }}>
                      <select
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '14px', appearance: 'none', backgroundColor: '#f8fafc', cursor: 'pointer' }}
                        value={panData.gstin}
                        onChange={e => setPanData({ ...panData, gstin: e.target.value })}
                        required
                      >
                        <option value="">-- Select a GSTIN --</option>
                        {fetchedGstins.map(g => (
                          <option key={g.gstin} value={g.gstin}>
                            {g.gstin} - {g.stateJurisdiction || g.state || 'ACTIVE'}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={16} color="var(--text-tertiary)" style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    </div>
                  </div>
                )}

                {profileData?.accountType !== 'BUSINESS' && (
                  <div className="auth-input-group" style={{ marginBottom: '20px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px', display: 'block', color: 'var(--text-secondary)' }}>Name on PAN</label>
                    <input
                      type="text"
                      placeholder="Enter exact name as per PAN"
                      value={panData.panName || ''}
                      onChange={e => setPanData({ ...panData, panName: e.target.value })}
                      required
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '14px' }}
                    />
                  </div>
                )}
                
                {error && <div className="error-message" style={{ color: 'red', marginBottom: '16px', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '4px', fontSize: '13px' }}>{error}</div>}
                
                <button
                  type="submit"
                  className="action-btn primary-solid"
                  disabled={loading || !panData.panNumber || (profileData?.accountType === 'BUSINESS' ? !panData.gstin : !panData.panName)}
                  style={{ width: '100%', padding: '12px', fontSize: '15px', fontWeight: '600', marginTop: '8px' }}
                >
                  {loading ? <RefreshCw className="spin" size={18} /> : "Complete Verification"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
  );
};

export default DashboardLayout;
