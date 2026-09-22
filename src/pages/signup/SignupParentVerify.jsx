import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import authLogo from '../../assets/auth2.png';
import cliksBusinessLogo from '../../assets/cliks-business.png';
import cliksLogo from '../../assets/cliks.png';
import bitToolLogo from '../../assets/BIT-TOOL-2.png';
import { Phone, Check, ChevronDown, RefreshCw, Smartphone, Monitor, Tablet, Building, Globe, Briefcase, FileText, Download, UserPlus, Info, Plus } from 'lucide-react';

const SignupParentVerify = () => {

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
      <form onSubmit={parentOtpSent ? handleVerifyParentOtp : handleSendParentOtp} className="auth-step">
              <div className="signup-inputs-container">
                <p style={{ fontSize: '14px', color: '#475569', marginBottom: '24px' }}>
                  Please verify your parent's contact details. We'll send a verification code to their email.
                </p>

                <div className="input-group">
                  <input 
                    type="text" 
                    name="parentName" 
                    value={formData.parentName} 
                    onChange={handleInputChange} 
                    required 
                    disabled={parentOtpSent}
                    placeholder=" " 
                  />
                  <label>Parent Name</label>
                </div>

                <div className="input-group">
                  <input 
                    type="email" 
                    name="parentEmail" 
                    value={formData.parentEmail} 
                    onChange={handleInputChange} 
                    required 
                    disabled={parentOtpSent}
                    placeholder=" " 
                  />
                  <label>Parent Email Address</label>
                </div>

                <div className="input-group">
                  <input 
                    type="text" 
                    name="parentPhone" 
                    value={formData.parentPhone} 
                    onChange={handleInputChange} 
                    required 
                    disabled={parentOtpSent}
                    placeholder=" " 
                  />
                  <label>Parent Phone Number</label>
                </div>

                {parentOtpSent && (
                  <div className="input-group animate-fade-in" style={{ marginTop: '20px' }}>
                    <input 
                      type="text" 
                      name="parentOtp" 
                      value={formData.parentOtp} 
                      onChange={handleInputChange} 
                      required 
                      placeholder=" " 
                    />
                    <label>Verification Code (OTP)</label>
                  </div>
                )}
              </div>

              <div className="auth-actions">
                <button 
                  type="button" 
                  className="text-btn" 
                  onClick={() => {
                    if (parentOtpSent) {
                      setParentOtpSent(false);
                    } else {
                      setView('signup-child');
                    }
                  }}
                >
                  {parentOtpSent ? 'Change details' : 'Back'}
                </button>
                <button type="submit" className="primary-btn" disabled={loading}>
                  {loading ? 'Verifying...' : (parentOtpSent ? 'Verify & Continue' : 'Send Verification Code')}
                </button>
              </div>
            </form>
    </>
  );
};

export default SignupParentVerify;
