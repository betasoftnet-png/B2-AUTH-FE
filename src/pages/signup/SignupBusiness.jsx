import axios from 'axios';
const API_BASE = 'http://localhost:3000/api';
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

const SignupBusiness = () => {

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
                <label style={{ fontSize: '18px', fontWeight: '700', display: 'block', marginBottom: '8px' }}>Create business account</label>
                <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '600', marginBottom: '8px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Step 1 of 4</div>
                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
                  Choose your business account type.
                </p>
                {error && <div className="error-message" style={{ marginBottom: '16px' }}>{error}</div>}
              </div>
              
              {(businessSignupType === 'secondary' || primaryBusinessStep === 0) && (
                <div className="business-signup-tabs" style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                  <button
                    type="button"
                    onClick={() => setBusinessSignupType('secondary')}
                    style={{ flex: 1, padding: '16px', borderRadius: '12px', border: businessSignupType === 'secondary' ? '2px solid var(--primary)' : '2px solid var(--border)', background: businessSignupType === 'secondary' ? 'var(--primary-soft)' : 'transparent', color: businessSignupType === 'secondary' ? 'var(--primary)' : 'var(--text-secondary)', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}
                  >
                    <span style={{ fontSize: '16px' }}>Secondary</span>
                    <span style={{ fontSize: '12px', fontWeight: '400', opacity: 0.8 }}>Standard flow</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setBusinessSignupType('primary')}
                    style={{ flex: 1, padding: '16px', borderRadius: '12px', border: businessSignupType === 'primary' ? '2px solid var(--primary)' : '2px solid var(--border)', background: businessSignupType === 'primary' ? 'var(--primary-soft)' : 'transparent', color: businessSignupType === 'primary' ? 'var(--primary)' : 'var(--text-secondary)', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}
                  >
                    <span style={{ fontSize: '16px' }}>Primary</span>
                    <span style={{ fontSize: '12px', fontWeight: '400', opacity: 0.8 }}>Verified account</span>
                  </button>
                </div>
              )}

              {businessSignupType === 'primary' ? (
                <>
                  {primaryBusinessStep === 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <p style={{ textAlign: 'center', fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                        Choose your business size to continue verification
                      </p>
                      
                      <div 
                        onClick={() => {
                          setPrimaryBusinessData(prev => ({ ...prev, size: 'small' }));
                          setPrimaryBusinessStep(1);
                        }}
                        style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--border)', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '16px' }}
                        className="business-size-card hover-lift"
                      >
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '20px', fontWeight: 'bold' }}>S</div>
                        <div>
                          <h4 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>Sole Proprietorship</h4>
                          <p style={{ margin: '0', fontSize: '13px', color: 'var(--text-secondary)' }}>Verify instantly using your GSTIN</p>
                        </div>
                      </div>

                      <div 
                        onClick={() => {
                          setPrimaryBusinessData(prev => ({ ...prev, size: 'large' }));
                          setPrimaryBusinessStep(1);
                        }}
                        style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--border)', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '16px' }}
                        className="business-size-card hover-lift"
                      >
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '20px', fontWeight: 'bold' }}>L</div>
                        <div>
                          <h4 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>Organization</h4>
                          <p style={{ margin: '0', fontSize: '13px', color: 'var(--text-secondary)' }}>Verify via CIN, PAN, and GSTIN details</p>
                        </div>
                      </div>
                      
                      <div className="auth-actions" style={{ marginTop: '16px' }}>
                        <button type="button" className="text-btn" onClick={() => setView('signup-selection')}>Back</button>
                      </div>
                    </div>
                  ) : primaryBusinessStep === 1 ? (
                    <>
                      <div className="name-grid">
                        <div className="input-group"><input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required placeholder=" " /><label>First Name</label></div>
                        <div className="input-group"><input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required placeholder=" " /><label>Last Name</label></div>
                      </div>

                      {primaryBusinessData.size === 'small' ? (
                        <div className="input-group">
                          <input type="text" value={primaryBusinessData.pan} onChange={e => setPrimaryBusinessData(prev => ({ ...prev, pan: e.target.value }))} required placeholder=" " />
                          <label>PAN Number</label>
                        </div>
                      ) : (
                        <>
                          <div className="input-group">
                            <input type="text" value={primaryBusinessData.cin} onChange={e => setPrimaryBusinessData(prev => ({ ...prev, cin: e.target.value }))} required placeholder=" " />
                            <label>CIN Number</label>
                          </div>
                          <div className="input-group">
                            <input type="text" value={primaryBusinessData.pan} onChange={e => setPrimaryBusinessData(prev => ({ ...prev, pan: e.target.value }))} required placeholder=" " />
                            <label>PAN Number</label>
                          </div>
                        </>
                      )}

                      {signupFetchedGstins.length === 0 ? (
                         <div className="auth-actions">
                          <button type="button" className="secondary-btn" onClick={() => {
                            if (!primaryBusinessData.pan) { setError('PAN is required'); return; }
                            setFetchingSignupGstins(true);
                            setError('');
                            axios.get(`${API_BASE}/auth/fetch-gstins?pan=${primaryBusinessData.pan}`)
                              .then(res => {
                                if (res.data.success && res.data.data && res.data.data.length > 0) {
                                  setSignupFetchedGstins(res.data.data);
                                  if (res.data.data.length === 1) {
                                    setPrimaryBusinessData(prev => ({ ...prev, gstin: res.data.data[0].gstin }));
                                  }
                                } else {
                                  setError('No active GSTINs found for this PAN');
                                }
                              })
                              .catch(err => {
                                setError(err.response?.data?.message || err.message || 'Failed to fetch GSTINs');
                              })
                              .finally(() => setFetchingSignupGstins(false));
                          }} disabled={fetchingSignupGstins}>
                            {fetchingSignupGstins ? 'Fetching...' : 'Get GSTINs for PAN'}
                          </button>
                        </div>
                      ) : (
                        <div className="input-group">
                          <select
                            value={primaryBusinessData.gstin}
                            onChange={(e) => setPrimaryBusinessData(prev => ({ ...prev, gstin: e.target.value }))}
                            required
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'transparent' }}
                          >
                            <option value="" disabled>Select GSTIN</option>
                            {signupFetchedGstins.map(g => (
                              <option key={g.gstin} value={g.gstin}>
                                {g.gstin} - {g.businessName} ({g.state})
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                      
                      <div className="auth-actions">
                        <button type="button" className="text-btn" onClick={() => setPrimaryBusinessStep(0)}>Back</button>
                        <button type="submit" className="primary-btn" disabled={loading}>
                          Verify Identity
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="signup-inputs-container">
                        <div className="name-grid">
                          <div className="input-group"><input type="text" name="businessName" value={formData.businessName} onChange={handleInputChange} required placeholder=" " /><label>Business Name</label></div>
                          <div className="input-group"><input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleInputChange} required placeholder=" " /><label>Registration Number (Optional)</label></div>
                        </div>

                        <div className="name-grid">
                          <div className="input-group">
                            <select
                              name="businessType"
                              value={onboardingData.businessType}
                              onChange={(e) => setOnboardingData({ ...onboardingData, businessType: e.target.value })}
                              required
                              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'transparent' }}
                            >
                              <option value="" disabled>Select Business Type</option>
                              <option value="Sole Proprietorship">Sole Proprietorship</option>
                              <option value="Partnership">Partnership</option>
                              <option value="Private Limited">Private Limited</option>
                              <option value="LLP">LLP</option>
                              <option value="Corporation">Corporation</option>
                              <option value="Non-Profit">Non-Profit</option>
                              <option value="Other">Other</option>
                            </select>
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
                              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'transparent' }}
                            >
                              <option value="" disabled>Company Size (Optional)</option>
                              <option value="1-10">1-10 employees</option>
                              <option value="11-50">11-50 employees</option>
                              <option value="51-200">51-200 employees</option>
                              <option value="201-500">201-500 employees</option>
                              <option value="500+">500+ employees</option>
                            </select>
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
                      </div>
                      <div className="auth-actions">
                        <button type="button" className="text-btn" onClick={() => setPrimaryBusinessStep(1)}>Back</button>
                        <button type="submit" className="primary-btn" disabled={loading}>
                          Next
                        </button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="name-grid">
                    <div className="input-group"><input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required placeholder=" " /><label>First Name</label></div>
                    <div className="input-group"><input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required placeholder=" " /><label>Last Name</label></div>
                  </div>
                  <div className="signup-inputs-container">
                    <div className="input-group"><input type="text" name="businessName" value={formData.businessName} onChange={handleInputChange} required placeholder=" " /><label>Business Name</label></div>
                    <div className="input-group"><input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleInputChange} required placeholder=" " /><label>Business ID Number</label></div>
                  </div>
                  <div className="auth-actions">
                    <button type="button" className="text-btn" onClick={() => setView('signup-selection')}>Back</button>
                    <button type="submit" className="primary-btn" disabled={loading}>
                      Next
                    </button>
                  </div>
                </>
              )}
            </form>
    </>
  );
};

export default SignupBusiness;
