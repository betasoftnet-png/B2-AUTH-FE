import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import axios from 'axios';
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
  QrCode,
  Keyboard,
  KeyRound
} from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { QRCodeSVG } from 'qrcode.react';
import betaLogo from '../../assets/beta2.png';

const API_BASE = import.meta.env.VITE_API_BASE;

// React-safe QR Scanner Component with idempotent lifecycle & cleanup
const QrScannerCard = ({ onScanSuccess }) => {
  const containerRef = useRef(null);
  const scannerRef = useRef(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    let timerId = null;

    const cleanupScanner = async () => {
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }

      const instance = scannerRef.current;
      scannerRef.current = null;

      if (instance) {
        try {
          await instance.clear();
        } catch (err) {
          // Idempotent and safe ignore if already stopped or container detached
          console.debug("Scanner clear handled:", err);
        }
      }

      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };

    if (!containerRef.current) return;

    // Small delay ensuring container DOM is mounted and sized
    timerId = setTimeout(() => {
      if (!isMountedRef.current || !containerRef.current) return;

      try {
        if (scannerRef.current) return; // Prevent duplicate instances

        const scanner = new Html5QrcodeScanner(
          "reader",
          {
            fps: 10,
            qrbox: { width: 250, height: 250 }
          },
          false
        );
        scannerRef.current = scanner;

        const handleSuccess = (decodedText) => {
          if (!isMountedRef.current) return;
          if (scannerRef.current) {
            const cur = scannerRef.current;
            scannerRef.current = null;
            cur.clear().catch(() => {});
          }
          if (onScanSuccess) {
            onScanSuccess(decodedText);
          }
        };

        const handleError = () => {
          // Ignore transient frame scan errors
        };

        scanner.render(handleSuccess, handleError);

        // Check if unmounted while render was executing
        if (!isMountedRef.current) {
          cleanupScanner();
          return;
        }

        // Decorate HUD and instruction hint as non-React DOM nodes inside #reader
        const scanRegion = containerRef.current.querySelector("#reader__scan_region");
        if (scanRegion && !scanRegion.querySelector(".b2auth-scanner-hud")) {
          const hud = document.createElement("div");
          hud.className = "b2auth-scanner-hud";
          hud.innerHTML = `
            <span class="hud-corner hud-tl"></span>
            <span class="hud-corner hud-tr"></span>
            <span class="hud-corner hud-bl"></span>
            <span class="hud-corner hud-br"></span>
            <div class="hud-laser-line"></div>
            <div class="hud-qr-art">
              <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="76" height="76" rx="14" fill="#F8FAFC"/>
                <rect x="12" y="12" width="22" height="22" rx="5" stroke="#4F46E5" stroke-width="2.5" fill="#EEF2FF"/>
                <rect x="18" y="18" width="10" height="10" rx="2" fill="#4F46E5"/>
                <rect x="42" y="12" width="22" height="22" rx="5" stroke="#4F46E5" stroke-width="2.5" fill="#EEF2FF"/>
                <rect x="48" y="18" width="10" height="10" rx="2" fill="#4F46E5"/>
                <rect x="12" y="42" width="22" height="22" rx="5" stroke="#4F46E5" stroke-width="2.5" fill="#EEF2FF"/>
                <rect x="18" y="48" width="10" height="10" rx="2" fill="#4F46E5"/>
                <rect x="42" y="42" width="6" height="6" rx="1.5" fill="#6366F1"/>
                <rect x="58" y="42" width="6" height="6" rx="1.5" fill="#4F46E5"/>
                <rect x="50" y="50" width="6" height="6" rx="1.5" fill="#6366F1"/>
                <rect x="42" y="58" width="6" height="6" rx="1.5" fill="#4F46E5"/>
                <rect x="58" y="58" width="6" height="6" rx="1.5" fill="#6366F1"/>
                <circle cx="38" cy="23" r="2" fill="#94A3B8"/>
                <circle cx="23" cy="38" r="2" fill="#94A3B8"/>
                <circle cx="38" cy="38" r="2.5" fill="#4F46E5"/>
              </svg>
            </div>
          `;
          scanRegion.appendChild(hud);
        }

        const dashboard = containerRef.current.querySelector("#reader__dashboard");
        if (dashboard && !containerRef.current.querySelector(".scanner-hint")) {
          const hint = document.createElement("p");
          hint.className = "scanner-hint";
          hint.innerText = "Point your camera at the QR code";
          dashboard.parentNode.insertBefore(hint, dashboard);
        }
      } catch (err) {
        console.error("Scanner initialization failed:", err);
        cleanupScanner();
      }
    }, 60);

    return () => {
      isMountedRef.current = false;
      cleanupScanner();
    };
  }, [onScanSuccess]);

  return (
    <div className="qr-scanner-card">
      <div id="reader" ref={containerRef} style={{ width: "100%" }} />
    </div>
  );
};

