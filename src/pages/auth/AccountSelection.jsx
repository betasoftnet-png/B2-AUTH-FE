import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import authLogo from '../../assets/auth2.png';
import cliksBusinessLogo from '../../assets/cliks-business.png';
import cliksLogo from '../../assets/cliks.png';
import bitToolLogo from '../../assets/BIT-TOOL-2.png';
import { Phone, Check, ChevronDown, RefreshCw, Smartphone, Monitor, Tablet, Building, Globe, Briefcase, FileText, Download, UserPlus, Info, Plus } from 'lucide-react';

const AccountSelection = () => {

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
      <div className="account-switcher-container">
              <header className="switcher-header">
                <h2>Choose an account</h2>
                <p>to continue to {clientId ? clientId.replace(/-/g, ' ') : 'B2Auth'}</p>
              </header>

              <div className="account-list-premium">
                {accounts.map((acc, index) => (
                  <div key={index} className="account-item-card">
                    <div className="account-clickable" onClick={() => handleSelectAccount(acc)}>
                      <div className="account-avatar">
                        {acc.userData.firstName?.[0]}
                      </div>
                      <div className="account-info">
                        <div className="account-name">{acc.userData.firstName} {acc.userData.lastName}</div>
                        <div className="account-email">{acc.userData.email}</div>
                        {accessToken === acc.token && <span className="signed-in-tag">Signed in</span>}
                      </div>
                    </div>
                    <button className="remove-account-btn" title="Remove account" onClick={(e) => {
                      e.stopPropagation();
                      const updated = accounts.filter(a => a.userData.email !== acc.userData.email);
                      setAccounts(updated);
                      localStorage.setItem('bnx_accounts', JSON.stringify(updated));
                    }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}

                <button
                  className="add-account-action"
                  onClick={() => {
                    localStorage.removeItem('bnx_accessToken');
                    localStorage.removeItem('bnx_userData');
                    setAccessToken(null);
                    setFormData(prev => ({ ...prev, identifier: '', password: '' }));
                    setUseSavedAccount(false);
                    setError('');
                    setView('login-email');
                  }}
                >
                  <div className="add-icon-circle"><Plus size={18} /></div>
                  <span>Use another account</span>
                </button>
              </div>

              {(!clientId) && (
                <button className="back-to-dash-btn" onClick={() => setView('dashboard')}>
                  Back to Dashboard
                </button>
              )}
            </div>
    </>
  );
};

export default AccountSelection;
