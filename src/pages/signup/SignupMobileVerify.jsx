import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import authLogo from '../../assets/auth2.png';
import cliksBusinessLogo from '../../assets/cliks-business.png';
import cliksLogo from '../../assets/cliks.png';
import bitToolLogo from '../../assets/BIT-TOOL-2.png';
import { Phone, Check, ChevronDown, RefreshCw, Smartphone, Monitor, Tablet, Building, Globe, Briefcase, FileText, Download, UserPlus, Info, Plus } from 'lucide-react';

const SignupMobileVerify = () => {

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
              {mobileOtpStep === 'MOBILE' ? (
                <form onSubmit={handleSendMobileOtp}>
                  <div className="auth-input-group" style={{ textAlign: 'left' }}>
                    <label>Mobile Number</label>
                    <PhoneInput
                      country={'in'}
                      value={formData.mobileNumber}
                      onChange={(phone) => setFormData(prev => ({ ...prev, mobileNumber: '+' + phone }))}
                      enableSearch={true}
                      containerStyle={{ width: '100%', marginTop: '8px' }}
                      inputStyle={{
                        width: '100%',
                        padding: '12px 12px 12px 50px',
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '12px',
                        fontSize: '16px',
                        color: 'var(--text-main)',
                        height: '48px'
                      }}
                      buttonStyle={{
                        background: 'transparent',
                        border: 'none',
                        left: '4px'
                      }}
                      dropdownStyle={{
                        background: 'var(--surface)',
                        color: 'var(--text-main)',
                        zIndex: 100
                      }}
                    />
                  </div>
                  <div className="btn-group" style={{ marginTop: '24px' }}>
                    <button type="button" className="text-btn" onClick={() => setView('signup-mail')}>Back</button>
                    <button type="submit" className="primary-btn" disabled={loading}>
                      {loading ? 'Sending...' : 'Send OTP'}
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleVerifyMobileOtp}>
                  <div className="auth-input-group" style={{ textAlign: 'left' }}>
                    <label>Enter the 6-digit OTP</label>
                    <input
                      type="text"
                      value={formData.mobileOtp || ''}
                      onChange={(e) => setFormData({ ...formData, mobileOtp: e.target.value })}
                      required
                      placeholder="123456"
                      style={{ textAlign: 'center', letterSpacing: '0.2em', fontSize: '1.25rem' }}
                    />
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px', textAlign: 'center' }}>
                      Code sent to {formData.mobileNumber}. <button type="button" onClick={() => setMobileOtpStep('MOBILE')} style={{ color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Change number</button>
                    </p>
                  </div>
                  <div className="btn-group" style={{ marginTop: '24px' }}>
                    <button type="button" className="text-btn" onClick={() => setMobileOtpStep('MOBILE')}>Back</button>
                    <button type="submit" className="primary-btn" disabled={loading}>
                      {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                  </div>
                </form>
              )}
            </div>
    </>
  );
};

export default SignupMobileVerify;
