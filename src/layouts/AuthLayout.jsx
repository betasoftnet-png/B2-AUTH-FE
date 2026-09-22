import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { Outlet } from 'react-router-dom';
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
import cliksBusinessLogo from '../assets/cliks-business.png';
import cliksLogo from '../assets/cliks.png';
import bitToolLogo from '../assets/BIT-TOOL-2.png';

const AuthLayout = () => {
  const { view, customAlert,
    AuthenticatorCode, PasswordRequirements, accessToken, accounts, addAuthMode, authenticatorAccounts, businessSignupType, businessTypeData, calculateAge, clientId, dashboardTab, error, expandedExternalSessionId, expandedSessionId, externalSessions, fetchAuthenticatorAccounts, fetchEmails, fetchExternalSessions, fetchFullProfile, fetchRecoveryInfo, fetchSessions, fetchedGstins, fetchingGstins, fetchingSignupGstins, formData, gstData, handleAddAccount, handleAddAuthenticatorAccount, handleBusinessTypeSelect, handleChangePassword, handleCreateAccountClick, handleCreateMailbox, handleDeleteAuthenticatorAccount, handleDisable2FA, handleEnable2FA, handleFetchGstins, handleFileChange, handleFinalSignupSubmit, handleForgotInModal, handleForgotPasswordClick, handleForgotPasswordClickWithEmail, handleForgotPasswordIdentifierSubmit, handleGoToMailSignup, handleInputChange, handleLogin, handleLogout, handleMailFormSubmit, handleMakePrimary, handleOnboardingSubmit, handleProcessQR, handleProfileClick, handleRegisterProfile, handleResetPassword, handleRevokeExternalSession, handleRevokeSession, handleSelectAccount, handleSend2faRecoveryOtp, handleSendMobileOtp, handleSendOtp, handleSendParentOtp, handleSignOutAll, handleSwitchAccount, handleUpdateRecovery, handleVerificationCallback, handleVerify2faRecoveryOtp, handleVerifyAndEnable2FA, handleVerifyGst, handleVerifyLogin2fa, handleVerifyMobileOtp, handleVerifyOtp, handleVerifyPan, handleVerifyParentOtp, isEditingRecovery, language, leaveLegalPage, loading, manualAuthData, mobileOtpStep, normalizeIdentifier, onboardingData, onboardingStep, panData, parentOtpSent, parseUserAgent, passwordForm, primaryBusinessData, primaryBusinessStep, profileData, recoveryInfo, recoveryOptions, redirectUri, registrationMode, resetSignupForm, saveAccount, selectedRecoveryMethod, sessions, setAccessToken, setAccounts, setAddAuthMode, setAuthenticatorAccounts, setBusinessSignupType, setBusinessTypeData, setClientId, setCustomAlert, setDashboardTab, setError, setExpandedExternalSessionId, setExpandedSessionId, setExternalSessions, setFetchedGstins, setFetchingGstins, setFetchingSignupGstins, setFormData, setGstData, setIsEditingRecovery, setLanguage, setLoading, setManualAuthData, setMobileOtpStep, setOnboardingData, setOnboardingStep, setPanData, setParentOtpSent, setPasswordForm, setPrimaryBusinessData, setPrimaryBusinessStep, setProfileData, setRecoveryInfo, setRecoveryOptions, setRedirectUri, setRegistrationMode, setSelectedRecoveryMethod, setSessions, setSettingsData, setSetup2FACode, setSetup2FAData, setShow2faRecovery, setShowAccountSwitcher, setShowAddAuthModal, setShowBusinessTypeModal, setShowChangePasswordModal, setShowGstModal, setShowPanModal, setShowSetup2FAModal, setSidebarCategory, setSignupFetchedGstins, setSignupType, setState, setSuccessMessage, setTempToken, setUseSavedAccount, setUserEmails, setUsernameSuggestions, setVerificationStatus, setVerifyPanResult, setView, setVkycUrl, settingsData, setup2FACode, setup2FAData, show2faRecovery, showAccountSwitcher, showAddAuthModal, showAlert, showBusinessTypeModal, showChangePasswordModal, showGstModal, showLegalPage, showPanModal, showSetup2FAModal, sidebarCategory, signupFetchedGstins, signupType, state, successMessage, tempToken, useSavedAccount, userEmails, usernameSuggestions, validatePassword, verificationStatus, verifyPanResult, vkycUrl, authLogo, cliksBusinessLogo, cliksLogo, bitToolLogo,} = useAppContext();

  // The original component had the header dynamic based on the view, 
  // but it's cleaner to let the Outlet handle the inner auth-card entirely.
  // Wait, let's keep the exact same HTML structure.

  return (
    <div className="google-auth-container">
      <div className="auth-card">
        <Outlet />
      </div>

      <div className="auth-footer">
        <div className="footer-left">English (United States)</div>
      </div>
      
      {customAlert.show && (
        <div className={`custom-toast-alert ${customAlert.type}`}>
          {customAlert.type === 'success' ? (
            <CheckCircle size={20} style={{ color: '#22c55e', flexShrink: 0 }} />
          ) : (
            <AlertCircle size={20} style={{ color: '#ef4444', flexShrink: 0 }} />
          )}
          <span style={{ fontSize: '14px', fontWeight: '600' }}>{customAlert.message}</span>
        </div>
      )}
    </div>
  );
};

export default AuthLayout;
