import React from 'react';
import { useAppContext } from '../../context/AppContext';
import authLogo from '../../assets/auth2.png';
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

const legalDocuments = {
  terms: {
    eyebrow: 'Terms and Conditions',
    title: 'Terms and Conditions for b2auth',
    updated: 'Last Updated: May 2026',
    entity: 'Beta Softnet (OPC) Private Limited ("BETA")',
    sections: [
      {
        title: '1. Scope of Service',
        paragraphs: [
          'b2auth is a security authentication product of Beta Softnet (OPC) Pvt Ltd. By using b2auth, you agree to these terms. b2auth provides Multi-Factor Authentication (MFA), secure login protocols, and identity verification for the BETA ecosystem, including BNXMail, Cliks, Cliks Business, and integrated third-party services.'
        ]
      },
      {
        title: '2. User Responsibility & Account Security',
        items: [
          { label: 'Identity Linkage', text: 'Your b2auth profile is linked to your accounts.beta-softnet.com ID. You are responsible for maintaining the confidentiality of your master credentials.' },
          { label: 'Device Security', text: 'You must ensure that the mobile device running b2auth is secure. BETA is not liable for unauthorized access resulting from a lost, stolen, or compromised device.' },
          { label: 'True Identity', text: 'You agree to provide accurate information during the KYC/Verification process required for the BETA ecosystem.' }
        ]
      },
      {
        title: '3. Data Privacy & Compliance',
        items: [
          { label: 'Consent', text: 'By using b2auth, you grant BETA the right to process biometric data, if enabled, and device metadata solely for authentication purposes.' },
          { label: 'No Third-Party Sharing', text: 'BETA will never sell your authentication logs or identity data to third-party advertisers.' },
          { label: 'Data Erasure', text: 'Users can request account deletion via accounts.beta-softnet.com, which will revoke all b2auth permissions.' }
        ]
      },
      {
        title: '4. Intellectual Property',
        paragraphs: [
          'The "b2auth" name, logo, and proprietary authentication algorithms are the exclusive property of Beta Softnet (OPC) Pvt Ltd. Any attempt to reverse-engineer the b2auth protocol is strictly prohibited and may lead to legal action.'
        ]
      },
      {
        title: '5. Limitation of Liability',
        paragraphs: [
          'While b2auth employs high-level encryption, BETA does not guarantee that the service will be 100% error-free or immune to sophisticated cyber-attacks. BETA shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use the app.',
          'When a user accepts the Terms and Conditions on b2auth, that acceptance may be reflected across BNXMail and Cliks via the accounts.beta-softnet.com database as centralized consent.',
          'In case of a security breach, BETA reserves the right to temporarily freeze the linked Cliks Wallet to protect user funds.'
        ]
      }
    ]
  },
  privacy: {
    eyebrow: 'Privacy Policy',
    title: 'Privacy Policy: b2auth',
    updated: 'Effective Date: May 15, 2026',
    entity: 'Beta Softnet (OPC) Private Limited ("BETA")',
    sections: [
      {
        title: '1. Introduction',
        paragraphs: [
          'At BETA, we believe security is a fundamental right. This Privacy Policy explains how b2auth collects, protects, and manages your information to provide secure authentication across the BETA ecosystem.'
        ]
      },
      {
        title: '2. Information We Collect',
        paragraphs: ['We only collect data that is essential for verifying your identity:'],
        items: [
          { label: 'Identity Data', text: 'Your name, email, and phone number linked to your account.beta-softnet.com profile.' },
          { label: 'Device Metadata', text: 'Unique device ID (UUID), OS version, and IP address to support Trusted Device binding.' },
          { label: 'Biometric Data', text: 'b2auth uses your device native Fingerprint or FaceID. BETA does not store your actual biometric patterns on our servers; we only receive a Success/Fail token from your device secure enclave.' },
          { label: 'Authentication Logs', text: 'Timestamps of successful and failed login attempts to detect and prevent hacking.' }
        ]
      },
      {
        title: '3. How We Use Your Data',
        items: [
          { text: 'To verify your identity during logins.' },
          { text: 'To send Critical Security Alerts if a login is attempted from an unrecognized location.' },
          { text: 'To prevent fraudulent access to your Cliks Wallet and BNXMail accounts.' }
        ]
      },
      {
        title: '4. Data Sharing & Third Parties',
        items: [
          { label: 'Zero Third-Party Sharing', text: 'We never sell, rent, or trade your personal data to advertisers or third-party data brokers.' },
          { label: 'Ecosystem Integration', text: 'Your data is shared internally with account.beta-softnet.com to provide a Single Sign-On (SSO) experience across all BETA products.' }
        ]
      },
      {
        title: '5. User Rights (Compliance)',
        items: [
          { label: 'Right to Access', text: 'You can view all data we hold about you at account.beta-softnet.com.' },
          { label: 'Right to Erase', text: 'You can request the deletion of your b2auth profile. Note: This will revoke access to all linked BETA services for security reasons.' },
          { label: 'Grievance Officer', text: 'As per Indian law, for any data concerns, contact our Grievance Officer at legal@beta-softnet.com.' }
        ]
      }
    ]
  }
};


