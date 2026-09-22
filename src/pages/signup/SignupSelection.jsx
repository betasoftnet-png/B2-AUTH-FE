import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import authLogo from '../../assets/auth2.png';
import cliksBusinessLogo from '../../assets/cliks-business.png';
import cliksLogo from '../../assets/cliks.png';
import bitToolLogo from '../../assets/BIT-TOOL-2.png';
import { Phone, Check, ChevronDown, RefreshCw, Smartphone, Monitor, Tablet, Building, Globe, Briefcase, FileText, Download, UserPlus, Info, Plus } from 'lucide-react';

const SignupSelection = () => {

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
      <div className="auth-step selection-view">
              <div className="selection-grid">
                <div className="selection-card-premium" onClick={() => { resetSignupForm(); setSignupType('PERSONAL'); setView('signup-profile'); }}>
                  <div className="selection-icon-circle">
                    <User size={32} />
                  </div>
                  <div className="selection-content">
                    <h3>For myself</h3>
                    <p>Create a personal account to manage your secure emails.</p>
                  </div>
                  <ChevronRight className="arrow-icon" size={20} />
                </div>

                <div className="selection-card-premium" onClick={() => { resetSignupForm(); setSignupType('CHILD'); setView('signup-child'); }}>
                  <div className="selection-icon-circle accent">
                    <User size={32} />
                  </div>
                  <div className="selection-content">
                    <h3>For my child</h3>
                    <p>Manage your child's digital identity with parental controls.</p>
                  </div>
                  <ChevronRight className="arrow-icon" size={20} />
                </div>

                <div className="selection-card-premium" onClick={() => { resetSignupForm(); setSignupType('BUSINESS'); setView('signup-business'); }}>
                  <div className="selection-icon-circle business">
                    <Briefcase size={32} />
                  </div>
                  <div className="selection-content">
                    <h3>For business</h3>
                    <p>Powerful tools to manage your team and business communications.</p>
                  </div>
                  <ChevronRight className="arrow-icon" size={20} />
                </div>
              </div>
              <div className="selection-footer">
                <button className="text-btn" onClick={() => setView('login-email')}>Already have an account? Sign in</button>
              </div>
            </div>
    </>
  );
};

export default SignupSelection;