const SecurityTab = () => {
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

  const [localForgotStep, setLocalForgotStep] = useState('none'); // 'none', 'options', 'otp', 'reset'
  const [localRecoveryOptions, setLocalRecoveryOptions] = useState({});
  const [selectedLocalMethod, setSelectedLocalMethod] = useState(null);
  const [localOtp, setLocalOtp] = useState('');
  const [localNewPassword, setLocalNewPassword] = useState('');
  const [localConfirmPassword, setLocalConfirmPassword] = useState('');
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  const startLocalForgotFlow = async () => {
    setLocalLoading(true);
    setLocalError('');
    const email = profileData?.email || formData.identifier;
    try {
      const res = await axios.get(`${API_BASE}/auth/forgot-password/options?identifier=${email}`);
      if (res.data.success) {
        setLocalRecoveryOptions(res.data.data);
        setLocalForgotStep('options');
      }
    } catch (err) {
      setLocalError(err.response?.data?.message || 'Failed to fetch recovery options');
    } finally {
      setLocalLoading(false);
    }
  };

  const handleLocalSendOtp = async (method) => {
    setLocalLoading(true);
    setLocalError('');
    const email = profileData?.email || formData.identifier;
    try {
      await axios.post(`${API_BASE}/auth/forgot-password/send-otp`, {
        identifier: email,
        method: method
      });
      setSelectedLocalMethod(method);
      setLocalForgotStep('otp');
    } catch (err) {
      setLocalError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLocalLoading(false);
    }
  };

  const handleLocalVerifyOtp = async () => {
    setLocalLoading(true);
    setLocalError('');
    const email = profileData?.email || formData.identifier;
    try {
      const res = await axios.post(`${API_BASE}/auth/forgot-password/verify-otp`, {
        identifier: email,
        otp: localOtp
      });
      if (res.data.success) {
        setLocalForgotStep('reset');
      }
    } catch (err) {
      setLocalError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLocalLoading(false);
    }
  };

  const handleLocalResetPassword = async () => {
    if (localNewPassword !== localConfirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }
    setLocalLoading(true);
    setLocalError('');
    const email = profileData?.email || formData.identifier;
    try {
      await axios.post(`${API_BASE}/auth/reset-password`, {
        identifier: email,
        otp: localOtp,
        newPassword: localNewPassword
      });
      showAlert("Password reset successfully");
      closeChangePasswordModal();
    } catch (err) {
      setLocalError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLocalLoading(false);
    }
  };

  const closeChangePasswordModal = () => {
    setShowChangePasswordModal(false);
    setLocalForgotStep('none');
    setLocalOtp('');
    setLocalNewPassword('');
    setLocalConfirmPassword('');
    setLocalError('');
    setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
    setError('');
  };

  return (
    <>
      
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="content-section"
              >
                <header className="section-header">
                  <h2>Security Dashboard</h2>
                  <p>Settings and recommendations to help you keep your account secure.</p>
                </header>

                <div className="security-grid">
                  {/* Signing in to B2Auth Section */}
                  <div className="security-section">
                    <h3 className="identity-group-title"><LockIcon size={14} /> Signing in to B2Auth</h3>
                    <div className="identity-container">
                      <div className="identity-row">
                        <div className="identity-leading">
                          <div className="identity-icon-box"><LockIcon size={18} /></div>
                        </div>
                        <div className="identity-info">
                          <div className="identity-label">Password</div>
                          <div className="identity-sub">A secure password helps protect your B2Auth Account</div>
                        </div>
                        <div className="identity-trailing">
                          <button className="row-action-btn" onClick={() => setShowChangePasswordModal(true)}>Change</button>
                        </div>
                      </div>
                      <div className="identity-row">
                        <div className="identity-leading">
                          <div className="identity-icon-box"><ShieldCheck size={18} /></div>
                        </div>
                        <div className="identity-info">
                          <div className="identity-label">2-Step Verification</div>
                          <div className="identity-sub">{(profileData?.twoFactorEnabled || settingsData?.twoFactorEnabled) ? 'On' : 'Off'}</div>
                        </div>
                        <div className="identity-trailing">
                          {(profileData?.twoFactorEnabled || settingsData?.twoFactorEnabled) ? (
                            <div className="status-with-action">
                              <div className="status-indicator-pill on">Enabled</div>
                              <button className="row-action-btn disable-btn" onClick={handleDisable2FA}>Disable</button>
                            </div>
                          ) : (
                            <button
                              className="row-action-btn"
                              onClick={handleEnable2FA}
                            >
                              Enable
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cloud Authenticator Section */}
                  <div className="security-section">
                    <div className="header-with-flex">
                      <h3 className="identity-group-title"><Smartphone size={14} /> Cloud Authenticator</h3>
                      <button className="text-link-btn" onClick={() => setShowAddAuthModal(true)}>Add account</button>
                    </div>
                    <div className="identity-container">
                      {authenticatorAccounts.length > 0 ? authenticatorAccounts.map(acc => (
                        <div key={acc.id} className="identity-row auth-row">
                          <div className="identity-leading">
                            <div className="identity-icon-box"><Smartphone size={18} /></div>
                          </div>
                          <div className="identity-info">
                            <div className="identity-label">{acc.accountName}</div>
                            <AuthenticatorCode secret={acc.secretKey} />
                          </div>
                          <div className="identity-trailing">
                            <button style={{color:"red"}} className="icon-action-btn" onClick={() => handleDeleteAuthenticatorAccount(acc.id)}><Trash2 size={14} /></button>
                          </div>
                        </div>
                      )) : (
                        <div className="empty-row-hint">No authenticator accounts synced.</div>
                      )}
                    </div>
                  </div>

                  {/* Your Devices Section */}
                  <div className="security-section">
                    <h3 className="identity-group-title"><Monitor size={14} /> Active Sessions</h3>
                    <div className="identity-container scrollable-identity-container">
                      {sessions.map(session => {
                        const device = parseUserAgent(session.userAgent);
                        return (
                          <div key={session.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                            <div 
                              className="identity-row" 
                              onClick={() => setExpandedSessionId(expandedSessionId === session.id ? null : session.id)}
                              style={{ cursor: 'pointer', borderBottom: 'none' }}
                            >
                              <div className="identity-leading">
                                <div className="identity-icon-box">
                                  {device.type === 'phone' ? <Smartphone size={18} /> :
                                    device.type === 'tablet' ? <Tablet size={18} /> : <Monitor size={18} />}
                                </div>
                              </div>
                              <div className="identity-info">
                                <div className="identity-label">
                                  {device.name}
                                  {session.isCurrentSession && <span className="current-badge-mini">This device</span>}
                                </div>
                                <div className="identity-sub">{session.ipAddress} • {device.browser}</div>
                              </div>
                              <div className="identity-trailing">
                                {!session.isCurrentSession && (
                                  <button className="icon-action-btn" onClick={(e) => { e.stopPropagation(); handleRevokeSession(session.id); }}><LogOut size={16} /></button>
                                )}
                              </div>
                            </div>
                            {expandedSessionId === session.id && (
                              <div style={{ padding: '0 16px 16px 68px', fontSize: '13px', color: '#4b5563' }}>
                                <div style={{ marginBottom: '6px' }}><strong>Location:</strong> {session.location || 'Unknown'}</div>
                                <div><strong>Device/Browser:</strong> {session.userAgent || 'Unknown'}</div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Connected Apps Section */}
                  <div className="security-section">
                    <h3 className="identity-group-title"><Globe size={14} /> Third-party apps with account access</h3>
                    <div className="identity-container scrollable-identity-container">
                      {externalSessions.length > 0 ? externalSessions.map(session => {
                        const device = parseUserAgent(session.userAgent);
                        return (
                        <div key={session.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                          <div 
                            className="identity-row" 
                            onClick={() => setExpandedExternalSessionId(expandedExternalSessionId === session.id ? null : session.id)} 
                            style={{ cursor: 'pointer', borderBottom: 'none' }}
                          >
                            <div className="identity-leading">
                              <div className="identity-icon-box">
                                {session.appName?.toLowerCase().includes('beta storage') || session.appName?.toLowerCase().includes('beta website') ? (
                                  <img src={betaLogo} alt="Beta App" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                                ) : session.appName?.toLowerCase().includes('cliks business') ? (
                                  <img src={cliksBusinessLogo} alt="Cliks Business" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                                ) : session.appName?.toLowerCase().includes('cliks') ? (
                                  <img src={cliksLogo} alt="Cliks" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                                ) : session.appName?.toLowerCase().includes('bit tool') || session.appName?.toLowerCase().includes('bit-tool') ? (
                                  <img src={bitToolLogo} alt="Bit Tool" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                                ) : (
                                  <Globe size={18} />
                                )}
                              </div>
                            </div>
                            <div className="identity-info">
                              <div className="identity-label">{session.appName}</div>
                              <div className="identity-sub">
                                {session.ipAddress} • {device.browser} on {device.name} • Authorized {new Date(session.loggedInAt).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="identity-trailing">
                              <button className="row-action-btn danger" onClick={(e) => { e.stopPropagation(); handleRevokeExternalSession(session.id); }}>Remove access</button>
                            </div>
                          </div>
                          {expandedExternalSessionId === session.id && (
                            <div style={{ padding: '0 16px 16px 68px', fontSize: '13px', color: '#4b5563' }}>
                              <div style={{ marginBottom: '6px' }}><strong>Location:</strong> {session.location || 'Unknown'}</div>
                              <div><strong>User Agent:</strong> {session.userAgent || 'Unknown'}</div>
                            </div>
                          )}
                        </div>
                      );
                      }) : (
                        <div className="empty-row-hint">No apps have access to your account.</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Add Authenticator Account Modal */}
                {showAddAuthModal && (
                  <div className="auth-modal-overlay">
                    <div className="auth-modal-content animate-scale-in">
                      <div className="auth-modal-header add-authenticator-header">
                        <div className="auth-header-left">
                          <div className="auth-header-shield-badge">
                            <ShieldCheck size={20} className="auth-shield-icon" />
                          </div>
                          <div className="auth-header-text">
                            <h3 className="auth-modal-title">Add Authenticator Account</h3>
                            <p className="auth-modal-subtitle">Connect an authenticator to secure your B2Auth account.</p>
                          </div>
                        </div>
                        <button className="auth-close-btn" onClick={() => setShowAddAuthModal(false)} aria-label="Close">
                          <X size={18} />
                        </button>
                      </div>

                      <div className="auth-tab-switcher">
                        <button
                          type="button"
                          className={`auth-tab-btn ${addAuthMode === "scan" ? "active" : ""}`}
                          onClick={() => setAddAuthMode("scan")}
                        >
                          <QrCode size={16} />
                          <span>Scan QR Code</span>
                        </button>
                        <button
                          type="button"
                          className={`auth-tab-btn ${addAuthMode === "manual" ? "active" : ""}`}
                          onClick={() => setAddAuthMode("manual")}
                        >
                          <Keyboard size={16} />
                          <span>Manual Entry</span>
                        </button>
                      </div>

                      <div className="auth-modal-body">
                        {addAuthMode === "scan" ? (
                          <QrScannerCard onScanSuccess={handleProcessQR} />
                        ) : (
                          <div className="manual-entry-card-wrapper">
                            <div className="manual-entry-card">
                              <div className="manual-card-header">
                                <div className="manual-illustration-wrap">
                                  <svg width="48" height="48" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {/* Phone Screen & Body */}
                                    <rect x="25" y="14" width="30" height="42" rx="6" stroke="#4F46E5" strokeWidth="2.5" fill="#FFFFFF"/>
                                    {/* TOTP 2x2 Grid Bits */}
                                    <rect x="31" y="21" width="6" height="6" rx="1.5" fill="#4F46E5"/>
                                    <rect x="43" y="21" width="6" height="6" rx="1.5" fill="#4F46E5"/>
                                    <rect x="31" y="31" width="6" height="6" rx="1.5" fill="#6366F1"/>
                                    <rect x="43" y="31" width="6" height="6" rx="1.5" fill="#6366F1"/>
                                    {/* Keypad Base Dock */}
                                    <rect x="18" y="44" width="44" height="22" rx="6" stroke="#4F46E5" strokeWidth="2.5" fill="#FFFFFF"/>
                                    <circle cx="27" cy="51" r="1.5" fill="#4F46E5"/>
                                    <circle cx="35" cy="51" r="1.5" fill="#4F46E5"/>
                                    <circle cx="45" cy="51" r="1.5" fill="#4F46E5"/>
                                    <circle cx="53" cy="51" r="1.5" fill="#4F46E5"/>
                                    <line x1="27" y1="58" x2="53" y2="58" stroke="#4F46E5" strokeWidth="2.2" strokeLinecap="round"/>
                                    {/* Spark Signals */}
                                    <line x1="64" y1="20" x2="68" y2="17" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round"/>
                                    <line x1="65" y1="28" x2="70" y2="28" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round"/>
                                    <line x1="64" y1="36" x2="68" y2="39" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round"/>
                                  </svg>
                                </div>
                                <h4 className="manual-card-title">Enter Account Details</h4>
                                <p className="manual-card-subtitle">Manually enter the information from your authenticator app.</p>
                              </div>

                              <div className="manual-form-body">
                                <div className="manual-input-group">
                                  <label htmlFor="auth-account-name">Account Name</label>
                                  <div className="input-with-icon">
                                    <User size={18} className="input-icon" />
                                    <input
                                      id="auth-account-name"
                                      type="text"
                                      placeholder="e.g. GitHub: vishal"
                                      value={manualAuthData.name}
                                      onChange={e => setManualAuthData({ ...manualAuthData, name: e.target.value })}
                                      autoComplete="off"
                                    />
                                  </div>
                                </div>

                                <div className="manual-input-group">
                                  <label htmlFor="auth-secret-key">Secret Key</label>
                                  <div className="input-with-icon">
                                    <KeyRound size={18} className="input-icon" />
                                    <input
                                      id="auth-secret-key"
                                      type="text"
                                      placeholder="Enter 2FA secret"
                                      value={manualAuthData.secret}
                                      onChange={e => setManualAuthData({ ...manualAuthData, secret: e.target.value })}
                                      autoComplete="off"
                                    />
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  className="manual-save-btn"
                                  onClick={() => handleAddAuthenticatorAccount(manualAuthData.name, manualAuthData.secret)}
                                  disabled={!manualAuthData.name || !manualAuthData.secret}
                                >
                                  <span>Save Account</span>
                                  <ChevronRight size={18} />
                                </button>
                              </div>
                            </div>

                            <button
                              type="button"
                              className="manual-cancel-btn"
                              onClick={() => setShowAddAuthModal(false)}
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2FA Setup Modal */}
                {showSetup2FAModal && (
                  <div className="auth-modal-overlay">
                    <div className="auth-modal-content animate-scale-in" style={{ maxWidth: '450px' }}>
                      <div className="auth-modal-header">
                        <h3>Enable 2-Step Verification</h3>
                        <button className="auth-close-btn" onClick={() => setShowSetup2FAModal(false)}>
                          <X size={20} />
                        </button>
                      </div>

                      <form onSubmit={handleVerifyAndEnable2FA}>
                        <div className="auth-modal-body" style={{ textAlign: 'center', padding: '24px' }}>
                          <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>
                            Scan this QR code with your authenticator app (e.g. Google Authenticator) or enter the key manually below.
                          </p>

                          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', background: '#fff', padding: '12px', borderRadius: '12px', width: 'fit-content', margin: '0 auto 20px auto', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                            {setup2FAData.qrCodeUrl ? (
                              <QRCodeSVG value={setup2FAData.qrCodeUrl} size={160} />
                            ) : (
                              <div style={{ width: '160px', height: '160px', background: '#f8fafc', borderRadius: '8px' }} />
                            )}
                          </div>

                          <div style={{ marginBottom: '20px' }}>
                            <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Secret Key (Manual Entry):</span>
                            <code style={{ fontSize: '14px', fontWeight: '700', color: 'var(--primary)', background: '#f1f5f9', padding: '6px 12px', borderRadius: '8px', display: 'inline-block', letterSpacing: '0.5px' }}>
                              {setup2FAData.secret}
                            </code>
                          </div>

                          {error && <div className="error-message" style={{ marginBottom: '16px', color: 'var(--danger)', textAlign: 'center' }}>{error}</div>}

                          <div className="auth-input-group" style={{ textAlign: 'left', marginBottom: '20px' }}>
                            <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px', display: 'block' }}>Verification Code</label>
                            <input
                              type="text"
                              maxLength={6}
                              placeholder="Enter 6-digit code"
                              value={setup2FACode}
                              onChange={(e) => setSetup2FACode(e.target.value.replace(/[^0-9]/g, ''))}
                              required
                              style={{ width: '100%', height: '48px', padding: '0 16px', border: '1.5px solid var(--border)', borderRadius: '12px', fontSize: '15px', color: 'var(--text-main)', textAlign: 'center', letterSpacing: '4px', fontWeight: '700' }}
                            />
                          </div>
                        </div>

                        <div className="auth-modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', padding: '16px 24px', borderTop: '1px solid var(--border)' }}>
                          <button type="button" className="text-btn" onClick={() => setShowSetup2FAModal(false)}>Cancel</button>
                          <button type="submit" className="primary-btn" disabled={loading || setup2FACode.length !== 6}>
                            {loading ? 'Verifying...' : 'Verify & Enable'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* Change Password Modal */}
                {showChangePasswordModal && (
                  <div className="auth-modal-overlay">
                    <div className="auth-modal-content animate-scale-in" style={{ maxWidth: "400px" }}>
                      <div className="auth-modal-header">
                        <h3>{localForgotStep === 'none' ? 'Change Password' : localForgotStep === 'reset' ? 'Reset Password' : 'Forgot Password'}</h3>
                        <button className="auth-close-btn" onClick={closeChangePasswordModal}>
                          <X size={20} />
                        </button>
                      </div>
                      <div className="auth-modal-body">
                        {localForgotStep === 'none' ? (
                          <>
                            <div className="auth-input-group">
                              <label>Current Password</label>
                              <input
                                type="password"
                                placeholder="Enter current password"
                                value={passwordForm.oldPassword}
                                onChange={e => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                              />
                              <div className="input-helper-link">
                                <button type="button" onClick={startLocalForgotFlow} className="text-link-btn-small">Forgot password?</button>
                              </div>
                            </div>
                            <div className="auth-input-group">
                              <label>New Password</label>
                              <input
                                type="password"
                                placeholder="Enter new password"
                                value={passwordForm.newPassword}
                                onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                              />
                            </div>
                            <div className="auth-input-group">
                              <label style={{ marginTop: '10px' }}>Confirm New Password</label>
                              <input
                                style={{ marginBottom: '10px' }}
                                type="password"
                                placeholder="Confirm new password"
                                value={passwordForm.confirmPassword}
                                onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                              />
                            </div>
                            {(error || localError) && <div className="error-message-inline" style={{ marginBottom: "16px" }}>{error || localError}</div>}
                            <button
                              className="action-btn primary-solid full-width"
                              onClick={handleChangePassword}
                              disabled={loading || localLoading || !passwordForm.oldPassword || !passwordForm.newPassword || passwordForm.newPassword !== passwordForm.confirmPassword}
                            >
                              {loading || localLoading ? <RefreshCw className="spin" size={16} /> : "Update Password"}
                            </button>
                          </>
                        ) : localForgotStep === 'options' ? (
                          <>
                            <p style={{ marginBottom: '16px', color: '#64748b', fontSize: '14px' }}>Choose a method to recover your password:</p>
                            <div className="recovery-options-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                              {localRecoveryOptions?.recoveryEmail && (
                                <div
                                  className={`recovery-option-card ${selectedLocalMethod === 'EMAIL' ? 'selected' : ''}`}
                                  onClick={() => setSelectedLocalMethod('EMAIL')}
                                  style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: selectedLocalMethod === 'EMAIL' ? '#f1f5f9' : 'transparent' }}
                                >
                                  <Mail size={24} color="#0f172a" />
                                  <div>
                                    <div style={{ fontWeight: '600', color: '#0f172a' }}>Email</div>
                                    <div style={{ fontSize: '13px', color: '#64748b' }}>{localRecoveryOptions.recoveryEmail}</div>
                                  </div>
                                </div>
                              )}
                              {localRecoveryOptions?.phoneNumber && (
                                <div
                                  className={`recovery-option-card ${selectedLocalMethod === 'PHONE' ? 'selected' : ''}`}
                                  onClick={() => setSelectedLocalMethod('PHONE')}
                                  style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: selectedLocalMethod === 'PHONE' ? '#f1f5f9' : 'transparent' }}
                                >
                                  <Smartphone size={24} color="#0f172a" />
                                  <div>
                                    <div style={{ fontWeight: '600', color: '#0f172a' }}>Phone</div>
                                    <div style={{ fontSize: '13px', color: '#64748b' }}>{localRecoveryOptions.phoneNumber}</div>
                                  </div>
                                </div>
                              )}
                            </div>
                            {localError && <div className="error-message-inline" style={{ marginBottom: "16px" }}>{localError}</div>}
                            <button
                              className="action-btn primary-solid full-width"
                              onClick={() => handleLocalSendOtp(selectedLocalMethod)}
                              disabled={localLoading || !selectedLocalMethod}
                            >
                              {localLoading ? <RefreshCw className="spin" size={16} /> : "Send Code"}
                            </button>
                          </>
                        ) : localForgotStep === 'otp' ? (
                          <>
                            <p style={{ marginBottom: '16px', color: '#64748b', fontSize: '14px' }}>Enter the verification code sent to {selectedLocalMethod === 'EMAIL' ? localRecoveryOptions.recoveryEmail : localRecoveryOptions.phoneNumber}:</p>
                            <div className="auth-input-group">
                              <input
                                type="text"
                                placeholder="6-digit code"
                                value={localOtp}
                                onChange={e => setLocalOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                              />
                            </div>
                            {localError && <div className="error-message-inline" style={{ marginBottom: "16px" }}>{localError}</div>}
                            <button
                              className="action-btn primary-solid full-width"
                              onClick={handleLocalVerifyOtp}
                              disabled={localLoading || localOtp.length !== 6}
                            >
                              {localLoading ? <RefreshCw className="spin" size={16} /> : "Verify Code"}
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="auth-input-group">
                              <label>New Password</label>
                              <input
                                type="password"
                                placeholder="Enter new password"
                                value={localNewPassword}
                                onChange={e => setLocalNewPassword(e.target.value)}
                              />
                            </div>
                            <div className="auth-input-group">
                              <label style={{ marginTop: '10px' }}>Confirm New Password</label>
                              <input
                                style={{ marginBottom: '10px' }}
                                type="password"
                                placeholder="Confirm new password"
                                value={localConfirmPassword}
                                onChange={e => setLocalConfirmPassword(e.target.value)}
                              />
                            </div>
                            {localError && <div className="error-message-inline" style={{ marginBottom: "16px" }}>{localError}</div>}
                            <button
                              className="action-btn primary-solid full-width"
                              onClick={handleLocalResetPassword}
                              disabled={localLoading || !localNewPassword || localNewPassword !== localConfirmPassword}
                            >
                              {localLoading ? <RefreshCw className="spin" size={16} /> : "Reset Password"}
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}


              </motion.div>
            
    </>
  );
};

export default SecurityTab;
