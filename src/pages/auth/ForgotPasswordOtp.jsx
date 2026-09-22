import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import authLogo from '../../assets/auth2.png';
import cliksBusinessLogo from '../../assets/cliks-business.png';
import cliksLogo from '../../assets/cliks.png';
import bitToolLogo from '../../assets/BIT-TOOL-2.png';
import { Phone, Check, ChevronDown, RefreshCw, Smartphone, Monitor, Tablet, Building, Globe, Briefcase, FileText, Download, UserPlus, Info, Plus } from 'lucide-react';

const ForgotPasswordOtp = () => {

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
      <form onSubmit={handleVerifyOtp} className="auth-step-merged">
              <div className="login-grid">
                <div className="input-field-group">
                  <label style={{ fontSize: '18px', fontWeight: '700', display: 'block', marginBottom: '8px' }}>Enter Code</label>
                  <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
                    A verification code was sent to your recovery method. Enter it below to continue.
                  </p>
                  <div className="auth-input-group" style={{ textAlign: 'left' }}>
                    <input
                      type="text"
                      name="otp"
                      placeholder="123456"
                      value={formData.otp}
                      onChange={handleInputChange}
                      required
                      autoFocus
                      maxLength="6"
                      style={{ textAlign: 'center', letterSpacing: '0.2em', fontSize: '1.25rem' }}
                    />
                  </div>
                </div>
              </div>
              <div className="button-group-right" style={{ marginTop: '32px' }}>
                <button type="submit" className="primary-btn" disabled={loading}>
                  {loading ? 'Verifying...' : 'Next'}
                </button>
              </div>
            </form>
    </>
  );
};

export default ForgotPasswordOtp;