const LegalPage = ({ documentKey, onBack, onShowDocument }) => {
  const document = legalDocuments[documentKey];

  return (
    <div className="legal-page-shell">
      <header className="legal-topbar">
        <button className="legal-brand" onClick={onBack}>
          <img src={authLogo} alt="B2Auth" />
          <span>B2Auth</span>
        </button>
        <div className="legal-nav-actions">
          <button
            className={`legal-nav-link ${documentKey === 'privacy' ? 'active' : ''}`}
            onClick={() => onShowDocument('privacy')}
          >
            Privacy Policy
          </button>
          <button
            className={`legal-nav-link ${documentKey === 'terms' ? 'active' : ''}`}
            onClick={() => onShowDocument('terms')}
          >
            Terms
          </button>
        </div>
      </header>

      <main className="legal-document-wrap">
        <section className="legal-hero">
          <div className="legal-eyebrow">{document.eyebrow}</div>
          <h1>{document.title}</h1>
          <p>{document.updated}</p>
          <p>{document.entity}</p>
        </section>

        <article className="legal-document">
          {document.sections.map((section) => (
            <section className="legal-section" key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.items && (
                <ul>
                  {section.items.map((item, index) => (
                    <li key={`${section.title}-${index}`}>
                      {item.label && <strong>{item.label}: </strong>}
                      {item.text}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>
      </main>
    </div>
  );
};


const LegalPrivacy = () => {
  const { view, leaveLegalPage, showLegalPage,
    AuthenticatorCode, PasswordRequirements, accessToken, accounts, addAuthMode, authenticatorAccounts, businessSignupType, businessTypeData, calculateAge, clientId, customAlert, dashboardTab, error, expandedExternalSessionId, expandedSessionId, externalSessions, fetchAuthenticatorAccounts, fetchEmails, fetchExternalSessions, fetchFullProfile, fetchRecoveryInfo, fetchSessions, fetchedGstins, fetchingGstins, fetchingSignupGstins, formData, gstData, handleAddAccount, handleAddAuthenticatorAccount, handleBusinessTypeSelect, handleChangePassword, handleCreateAccountClick, handleCreateMailbox, handleDeleteAuthenticatorAccount, handleDisable2FA, handleEnable2FA, handleFetchGstins, handleFileChange, handleFinalSignupSubmit, handleForgotInModal, handleForgotPasswordClick, handleForgotPasswordClickWithEmail, handleForgotPasswordIdentifierSubmit, handleGoToMailSignup, handleInputChange, handleLogin, handleLogout, handleMailFormSubmit, handleMakePrimary, handleOnboardingSubmit, handleProcessQR, handleProfileClick, handleRegisterProfile, handleResetPassword, handleRevokeExternalSession, handleRevokeSession, handleSelectAccount, handleSend2faRecoveryOtp, handleSendMobileOtp, handleSendOtp, handleSendParentOtp, handleSignOutAll, handleSwitchAccount, handleUpdateRecovery, handleVerificationCallback, handleVerify2faRecoveryOtp, handleVerifyAndEnable2FA, handleVerifyGst, handleVerifyLogin2fa, handleVerifyMobileOtp, handleVerifyOtp, handleVerifyPan, handleVerifyParentOtp, isEditingRecovery, language, loading, manualAuthData, mobileOtpStep, normalizeIdentifier, onboardingData, onboardingStep, panData, parentOtpSent, parseUserAgent, passwordForm, primaryBusinessData, primaryBusinessStep, profileData, recoveryInfo, recoveryOptions, redirectUri, registrationMode, resetSignupForm, saveAccount, selectedRecoveryMethod, sessions, setAccessToken, setAccounts, setAddAuthMode, setAuthenticatorAccounts, setBusinessSignupType, setBusinessTypeData, setClientId, setCustomAlert, setDashboardTab, setError, setExpandedExternalSessionId, setExpandedSessionId, setExternalSessions, setFetchedGstins, setFetchingGstins, setFetchingSignupGstins, setFormData, setGstData, setIsEditingRecovery, setLanguage, setLoading, setManualAuthData, setMobileOtpStep, setOnboardingData, setOnboardingStep, setPanData, setParentOtpSent, setPasswordForm, setPrimaryBusinessData, setPrimaryBusinessStep, setProfileData, setRecoveryInfo, setRecoveryOptions, setRedirectUri, setRegistrationMode, setSelectedRecoveryMethod, setSessions, setSettingsData, setSetup2FACode, setSetup2FAData, setShow2faRecovery, setShowAccountSwitcher, setShowAddAuthModal, setShowBusinessTypeModal, setShowChangePasswordModal, setShowGstModal, setShowPanModal, setShowSetup2FAModal, setSidebarCategory, setSignupFetchedGstins, setSignupType, setState, setSuccessMessage, setTempToken, setUseSavedAccount, setUserEmails, setUsernameSuggestions, setVerificationStatus, setVerifyPanResult, setView, setVkycUrl, settingsData, setup2FACode, setup2FAData, show2faRecovery, showAccountSwitcher, showAddAuthModal, showAlert, showBusinessTypeModal, showChangePasswordModal, showGstModal, showPanModal, showSetup2FAModal, sidebarCategory, signupFetchedGstins, signupType, state, successMessage, tempToken, useSavedAccount, userEmails, usernameSuggestions, validatePassword, verificationStatus, verifyPanResult, vkycUrl, authLogo, cliksBusinessLogo, cliksLogo, bitToolLogo,} = useAppContext();
  
  return (
    <LegalPage
      documentKey={view === 'legal-privacy' ? 'privacy' : 'terms'}
      onBack={leaveLegalPage}
      onShowDocument={showLegalPage}
    />
  );
};

export default LegalPrivacy;
