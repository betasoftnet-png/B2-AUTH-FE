import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import authLogo from '../../assets/auth2.png';
import cliksBusinessLogo from '../../assets/cliks-business.png';
import cliksLogo from '../../assets/cliks.png';
import bitToolLogo from '../../assets/BIT-TOOL-2.png';
import { Phone, Check, ChevronDown, RefreshCw, Smartphone, Monitor, Tablet, Building, Globe, Briefcase, FileText, Download, UserPlus, Info, Plus } from 'lucide-react';

const ForgotPasswordOptions = () => {

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
    // Note: add more here if needed
  } = useAppContext();

  return (
    <>
      <div className="auth-step-merged">
              <div className="login-grid">
                <div className="input-field-group">
                  <label style={{ fontSize: '18px', fontWeight: '700', display: 'block', marginBottom: '8px' }}>Account Recovery</label>
                  <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
                    Select a recovery method to receive a verification code.
                  </p>

                  <div className="recovery-methods-list">
                    {recoveryOptions?.recoveryEmail && (
                      <div className="recovery-option-premium" onClick={() => handleSendOtp('EMAIL')}>
                        <div className="option-icon"><Mail size={20} /></div>
                        <div className="option-info">
                          <span className="option-label">Email</span>
                          <span className="option-value">{recoveryOptions.recoveryEmail}</span>
                        </div>
                        <ChevronRight size={18} className="option-arrow" />
                      </div>
                    )}
                    {recoveryOptions?.phoneNumber && (
                      <div className="recovery-option-premium" onClick={() => handleSendOtp('PHONE')}>
                        <div className="option-icon"><Smartphone size={20} /></div>
                        <div className="option-info">
                          <span className="option-label">Phone</span>
                          <span className="option-value">{recoveryOptions.phoneNumber}</span>
                        </div>
                        <ChevronRight size={18} className="option-arrow" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="auth-footer-merged" style={{ marginTop: '32px', borderTop: 'none', justifyContent: 'center' }}>
                <button className="text-link-btn" onClick={() => setView('forgot-password-identifier')}>Try another way</button>
              </div>
            </div>
    </>
  );
};

export default ForgotPasswordOptions;
