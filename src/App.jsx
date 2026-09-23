import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PhoneInputLib from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
const PhoneInput = PhoneInputLib.default || PhoneInputLib;
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
import { motion, AnimatePresence } from 'framer-motion';
import betaLogo from './assets/beta2.png';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import EmailsTab from './pages/dashboard/EmailsTab';
import SecurityTab from './pages/dashboard/SecurityTab';
import SettingsTab from './pages/dashboard/SettingsTab';
import ActivityTab from './pages/dashboard/ActivityTab';
import AuthLayout from './layouts/AuthLayout';
import AccountSelection from './pages/auth/AccountSelection';
import LoginView from './pages/auth/LoginView';
import Login2FA from './pages/auth/Login2FA';
import ForgotPasswordIdentifier from './pages/auth/ForgotPasswordIdentifier';
import ForgotPasswordOptions from './pages/auth/ForgotPasswordOptions';
import ForgotPasswordOtp from './pages/auth/ForgotPasswordOtp';
import ForgotPasswordReset from './pages/auth/ForgotPasswordReset';
import Verifying from './pages/auth/Verifying';
import LegalPrivacy from './pages/auth/LegalPrivacy';

import SignupSelection from './pages/signup/SignupSelection';
import SignupProfile from './pages/signup/SignupProfile';
import SignupBusiness from './pages/signup/SignupBusiness';
import SignupBusinessOnboarding from './pages/signup/SignupBusinessOnboarding';
import SignupChild from './pages/signup/SignupChild';
import SignupParentVerify from './pages/signup/SignupParentVerify';
import SignupMail from './pages/signup/SignupMail';
import SignupMobileVerify from './pages/signup/SignupMobileVerify';
import SignupPasswordSetup from './pages/signup/SignupPasswordSetup';

import { AppContext } from './context/AppContext';

import authLogo from './assets/auth2.png';
import cliksBusinessLogo from './assets/cliks-business.png';
import cliksLogo from './assets/cliks.png';
import bitToolLogo from './assets/BIT-TOOL-2.png';
import * as OTPAuth from 'otpauth';
import { QRCodeSVG } from 'qrcode.react';
import { Html5QrcodeScanner } from "html5-qrcode";
import './App.css';

const AuthenticatorCode = ({ secret }) => {
  const [setCode] = useState('000000');
  const [setTimeLeft] = useState(30);

  useEffect(() => {
    try {
      const totp = new OTPAuth.TOTP({
        issuer: "BNX",
        label: "Account",
        algorithm: "SHA1",
        digits: 6,
        period: 30,
        secret: OTPAuth.Secret.fromBase32(secret),
      });

      const update = () => {
        setCode(totp.generate());
        setTimeLeft(30 - (Math.floor(Date.now() / 1000) % 30));
      };

      update();
      const timer = setInterval(1000);
      return () => clearInterval(timer);
    } catch (e) {
      console.error("Invalid secret", e);
    }
  }, [secret]);

  return (
    <div className="auth-code-box">
      <span className="auth-code">{code.slice(0, 3)} {code.slice(3)}</span>
      <div className="auth-timer-container">
        <div className="auth-timer-bar" style={{ width: `${(timeLeft / 30) * 100}%`, backgroundColor: timeLeft < 5 ? '#ef4444' : '#4f46e5' }}></div>
      </div>
    </div>
  );
};

const API_BASE = import.meta.env.VITE_API_BASE;


const getInitialView = () => {
  if (window.location.pathname === '/privacy-policy') return 'legal-privacy';
  if (window.location.pathname === '/terms-and-conditions') return 'legal-terms';
  
  const params = new URLSearchParams(window.location.search);
  const refId = params.get('reference_id') || params.get('verification_id');
  const cid = params.get('client_id');
  
  const storedToken = localStorage.getItem('bnx_accessToken');
  const storedUser = localStorage.getItem('bnx_userData');
  
  if (storedToken && storedUser && !refId && !cid) return 'restoring';
  
  return 'login-email';
};

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [view, setView] = useState(getInitialView); // login-email, login-password, signup-selection, signup-profile, signup-child, signup-business, signup-mail, dashboard, verifying, signup-vkyc
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verifyPanResult, setVerifyPanResult] = useState('');
  
  // States for Business Signup GSTIN Fetch
  const [signupFetchedGstins, setSignupFetchedGstins] = useState([]);
  const [fetchingSignupGstins, setFetchingSignupGstins] = useState(false);
  const [vkycUrl, setVkycUrl] = useState('');

  // OAuth Context
  const [clientId, setClientId] = useState('');
  const [redirectUri, setRedirectUri] = useState('');
  const [state, setState] = useState('');
  const [registrationMode, setRegistrationMode] = useState(''); // business, child, public
  const [businessSignupType, setBusinessSignupType] = useState('secondary'); // primary, secondary
  const [primaryBusinessStep, setPrimaryBusinessStep] = useState(0);
  const [primaryBusinessData, setPrimaryBusinessData] = useState({ size: 'small', cin: '', pan: '', gstin: '', industry: '' });

  // Form Data
  const [formData, setFormData] = useState({
    identifier: localStorage.getItem('bnx_last_identifier') || '', password: '', username: '', firstName: '', lastName: '',
    emailName: '', otp: '', newPassword: '', confirmPassword: '',
    businessName: '', businessType: '', registrationNumber: '',
    ownerFirstName: '', ownerLastName: '', domain: '', dob: '',
    parentName: '', parentEmail: '', parentPhone: '', parentOtp: '',
    mobileNumber: '', mobileOtp: ''
  });

  const [mobileOtpStep, setMobileOtpStep] = useState('MOBILE');
  const [tempToken, setTempToken] = useState('');
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem('bnx_accessToken') || '');
  const [userEmails, setUserEmails] = useState([]);
  const [recoveryOptions, setRecoveryOptions] = useState(null);
  const [selectedRecoveryMethod, setSelectedRecoveryMethod] = useState('');
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [expandedSessionId, setExpandedSessionId] = useState(null);
  const [externalSessions, setExternalSessions] = useState([]);
  const [expandedExternalSessionId, setExpandedExternalSessionId] = useState(null);
  const [accounts, setAccounts] = useState(() => JSON.parse(localStorage.getItem('bnx_accounts') || '[]'));
  const [showAccountSwitcher, setShowAccountSwitcher] = useState(false);
  const [useSavedAccount, setUseSavedAccount] = useState(!!localStorage.getItem('bnx_last_identifier'));
  const [dashboardTab, setDashboardTab] = useState('emails'); // emails, sessions, settings, activity
  const [show2faRecovery, setShow2faRecovery] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [language, setLanguage] = useState('English (US)');
  const [recoveryInfo, setRecoveryInfo] = useState({ recoveryEmail: '', phoneNumber: '' });
  const [isEditingRecovery, setIsEditingRecovery] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [settingsData, setSettingsData] = useState(null);
  const [authenticatorAccounts, setAuthenticatorAccounts] = useState([]);
  const [showAddAuthModal, setShowAddAuthModal] = useState(false);
  const [addAuthMode, setAddAuthMode] = useState('scan'); // 'scan' or 'manual'
  const [manualAuthData, setManualAuthData] = useState({ name: '', secret: '' });
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [usernameSuggestions, setUsernameSuggestions] = useState([]);
  const [signupType, setSignupType] = useState('PERSONAL');
  const [parentOtpSent, setParentOtpSent] = useState(false);
  const [onboardingData, setOnboardingData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    recoveryEmail: '',
    phone: '',
    dob: '',
    gender: '',
    businessType: 'Private Limited',
    industry: '',
    companySize: '',
    businessWebsite: '',
    businessAddress: '',
    profilePhoto: null,
    timeZone: 'UTC',
    language: 'English (US)',
    companyLogo: null,
    acceptTerms: false
  });
  const [sidebarCategory, setSidebarCategory] = useState('ALL');
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [showSetup2FAModal, setShowSetup2FAModal] = useState(false);
  const [setup2FAData, setSetup2FAData] = useState({ secret: '', qrCodeUrl: '' });
  const [setup2FACode, setSetup2FACode] = useState('');
  const [customAlert, setCustomAlert] = useState({ show: false, message: '', type: 'success' });
  const [showPanModal, setShowPanModal] = useState(false);
  const [showBusinessTypeModal, setShowBusinessTypeModal] = useState(false);
  const [showGstModal, setShowGstModal] = useState(false);
  const [businessTypeData, setBusinessTypeData] = useState({ emailId: null });
  const [gstData, setGstData] = useState({ gstin: '', emailId: null });
  const [panData, setPanData] = useState({ panNumber: '', panName: '', gstin: '', emailId: null });
  const [fetchedGstins, setFetchedGstins] = useState([]);
  const [fetchingGstins, setFetchingGstins] = useState(false);
  const topbarRightRef = useRef(null);
  const signupSubmitRef = useRef(false);

  const showAlert = (message, type = 'success') => {
    setCustomAlert({ show: true, message, type });
    setTimeout(() => {
      setCustomAlert(prev => {
        if (prev.message === message) {
          return { show: false, message: '', type: 'success' };
        }
        return prev;
      });
    }, 3500);
  };

  const showLegalPage = (documentKey) => {
    const path = documentKey === 'privacy' ? '/privacy-policy' : '/terms-and-conditions';
    window.history.pushState({}, '', path);
    setError('');
    setView(`legal-${documentKey}`);
  };

  const leaveLegalPage = () => {
    window.history.pushState({}, '', '/');
    setView(accessToken || localStorage.getItem('bnx_accessToken') ? 'dashboard' : 'login-email');
  };

  useEffect(() => {
    if (view === 'signup-vkyc' && vkycUrl && window.CFVKYC) {
      try {
        const vkyc = window.CFVKYC({
          srcUrl: vkycUrl,
          callback: (response) => {
            console.log("VKYC Response:", response);
            if (response.status === 'SUCCESS') {
              setFormData(prev => ({ ...prev, username: '', emailName: '', verificationId: response.verificationId }));
              vkyc.closeSDK();
              setView('signup-mail');
            } else if (response.status === 'CLOSE') {
              // User closed the SDK manually, go back to business form
              setView('signup-business');
            }
          },
        });
      } catch (err) {
        console.error("VKYC Init error", err);
      }
    }
  }, [view, vkycUrl]);

  useEffect(() => {
    if (!showAccountSwitcher) return;

    const handleOutsideClick = (event) => {
      if (topbarRightRef.current && !topbarRightRef.current.contains(event.target)) {
        setShowAccountSwitcher(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [showAccountSwitcher]);

  const handleLogout = () => {
    localStorage.removeItem('bnx_accessToken');
    localStorage.removeItem('bnx_userData');
    setAccessToken('');
    setUserEmails([]);
    setSessions([]);
    setExternalSessions([]);
    setFormData({
      identifier: localStorage.getItem('bnx_last_identifier') || '', password: '', username: '', firstName: '', lastName: '',
      emailName: '', otp: '', newPassword: '', confirmPassword: '',
      businessName: '', businessType: '', registrationNumber: '',
      ownerFirstName: '', ownerLastName: '', domain: '', dob: '',
    });
    setUseSavedAccount(!!localStorage.getItem('bnx_last_identifier'));
    setOnboardingStep(1);
    setView('login-email');
  };

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          console.warn("Session expired or unauthorized (401). Logging out...");
          handleLogout();
        }
        return Promise.reject(error);
      }
    );
    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  const saveAccount = (token, userData) => {
    const storedAccounts = JSON.parse(localStorage.getItem('bnx_accounts') || '[]');
    // Avoid duplicates by email/username
    const filteredAccounts = storedAccounts.filter(acc => acc.userData.email !== userData.email);
    // Use accountType and isPrimary from backend response
    const updatedAccounts = [{
      token,
      userData: {
        ...userData,
        accountType: userData.accountType, // Will be BUSINESS, PUBLIC, or CHILD
        isPrimary: userData.isPrimary || false
      }
    }, ...filteredAccounts];
    localStorage.setItem('bnx_accounts', JSON.stringify(updatedAccounts));
    localStorage.setItem('bnx_accessToken', token);
    localStorage.setItem('bnx_userData', JSON.stringify(userData));
    setAccounts(updatedAccounts);
  };

  const handleVerificationCallback = async (refId) => {
    setView('verifying');
    setLoading(true);
    let attempts = 0;
    const maxAttempts = 10;

    const poll = async () => {
      console.log("Polling for verification status...", refId);
      try {
        const res = await axios.get(`${API_BASE}/verification/status/${refId}`);
        if (res.data.success) {
          const status = res.data.data.status;
          setVerificationStatus(status);

          const upperStatus = status ? status.toUpperCase() : "";
          if (upperStatus === 'SUCCESS' || upperStatus === 'AUTHENTICATED' || upperStatus === 'VERIFIED') {
            setTimeout(() => {
              window.location.href = window.location.origin;
            }, 3000);
            setLoading(false);
          } else if (upperStatus === 'PENDING' && attempts < maxAttempts) {
            attempts++;
            setTimeout(3000);
          } else {
            setLoading(false);
            if (upperStatus !== 'PENDING') {
              setError(`Verification failed: ${status}`);
            } else {
              setError('Verification timed out. Please refresh the page to check again.');
            }
          }
        }
      } catch (err) {
        console.error("Poll error:", err);
        setError('Verification check failed');
        setLoading(false);
      }
    };
    poll();
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refId = params.get('reference_id') || params.get('verification_id');
    const cid = params.get('client_id');
    const ruri = params.get('redirect_uri');

    if (window.location.pathname === '/privacy-policy' || window.location.pathname === '/terms-and-conditions') {
      return;
    }

    // MANUAL ROUTE DETECTION: Check if we are on /verification-complete
    if (window.location.pathname === '/verification-complete' || refId) {
      if (refId) {
        handleVerificationCallback(refId);
        return;
      }
    }

    setClientId(cid || '');
    setRedirectUri(ruri || '');
    setState(params.get('state') || '');
    setRegistrationMode(params.get('mode') || '');

    // Session Restoration Logic
    const storedToken = localStorage.getItem('bnx_accessToken');
    const storedUser = localStorage.getItem('bnx_userData');
    const storedAccounts = JSON.parse(localStorage.getItem('bnx_accounts') || '[]');
    setAccounts(storedAccounts);

    // 1. If it's an OAuth flow (cid present) and we have accounts, show selection
    if (cid && storedAccounts.length > 0) {
      setView('account-selection');
      return;
    }

    // 2. Regular Session Restoration
    if (storedToken && storedUser && !refId && !cid) {
      const validateAndRestore = async () => {
        setView('restoring');
        try {
          const userData = JSON.parse(storedUser);

          // Use fetchEmails & profile as a validation call
          const [res, meRes] = await Promise.all([
            axios.get(`${API_BASE}/emails/list`, { headers: { Authorization: `Bearer ${storedToken}` } }),
            axios.get(`${API_BASE}/users/me`, { headers: { Authorization: `Bearer ${storedToken}` } })
          ]);

          if (res.data.success && meRes.data.success) {
            setAccessToken(storedToken);
            setUserEmails(res.data.data.emails);
            const profile = meRes.data.data;
            setProfileData(profile);
            setFormData(prev => ({
              ...prev,
              identifier: profile.email || profile.username || '',
              firstName: profile.firstName || '',
              lastName: profile.lastName || ''
            }));
            // fetch others in parallel
            fetchSessions(storedToken);
            fetchExternalSessions(storedToken);
            fetchRecoveryInfo(storedToken);
            
            if (profile.accountType === 'BUSINESS' && !profile.onboarded) {
              setView('signup-business-onboarding');
            } else {
              setView('dashboard');
              if (location.pathname === '/') {
                navigate('/dashboard');
              }
            }
          } else {
            handleLogout();
          }
        } catch (err) {
          console.error("Session restoration failed", err);
          handleLogout();
        }
      };
      validateAndRestore();
    }
  }, []);

  const resetSignupForm = () => {
    setFormData(prev => ({
      ...prev,
      firstName: '',
      lastName: '',
      dob: '',
      username: '',
      emailName: '',
      parentName: '',
      parentEmail: '',
      parentPhone: '',
      parentOtp: '',
      password: '',
      confirmPassword: '',
      businessName: '',
      registrationNumber: ''
    }));
    setError('');
    setParentOtpSent(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      const isBusiness = signupType === 'BUSINESS';
      const hasBasicInfo = formData.firstName?.trim().length >= 2 && formData.lastName?.trim();
      const hasDobOrIsBusiness = formData.dob || isBusiness;

      if (hasBasicInfo && hasDobOrIsBusiness) {
        try {
          const res = await axios.get(`${API_BASE}/auth/username-suggestions`, {
            params: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              dob: formData.dob || '2000-01-01',
              mode: signupType
            }
          });
          if (res.data.success) {
            setUsernameSuggestions(res.data.data);
          }
        } catch (err) {
          console.error("Failed to fetch username suggestions", err);
        }
      } else {
        setUsernameSuggestions([]);
      }
    };

    const timer = setTimeout(fetchSuggestions, 500);
    return () => clearTimeout(timer);
  }, [formData.firstName, formData.lastName, formData.dob, signupType]);

  // API CALLS
  const fetchEmails = async (token) => {
    try {
      const res = await axios.get(`${API_BASE}/emails/list`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setUserEmails(res.data.data.emails);
      }
    } catch (err) {
      console.error("Failed to fetch emails", err);
    }
  };

  const fetchSessions = async (token) => {
    try {
      const res = await axios.get(`${API_BASE}/auth/sessions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setSessions(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch sessions", err);
    }
  };

  const fetchExternalSessions = async (token) => {
    try {
      const res = await axios.get(`${API_BASE}/auth/sessions/external`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setExternalSessions(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch external sessions", err);
    }
  };

  const handleRevokeSession = async (sessionId) => {
    setLoading(true);
    try {
      const res = await axios.delete(`${API_BASE}/auth/sessions/${sessionId}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (res.data.success) {
        fetchSessions(accessToken);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to revoke session');
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeExternalSession = async (sessionId) => {
    if (!window.confirm("Are you sure you want to remove access for this application?")) {
      return;
    }
    setLoading(true);
    try {
      const res = await axios.delete(`${API_BASE}/auth/sessions/external/${sessionId}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (res.data.success) {
        fetchExternalSessions(accessToken);
        showAlert("Application access revoked successfully");
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to revoke application access');
    } finally {
      setLoading(false);
    }
  };

  const handleMakePrimary = async (emailId) => {
    if (profileData?.accountType === 'PUBLIC' || profileData?.accountType === 'PERSONAL') {
      setLoading(true);
      try {
        const res = await axios.post(
          `${API_BASE}/verification/initiate/${emailId}`,
          {},
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        if (res.data.success && res.data.data.redirectUrl) {
          window.location.href = res.data.data.redirectUrl;
        } else {
          setError(res.data.message || 'Verification redirect failed');
          setLoading(false);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to initiate verification');
        setLoading(false);
      }
    } else {
      setBusinessTypeData({ emailId });
      setError('');
      setShowBusinessTypeModal(true);
    }
  };

  const handleFetchGstins = async () => {
    if (panData.panNumber.length !== 10) return;
    setFetchingGstins(true);
    setError('');
    try {
      const response = await axios.get(`${API_BASE}/verification/fetch-gstins?pan=${panData.panNumber}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      
      const data = response.data;
      if (data.success && data.data && data.data.length > 0) {
        setFetchedGstins(data.data);
        if (data.data.length === 1) {
          setPanData({ ...panData, gstin: data.data[0].gstin });
        }
      } else {
        setError(data.message || 'No active GSTINs found for this PAN.');
        setFetchedGstins([]);
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Unknown error';
      setError(errMsg);
      setFetchedGstins([]);
    } finally {
      setFetchingGstins(false);
    }
  };

  const handleVerifyPan = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${API_BASE}/verification/verify-pan/${panData.emailId}`,
        { pan: panData.panNumber, name: panData.panName, gstin: panData.gstin },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (res.data.success) {
        setShowPanModal(false);
        showAlert("PAN verified successfully. Email is now primary.");
        fetchEmails(accessToken);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to verify PAN');
    } finally {
      setLoading(false);
    }
  };

  const handleBusinessTypeSelect = (type) => {
    setShowBusinessTypeModal(false);
    if (type === 'Sole Proprietorship') {
      setGstData({ gstin: '', emailId: businessTypeData.emailId });
      setShowGstModal(true);
    } else {
      setPanData({ panNumber: '', panName: '', gstin: '', emailId: businessTypeData.emailId });
      setFetchedGstins([]);
      setShowPanModal(true);
    }
  };

  const handleVerifyGst = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${API_BASE}/verification/verify-gst/${gstData.emailId}`,
        { gstin: gstData.gstin },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (res.data.success) {
        setShowGstModal(false);
        showAlert("GSTIN verified successfully. Email is now primary.");
        fetchEmails(accessToken);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to verify GSTIN');
    } finally {
      setLoading(false);
    }
  };


  const fetchRecoveryInfo = async (token) => {
    try {
      const res = await axios.get(`${API_BASE}/users/recovery`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setRecoveryInfo(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch recovery info", err);
    }
  };

  const fetchAuthenticatorAccounts = async (token) => {
    try {
      const res = await axios.get(`${API_BASE}/users/2fa/accounts`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setAuthenticatorAccounts(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch authenticator accounts", err);
    }
  };

  const handleDeleteAuthenticatorAccount = async (id) => {
    if (!window.confirm("Are you sure you want to delete this authenticator account?")) {
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await axios.delete(`${API_BASE}/users/2fa/accounts/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (res.data.success) {
        fetchAuthenticatorAccounts(accessToken);
        showAlert("Authenticator account deleted successfully");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete authenticator account");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let scanner = null;
    if (showAddAuthModal && addAuthMode === 'scan') {
      // Small timeout to ensure DOM element #reader is mounted
      const timer = setTimeout(() => {
        const readerElement = document.getElementById("reader");
        if (!readerElement) return;

        scanner = new Html5QrcodeScanner("reader", {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        }, false);

        const onScanSuccess = (decodedText) => {
          scanner.clear();
          handleProcessQR(decodedText);
        };

        const onScanError = (err) => {
          // Ignore errors
        };

        scanner.render(onScanError);
      }, 300);

      return () => {
        clearTimeout(timer);
        if (scanner) {
          scanner.clear().catch(e => console.error("Scanner clear failed", e));
        }
      };
    }
  }, [showAddAuthModal, addAuthMode]);

  const handleProcessQR = (text) => {
    if (text.startsWith('otpauth://')) {
      try {
        const url = new URL(text);
        const name = decodeURIComponent(url.pathname.split(':').pop() || 'New Account');
        const secret = url.searchParams.get('secret');
        if (secret) {
          handleAddAuthenticatorAccount(name, secret);
        }
      } catch (e) {
        setError("Invalid QR Code format");
      }
    } else {
      // Assume raw secret
      setManualAuthData({ ...manualAuthData, secret: text });
      setAddAuthMode('manual');
    }
  };

  const handleAddAuthenticatorAccount = async (name, secret) => {
    try {
      const res = await axios.post(`${API_BASE}/users/2fa/accounts`, {
        name, secret
      }, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (res.data.success) {
        setShowAddAuthModal(false);
        fetchAuthenticatorAccounts(accessToken);
        setManualAuthData({ name: '', secret: '' });
      }
    } catch (err) {
      setError("Failed to add account");
    }
  };

  const handleEnable2FA = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${API_BASE}/users/2fa/setup`, {}, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (res.data.success) {
        setSetup2FAData({
          secret: res.data.data.secret,
          qrCodeUrl: res.data.data.qrCodeUrl
        });
        setSetup2FACode('');
        setShowSetup2FAModal(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to initiate 2-Step Verification setup');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndEnable2FA = async (e) => {
    e.preventDefault();
    if (!setup2FACode || setup2FACode.trim().length !== 6) {
      setError('Please enter a valid 6-digit verification code');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${API_BASE}/users/2fa/verify`, {
        code: setup2FACode
      }, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (res.data.success) {
        setProfileData(prev => prev ? ({ ...prev, twoFactorEnabled: true }) : prev);
        setSettingsData(prev => prev ? ({ ...prev, twoFactorEnabled: true }) : prev);
        setShowSetup2FAModal(false);
        fetchAuthenticatorAccounts(accessToken);
        showAlert("2-Step Verification has been enabled successfully.");
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed. Please check the code.');
    } finally {
      setLoading(false);
    }
  };

  const handleDisable2FA = async () => {
    if (!window.confirm("Are you sure you want to disable 2-Step Verification? This will make your account less secure.")) {
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/users/2fa/disable`, {}, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (res.data.success) {
        setProfileData(prev => prev ? ({ ...prev, twoFactorEnabled: false }) : prev);
        setSettingsData(prev => prev ? ({ ...prev, twoFactorEnabled: false }) : prev);
        fetchAuthenticatorAccounts(accessToken);
        showAlert("2-Step Verification has been disabled.");
      }
    } catch (err) {
      setError("Failed to disable 2-Step Verification");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.post(`${API_BASE}/auth/change-password`, {
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword
      }, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      setShowChangePasswordModal(false);
      setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
      showAlert("Password changed successfully");
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotInModal = () => {
    setShowChangePasswordModal(false);
    const email = profileData?.email || formData.identifier;
    setFormData(prev => ({ ...prev, identifier: email }));
    handleForgotPasswordClickWithEmail(email);
  };

  const handleForgotPasswordClickWithEmail = async (email) => {
    setLoading(true);
    setError('');
    const normalizedEmail = normalizeIdentifier(email);
    try {
      const res = await axios.get(`${API_BASE}/auth/forgot-password/options?identifier=${normalizedEmail}`);
      if (res.data.success) {
        setRecoveryOptions(res.data.data);
        setView('forgot-password-options');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'User not found or no recovery options set');
      setView('forgot-password-identifier');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRecovery = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.patch(`${API_BASE}/users/recovery`, recoveryInfo, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (res.data.success) {
        setIsEditingRecovery(false);
        fetchRecoveryInfo(accessToken);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update recovery info');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAccount = async (account) => {
    const { token, userData } = account;

    localStorage.setItem('bnx_last_identifier', userData.email);
    setFormData(prev => ({ ...prev, identifier: userData.email, password: '' }));
    setUseSavedAccount(true);

    // Check if the application requires a business or child account
    if (registrationMode === 'business' && userData.accountType !== 'BUSINESS') {
      setError('This application requires a Business account.');
      return;
    }

    if (registrationMode === 'child' && userData.accountType !== 'CHILD') {
      setError('This application is restricted to Child accounts.');
      return;
    }

    setLoading(true);

    // Set as active session
    localStorage.setItem('bnx_accessToken', token);
    localStorage.setItem('bnx_userData', JSON.stringify(userData));
    setAccessToken(token);

    if (clientId === 'account-ui' && redirectUri) {
      window.location.href = `${redirectUri}?token=${token}`;
    } else if (clientId && redirectUri) {
      try {
        const authRes = await axios.post(
          `${API_BASE}/oauth/authorize`,
          { clientId, redirectUri, state },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (authRes.data.success) {
          const code = authRes.data.data.code;
          window.location.href = `${redirectUri}?code=${code}&state=${state}`;
        }
      } catch (err) {
        setError('Session expired. Please log in again.');
        // Remove expired from list
        const updated = accounts.filter(acc => acc.userData.email !== userData.email);
        setAccounts(updated);
        localStorage.setItem('bnx_accounts', JSON.stringify(updated));
        setView('login-email');
      } finally {
        setLoading(false);
      }
    } else {
      fetchEmails(token);
      fetchSessions(token);
      fetchExternalSessions(token);
      fetchRecoveryInfo(token);
      setView('dashboard');
      if (window.location.pathname === '/') navigate('/dashboard');
      setLoading(false);
    }
  };

  const parseUserAgent = (ua) => {
    if (!ua) return { name: 'Unknown Device', browser: 'Browser', type: 'monitor' };
    const lowerUA = ua.toLowerCase();

    let name = 'Unknown Device';
    let type = 'monitor';
    if (lowerUA.includes('iphone')) {
      name = 'iPhone';
      type = 'phone';
    } else if (lowerUA.includes('android')) {
      name = 'Android Phone';
      type = 'phone';
    } else if (lowerUA.includes('ipad')) {
      name = 'iPad';
      type = 'tablet';
    } else if (lowerUA.includes('macintosh')) {
      name = 'MacBook';
      type = 'monitor';
    } else if (lowerUA.includes('windows')) {
      name = 'Windows PC';
      type = 'monitor';
    } else if (lowerUA.includes('linux')) {
      name = 'Linux PC';
      type = 'monitor';
    }

    let browser = 'Web Browser';
    if (lowerUA.includes('firefox')) {
      browser = 'Firefox';
    } else if (lowerUA.includes('opr/') || lowerUA.includes('opera')) {
      browser = 'Opera';
    } else if (lowerUA.includes('edg/')) {
      browser = 'Edge';
    } else if (lowerUA.includes('chrome')) {
      browser = 'Chrome';
    } else if (lowerUA.includes('safari') && !lowerUA.includes('chrome')) {
      browser = 'Safari';
    }

    return { name, browser, type };
  };

  const normalizeIdentifier = (id) => {
    if (!id) return id;
    if (id.includes('@')) return id;
    return `${id}@bnxmail.com`;
  };

  const validatePassword = (password) => {
    if (!password) return { isValid: false, requirements: { minLength: false, hasUpper: false, hasNumber: false, hasSpecial: false } };
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return {
      isValid: minLength && hasUpper && hasNumber && hasSpecial,
      requirements: { minLength, hasUpper, hasNumber, hasSpecial }
    };
  };

  const PasswordRequirements = ({ password }) => {
    const { requirements } = validatePassword(password);

    const missing = [];
    if (!requirements.minLength) missing.push("8+ characters");
    if (!requirements.hasUpper) missing.push("one uppercase");
    if (!requirements.hasNumber) missing.push("one number");
    if (!requirements.hasSpecial) missing.push("one special character");

    if (missing.length === 0) return <p className="password-hint success">Password is strong</p>;

    return <p className="password-hint error">Must include: {missing.join(", ")}</p>;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    localStorage.setItem('bnx_last_identifier', formData.identifier);
    const normalizedEmail = normalizeIdentifier(formData.identifier);

    try {
      const loginRes = await axios.post(`${API_BASE}/auth/login`, {
        email: normalizedEmail,
        password: formData.password
      });

      if (loginRes.data.success) {
        const data = loginRes.data.data;

        if (data.status === '2FA_REQUIRED') {
          setTempToken(data.tempToken);
          setView('login-2fa');
          setLoading(false);
          return;
        }

        const userData = data;
        const token = userData.accessToken;
        const userAccountType = userData.accountType;

        if (registrationMode === 'business' && userAccountType !== 'BUSINESS') {
          setError('This application requires a Business account.');
          setLoading(false);
          return;
        }

        if (registrationMode === 'child' && userAccountType !== 'CHILD') {
          setError('This application is restricted to Child accounts.');
          setLoading(false);
          return;
        }

        const isB2AuthFlow = window.location.hostname.includes('b2auth.com') || window.location.hostname === 'localhost';

        if (isB2AuthFlow && !clientId) {
          saveAccount(token, {
            email: userData.email,
            username: userData.username,
            firstName: userData.firstName,
            lastName: userData.lastName,
            accountType: userData.accountType,
            isPrimary: userData.isPrimary
          });

          setFormData(prev => ({ ...prev, identifier: userData.email, firstName: userData.firstName, lastName: userData.lastName }));
          setAccessToken(token);
          fetchEmails(token);
          fetchSessions(token);
          fetchExternalSessions(token);
          fetchRecoveryInfo(token);
          
          if (userData.accountType === 'BUSINESS' && !userData.onboarded) {
            setView('signup-business-onboarding');
          } else {
            setView('dashboard');
            if (window.location.pathname === '/') navigate('/dashboard');
          }
        } else if (clientId === 'account-ui' && redirectUri) {
          saveAccount(token, {
            email: userData.email,
            username: userData.username,
            firstName: userData.firstName,
            lastName: userData.lastName,
            accountType: userData.accountType,
            isPrimary: userData.isPrimary
          });
          window.location.href = `${redirectUri}?token=${token}`;
        } else if (clientId && redirectUri) {
          // Still save the account for future use
          saveAccount(token, {
            email: userData.email,
            username: userData.username,
            firstName: userData.firstName,
            lastName: userData.lastName,
            accountType: userData.accountType,
            isPrimary: userData.isPrimary
          });

          const authRes = await axios.post(
            `${API_BASE}/oauth/authorize`,
            { clientId, redirectUri, state },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (authRes.data.success) {
            const code = authRes.data.data.code;
            window.location.href = `${redirectUri}?code=${code}&state=${state}`;
          }
        } else {
          window.location.href = 'https://mail.bnxmail.com';
        }
      }
    } catch (err) {
      console.error("Login Error:", err);
      const msg = err.response?.data?.message || err.message || 'Invalid credentials';
      alert('Login Error: ' + msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyLogin2fa = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${API_BASE}/auth/login/2fa`, {
        tempToken: tempToken,
        code: formData.otp
      });
      if (res.data.success) {
        const userData = res.data.data;
        const token = userData.accessToken;

        const isB2AuthFlow = window.location.hostname.includes('b2auth.com') || window.location.hostname === 'localhost';

        if (isB2AuthFlow && !clientId) {
          saveAccount(token, {
            email: userData.email,
            username: userData.username,
            firstName: userData.firstName,
            lastName: userData.lastName,
            accountType: userData.accountType,
            isPrimary: userData.isPrimary
          });

          setFormData(prev => ({ ...prev, identifier: userData.email, firstName: userData.firstName, lastName: userData.lastName }));
          setAccessToken(token);
          fetchEmails(token);
          fetchSessions(token);
          fetchExternalSessions(token);
          fetchRecoveryInfo(token);
          setView('dashboard');
          if (window.location.pathname === '/') navigate('/dashboard');
        } else if (clientId === 'account-ui' && redirectUri) {
          saveAccount(token, {
            email: userData.email,
            username: userData.username,
            firstName: userData.firstName,
            lastName: userData.lastName,
            accountType: userData.accountType,
            isPrimary: userData.isPrimary
          });
          window.location.href = `${redirectUri}?token=${token}`;
        } else if (clientId && redirectUri) {
          saveAccount(token, {
            email: userData.email,
            username: userData.username,
            firstName: userData.firstName,
            lastName: userData.lastName,
            accountType: userData.accountType,
            isPrimary: userData.isPrimary
          });

          const authRes = await axios.post(
            `${API_BASE}/oauth/authorize`,
            { clientId, redirectUri, state },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (authRes.data.success) {
            const code = authRes.data.data.code;
            window.location.href = `${redirectUri}?code=${code}&state=${state}`;
          }
        } else {
          window.location.href = 'https://mail.bnxmail.com';
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid 2FA code');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccountClick = () => {
    setError('');
    if (registrationMode === 'business') {
      setSignupType('BUSINESS');
      setView('signup-business');
    }
    else if (registrationMode === 'child') {
      setSignupType('CHILD');
      setView('signup-child');
    } else if (registrationMode === 'public') {
      setSignupType('PERSONAL');
      setView('signup-profile');
    } else setView('signup-selection');
  };

  const calculateAge = (dobString) => {
    if (!dobString) return 0;
    const today = new Date();
    const birthDate = new Date(dobString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleGoToMailSignup = (e) => {
    e.preventDefault();
    setError('');

    if (signupType === 'BUSINESS') {
      if (businessSignupType === 'primary') {
        if (primaryBusinessStep === 1) {
          setLoading(true);
          const type = primaryBusinessData.size === 'small' ? 'GSTIN' : 'LARGE_BUSINESS';
          axios.post(`${API_BASE}/auth/verify-business`, {
            type: type,
            cin: primaryBusinessData.cin,
            pan: primaryBusinessData.pan,
            gstin: primaryBusinessData.gstin
          })
          .then(res => {
            if (res.data.success) {
              setPrimaryBusinessStep(2);
            } else {
              setError(res.data.message || 'Verification failed');
            }
          })
          .catch(err => {
            setError(err.response?.data?.message || 'Verification failed');
          })
          .finally(() => setLoading(false));
        } else {
          // Move to email signup from step 2
          setFormData(prev => ({ ...prev, username: '', emailName: '' }));
          setView('signup-mail');
        }
      } else {
        setFormData(prev => ({ ...prev, username: '', emailName: '' }));
        setView('signup-mail');
      }
      return;
    }

    const age = calculateAge(formData.dob);

    if (signupType === 'PERSONAL') {
      if (age < 5) {
        setError('Age must be at least 5 years old to register.');
        return;
      }
      if (age < 18) {
        setSignupType('CHILD');
        setView('signup-child');
        setError('You are under 18 so open the child account');
        return;
      }
      
      setFormData(prev => ({ ...prev, username: '', emailName: '' }));
      setView('signup-mail');
    } else if (signupType === 'CHILD') {
      if (age < 5) {
        setError('Child must be at least 5 years old to register.');
        return;
      }
      if (age >= 18) {
        setSignupType('PERSONAL');
        setView('signup-profile');
        setError('You are 18 or older so open the personal account');
        return;
      }
      setParentOtpSent(false);
      setView('signup-parent-verify');
    }
  };

  const handleSendParentOtp = async (e) => {
    e.preventDefault();
    if (!formData.parentEmail || !formData.parentEmail.trim()) {
      setError('Parent email is required');
      return;
    }
    
    if (!formData.parentEmail.trim().toLowerCase().endsWith('@bnxmail.com')) {
      setError('Parent email must be a valid @bnxmail.com address');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${API_BASE}/auth/child/send-parent-otp`, { parentEmail: formData.parentEmail });
      if (res.data.success) {
        setParentOtpSent(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP to parent');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyParentOtp = async (e) => {
    e.preventDefault();
    if (!formData.parentOtp || !formData.parentOtp.trim()) {
      setError('Please enter the verification code');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${API_BASE}/auth/child/verify-parent-otp`, { 
        parentEmail: formData.parentEmail, 
        otp: formData.parentOtp 
      });
      if (res.data.success) {
        setFormData(prev => ({ ...prev, username: '', emailName: '' }));
        setView('signup-mail');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOnboardingData(prev => ({
          ...prev,
          [field]: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOnboardingSubmit = async (e) => {
    e.preventDefault();
    if (!onboardingData.acceptTerms) {
      setError('You must accept the Terms of Service & Privacy Policy');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${API_BASE}/business/onboard`, onboardingData, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (res.data.success) {
        // Fallback flag for extra client-side routing speed
        localStorage.setItem('bnx_business_onboarded_' + formData.identifier, 'true');
        
        // Fetch fresh profile state to sync profile photo, logo, etc.
        const meRes = await axios.get(`${API_BASE}/users/me`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        if (meRes.data.success) {
          setProfileData(meRes.data.data);
        }
        
        setView('dashboard');
        if (window.location.pathname === '/') navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to complete business profile onboarding.');
    } finally {
      setLoading(false);
    }
  };

  const handleFinalSignupSubmit = async (e) => {
    e.preventDefault();
    if (signupSubmitRef.current) return;
    
    if (!formData.username || !formData.username.trim()) {
      setError('Please select a suggested email handle or type one');
      setView('signup-mail');
      return;
    }

    signupSubmitRef.current = true;
    const username = formData.username.trim();
    if (username.length < 10) {
      setError('Email handle must be atleast 10 characters long.');
      setView('signup-mail');
      return;
    }
    const digits = (username.match(/\d/g) || []).length;
    const letters = (username.match(/[a-zA-Z]/g) || []).length;
    console.log({
        username,
        letters,
        digits,
        length: username.length
    });
    if (digits < 3 || letters < 7) {
      setError('Email handle must be at least 7 letters and 3 numbers.');
      setView('signup-mail');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const { isValid } = validatePassword(formData.password);
    if (!isValid) {
      setError('Password does not meet the security requirements');
      return;
    }

    setLoading(true);
    setError('');

    const payload = {
      username: formData.username,
      password: formData.password,
      mode: signupType === 'CHILD' ? 'PERSONAL' : signupType,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.mobileNumber,
      dob: formData.dob
    };

    if (signupType === 'CHILD') {
      payload.parentEmail = formData.parentEmail;
    }

    if (signupType === 'BUSINESS') {
      payload.accountType = 'BUSINESS';
      payload.businessFlow = businessSignupType;
      payload.ownerFirstName = formData.firstName;
      payload.ownerLastName = formData.lastName;
      payload.businessName = formData.businessName;
      payload.registrationNumber = formData.registrationNumber;
      payload.domain = 'bnxmail.com';
      if (businessSignupType === 'primary') {
        payload.businessSize = primaryBusinessData.size; // 'small' or 'large'
        payload.cin = primaryBusinessData.cin;
        payload.gstin = primaryBusinessData.gstin;
        // The newly added detailed fields:
        payload.businessType = onboardingData.businessType;
        payload.industry = onboardingData.industry;
        payload.companySize = onboardingData.companySize;
        payload.businessWebsite = onboardingData.businessWebsite;
        payload.businessAddress = onboardingData.businessAddress;
      }
    }

    try {
      const regRes = await axios.post(`${API_BASE}/auth/register`, payload);
      if (regRes.data.success) {
        const token = regRes.data.data.tempToken;
        const mailRes = await axios.post(
          `${API_BASE}/emails/create`,
          { emailName: formData.username, password: formData.password, isPrimary: true },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (mailRes.data.success) {
          setFormData(prev => ({ ...prev, identifier: mailRes.data.data.email }));
          signupSubmitRef.current = false;
          setView('login-password');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      signupSubmitRef.current = false;
    } finally {
      setLoading(false);
    }
  };

  const handleMailFormSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.username || !formData.username.trim()) {
      setError('Please select a suggested email handle or type one');
      return;
    }

    const username = formData.username.trim();
    if (username.length < 10) {
      setError('Email handle must be atleast 10 characters long.');
      return;
    }
    const digits = (username.match(/\d/g) || []).length;
    const letters = (username.match(/[a-zA-Z]/g) || []).length;
    console.log({
        username,
        letters,
        digits,
        length: username.length
    });
    if (digits < 3 || letters < 7) {
      setError('Email handle must contain at least 7 letters and 3 numbers.');
      return;
    }

    if (tempToken) {
      handleCreateMailbox(e);
    } else {
      setView('signup-mobile-verify');
    }
  };

  const handleSendMobileOtp = async (e) => {
    e.preventDefault();
    if (!formData.mobileNumber) {
      setError('Mobile number is required');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API_BASE}/auth/send-mobile-otp`, { mobile: formData.mobileNumber });
      
      if (response.data && response.data.success === false) {
          setError(response.data.message || 'Failed to send OTP');
          setLoading(false);
          return;
      }

      setMobileOtpStep('OTP');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyMobileOtp = async (e) => {
    e.preventDefault();
    if (!formData.mobileOtp) {
      setError('Please enter the OTP');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API_BASE}/auth/verify-mobile-otp`, {
          mobile: formData.mobileNumber,
          otp: formData.mobileOtp
      });

      if (response.data && response.data.success === false) {
          setError(response.data.message || 'Invalid OTP');
          setLoading(false);
          return;
      }
      
      setView('signup-password-setup');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterProfile = async (e, type = 'PERSONAL') => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { isValid } = validatePassword(formData.password);
    if (!isValid) {
      setError('Password does not meet the security requirements');
      setLoading(false);
      return;
    }

    let finalUsername = formData.username?.trim();
    if (!finalUsername) {
      if (usernameSuggestions && usernameSuggestions.length > 0) {
        finalUsername = usernameSuggestions[0];
      } else {
        setError('Username is required');
        setLoading(false);
        return;
      }
    }

    let payload = {
      username: finalUsername,
      password: formData.password,
      mode: type,
      phoneNumber: formData.mobileNumber
    };

    if (type === 'BUSINESS') {
      payload = { ...payload, businessName: formData.businessName, businessType: formData.businessType, registrationNumber: formData.registrationNumber, ownerFirstName: formData.ownerFirstName, ownerLastName: formData.ownerLastName, domain: formData.domain };
    } else {
      payload = { ...payload, firstName: formData.firstName, lastName: formData.lastName, dob: formData.dob };
    }

    try {
      const regRes = await axios.post(`${API_BASE}/auth/register`, payload);
      if (regRes.data.success) {
        setTempToken(regRes.data.data.tempToken);
        setFormData(prev => ({ ...prev, username: finalUsername, emailName: finalUsername }));
        setView('signup-mail');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMailbox = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const mailRes = await axios.post(
        `${API_BASE}/emails/create`,
        { emailName: formData.emailName, password: formData.password, isPrimary: true },
        { headers: { Authorization: `Bearer ${tempToken}` } }
      );
      if (mailRes.data.success) {
        setFormData({ ...formData, identifier: mailRes.data.data.email });
        setView('login-password');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Email creation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordClick = async () => {
    setError('');
    if (formData.identifier) {
      setLoading(true);
      setError('');
      const normalizedEmail = normalizeIdentifier(formData.identifier);
      try {
        const res = await axios.get(`${API_BASE}/auth/forgot-password/options?identifier=${normalizedEmail}`);
        if (res.data.success) {
          setRecoveryOptions(res.data.data);
          setView('forgot-password-options');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'User not found or no recovery options set');
        setView('forgot-password-identifier');
      } finally {
        setLoading(false);
      }
    } else {
      setView('forgot-password-identifier');
    }
  };

  const handleForgotPasswordIdentifierSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const normalizedEmail = normalizeIdentifier(formData.identifier);
    try {
      const res = await axios.get(`${API_BASE}/auth/forgot-password/options?identifier=${normalizedEmail}`);
      if (res.data.success) {
        setRecoveryOptions(res.data.data);
        setView('forgot-password-options');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'User not found');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (method) => {
    setLoading(true);
    setError('');
    try {
      const normalizedEmail = normalizeIdentifier(formData.identifier);
      console.log(normalizedEmail, method)
      await axios.post(`${API_BASE}/auth/forgot-password/send-otp`, {
        identifier: normalizedEmail,
        method: method
      });

      setView('forgot-password-otp');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!formData.otp || formData.otp.length < 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }
    setLoading(true);
    const normalizedEmail = normalizeIdentifier(formData.identifier);
    try {
      const res = await axios.post(`${API_BASE}/auth/forgot-password/verify-otp`, { identifier: normalizedEmail, otp: formData.otp });
      if (res.data.success) setView('forgot-password-reset');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid code');
    } finally {
      setLoading(false);
    }
  };

  const handleSend2faRecoveryOtp = async () => {
    setLoading(true);
    setError('');
    setSuccessMessage('');
    try {
      await axios.post(`${API_BASE}/auth/login/2fa/send-otp`, { tempToken });
      setSuccessMessage("Recovery code sent to your email.");
      setFormData({ ...formData, otp: '' });
      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send recovery code');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify2faRecoveryOtp = async (e) => {
    e.preventDefault();
    if (!formData.otp) {
      setError('Please enter the code from your email');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${API_BASE}/auth/login/2fa/verify-otp`, {
        tempToken,
        otp: formData.otp
      });
      if (res.data.success) {
        const token = res.data.data.accessToken;
        const userData = res.data.data;
        saveAccount(token, userData);
        setAccessToken(token);

        if (clientId === 'account-ui' && redirectUri) {
          saveAccount(token, {
            email: userData.email,
            username: userData.username,
            firstName: userData.firstName,
            lastName: userData.lastName,
            accountType: userData.accountType,
            isPrimary: userData.isPrimary
          });
          window.location.href = `${redirectUri}?token=${token}`;
        } else if (clientId && redirectUri) {
          saveAccount(token, {
            email: userData.email,
            username: userData.username,
            firstName: userData.firstName,
            lastName: userData.lastName,
            accountType: userData.accountType,
            isPrimary: userData.isPrimary
          });

          try {
            const authRes = await axios.post(
              `${API_BASE}/oauth/authorize`,
              { clientId, redirectUri, state },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            if (authRes.data.success) {
              const code = authRes.data.data.code;
              window.location.href = `${redirectUri}?code=${code}&state=${state}`;
              return;
            }
          } catch (oauthErr) {
            console.error("OAuth Authorization failed after 2FA recovery", oauthErr);
          }
        }

        fetchEmails(res.data.data.accessToken);
        fetchSessions(res.data.data.accessToken);
        fetchExternalSessions(res.data.data.accessToken);
        fetchRecoveryInfo(res.data.data.accessToken);
        setView('dashboard');
        if (window.location.pathname === '/') navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid recovery code');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const { isValid } = validatePassword(formData.newPassword);
    if (!isValid) {
      setError('New password does not meet security requirements');
      setLoading(false);
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    setLoading(true);
    const normalizedEmail = normalizeIdentifier(formData.identifier);
    try {
      const res = await axios.post(`${API_BASE}/auth/reset-password`, { identifier: normalizedEmail, otp: formData.otp, newPassword: formData.newPassword });
      if (res.data.success) {
        setView('login-password');
        showAlert('Password reset successfully.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchAccount = (account) => {
    localStorage.setItem('bnx_accessToken', account.token);
    localStorage.setItem('bnx_userData', JSON.stringify(account.userData));
    setAccessToken(account.token);
    setShowAccountSwitcher(false);
    window.location.reload();
  };

  const handleSignOutAll = () => {
    localStorage.removeItem('bnx_accessToken');
    localStorage.removeItem('bnx_userData');
    localStorage.removeItem('bnx_accounts');
    localStorage.removeItem('bnx_last_identifier');
    setAccounts([]);
    setAccessToken('');
    setUserEmails([]);
    setSessions([]);
    setExternalSessions([]);
    setUseSavedAccount(false);
    setView('login-email');
    navigate('/');
  };

  const fetchFullProfile = async (token) => {
    setLoading(true);
    try {
      const [meRes, settingsRes, recoveryRes] = await Promise.all([
        axios.get(`${API_BASE}/users/me`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_BASE}/users/settings`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_BASE}/users/recovery`, { headers: { Authorization: `Bearer ${token}` } })
      ]);

      if (meRes.data.success) setProfileData(meRes.data.data);
      if (settingsRes.data.success) setSettingsData(settingsRes.data.data);
      if (recoveryRes.data.success) {
        setRecoveryInfo({
          recoveryEmail: recoveryRes.data.data.recoveryEmail,
          phoneNumber: recoveryRes.data.data.phoneNumber
        });
      }
    } catch (err) {
      console.error("Failed to fetch full profile:", err);
      setError("Failed to load profile details");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileClick = () => {
    // fetchFullProfile(accessToken);
    // setView('profile-details');
    window.open('https://account.beta-softnet.com?token=' + accessToken, '_blank');
  };

  const handleAddAccount = () => {
    setShowAccountSwitcher(false);
    setView('login-email');
    setUseSavedAccount(false);
    setFormData(prev => ({ ...prev, identifier: '', password: '' }));
    navigate('/');
  };

  if (view === 'legal-privacy' || view === 'legal-terms') {
    return (
      <LegalPage
        documentKey={view === 'legal-privacy' ? 'privacy' : 'terms'}
        onBack={leaveLegalPage}
        onShowDocument={showLegalPage}
      />
    );
  }

  if (view === 'restoring') {
    return (
      <div className="restoring-container">
        <div className="restoring-content">
          <img src={betaLogo} alt="B2Auth" className="loading-logo-spin" />
          <div className="restoring-text">
            <h3>Restoring Session</h3>
            <p>Checking your credentials...</p>
          </div>
          <div className="loading-spinner-bar">
            <div className="loading-spinner-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'profile-details') {
    return (
      <div className="dashboard-container">
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <div className="navbar-brand">
              <img src={authLogo} alt="B2Auth" className="navbar-logo-img" />
              <span className="brand-text">B2Auth</span>
            </div>
          </div>
          <div className="topbar-right"></div>
        </header>

        <aside className="dashboard-sidebar">
          <nav className="sidebar-nav">
            <button className="sidebar-item" onClick={() => setView('dashboard')}>
              <div className="icon-box"><ChevronRight size={18} style={{ transform: 'rotate(180deg)' }} /></div>
              <span className="label">Back to Dashboard</span>
            </button>
          </nav>
        </aside>

        <main className="dashboard-content profile-page-content">
          <header className="section-header">
            <h2>Your B2Auth Account</h2>
            <p>Manage your personal info, security across BNX services.</p>
          </header>

          <div className="profile-card-elite animate-scale-in">
            <div className="profile-hero-section">
              <div className="profile-cover"></div>
              <div className="profile-header-main">
                <div className="large-avatar-circle">
                  {profileData?.name?.[0] || formData.firstName?.[0] || 'U'}
                </div>
                <div className="profile-titles">
                  <h3>{profileData?.name || `${formData.firstName} ${formData.lastName}`}</h3>
                  <p>{profileData?.email || formData.identifier}</p>
                  <div className="account-badge">{profileData?.accountType || 'PERSONAL'} ACCOUNT</div>
                </div>
              </div>
            </div>

            <div className="profile-details-grid">
              <div className="detail-category">
                <h4><User size={18} /> Personal Information</h4>
                <div className="info-list">
                  <div className="info-item">
                    <span className="info-label">Full Name</span>
                    <span className="info-value">{profileData?.name || 'Not set'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Display Email</span>
                    <span className="info-value">{profileData?.email || 'Not set'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Location</span>
                    <span className="info-value">{settingsData?.location || 'Not set'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Job Title</span>
                    <span className="info-value">{settingsData?.jobTitle || 'Not set'}</span>
                  </div>
                </div>
              </div>

              <div className="detail-category">
                <h4><ShieldCheck size={18} /> Security & Recovery</h4>
                <div className="info-list">
                  <div className="info-item">
                    <span className="info-label">Recovery Email</span>
                    <span className="info-value">{recoveryInfo.recoveryEmail || 'Not configured'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Phone Number</span>
                    <span className="info-value">{recoveryInfo.phoneNumber || 'Not configured'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">2FA Status</span>
                    <span className="info-value">{settingsData?.twoFactorEnabled ? 'Enabled' : 'Disabled'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Storage Limit</span>
                    <span className="info-value">{settingsData?.storageLimit || '5 GB'}</span>
                  </div>
                </div>
              </div>

              {/* <div className="detail-category">
                <h4><Settings size={18} /> Preferences</h4>
                <div className="info-list">
                  <div className="info-item">
                    <span className="info-label">Display Language</span>
                    <span className="info-value">{settingsData?.language || 'English (US)'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Theme Preference</span>
                    <span className="info-value" style={{textTransform: 'capitalize'}}>{settingsData?.themeMode || 'Light'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Accent Color</span>
                    <div className="color-preview-box" style={{backgroundColor: settingsData?.accentColor || '#4f46e5'}}></div>
                  </div>
                </div>
              </div> */}
            </div>

            <footer className="profile-card-footer">
              <button className="primary-btn" onClick={() => { setDashboardTab('settings'); setView('dashboard'); }}>
                Go to Settings
              </button>
            </footer>
          </div>
        </main>
      </div>
    );
  }


  const contextValue = {
    AuthenticatorCode, PasswordRequirements, accessToken, accounts, addAuthMode, authenticatorAccounts,
    businessSignupType, businessTypeData, calculateAge, clientId, customAlert, dashboardTab, error,
    expandedExternalSessionId, expandedSessionId, externalSessions, fetchAuthenticatorAccounts, fetchEmails,
    fetchExternalSessions, fetchFullProfile, fetchRecoveryInfo, fetchSessions, fetchedGstins,
    fetchingGstins, fetchingSignupGstins, formData, gstData, handleAddAccount, handleAddAuthenticatorAccount,
    handleBusinessTypeSelect, handleChangePassword, handleCreateAccountClick, handleCreateMailbox,
    handleDeleteAuthenticatorAccount, handleDisable2FA, handleEnable2FA, handleFetchGstins, handleFileChange,
    handleFinalSignupSubmit, handleForgotInModal, handleForgotPasswordClick, handleForgotPasswordClickWithEmail,
    handleForgotPasswordIdentifierSubmit, handleGoToMailSignup, handleInputChange, handleLogin, handleLogout,
    handleMailFormSubmit, handleMakePrimary, handleOnboardingSubmit, handleProcessQR,
    handleProfileClick, handleRegisterProfile, handleResetPassword, handleRevokeExternalSession, handleRevokeSession,
    handleSelectAccount, handleSend2faRecoveryOtp, handleSendMobileOtp, handleSendOtp, handleSendParentOtp,
    handleSignOutAll, handleSwitchAccount, handleUpdateRecovery, handleVerificationCallback, handleVerify2faRecoveryOtp,
    handleVerifyAndEnable2FA, handleVerifyGst, handleVerifyLogin2fa, handleVerifyMobileOtp, handleVerifyOtp,
    handleVerifyPan, handleVerifyParentOtp, isEditingRecovery, language, leaveLegalPage, loading, manualAuthData,
    mobileOtpStep, normalizeIdentifier, onboardingData, onboardingStep, panData,
    parentOtpSent, parseUserAgent, passwordForm, primaryBusinessData, primaryBusinessStep, profileData,
    recoveryInfo, recoveryOptions, redirectUri, registrationMode, resetSignupForm, saveAccount, selectedRecoveryMethod,
    sessions, setAccessToken, setAccounts, setAddAuthMode, setAuthenticatorAccounts, setBusinessSignupType,
    setBusinessTypeData, setClientId, setCustomAlert, setDashboardTab, setError, setExpandedExternalSessionId,
    setExpandedSessionId, setExternalSessions, setFetchedGstins, setFetchingGstins, setFetchingSignupGstins,
    setFormData, setGstData, setIsEditingRecovery, setLanguage, setLoading, setManualAuthData, setMobileOtpStep,
    setOnboardingData, setOnboardingStep, setPanData, setParentOtpSent, setPasswordForm, setPrimaryBusinessData,
    setPrimaryBusinessStep, setProfileData, setRecoveryInfo, setRecoveryOptions, setRedirectUri, setRegistrationMode,
    setSelectedRecoveryMethod, setSessions, setSettingsData, setSetup2FACode, setSetup2FAData, setShow2faRecovery,
    setShowAccountSwitcher, setShowAddAuthModal, setShowBusinessTypeModal, setShowChangePasswordModal, setShowGstModal,
    setShowPanModal, setShowSetup2FAModal, setSidebarCategory, setSignupFetchedGstins, setSignupType, setState,
    setSuccessMessage, setTempToken, setUseSavedAccount, setUserEmails, setUsernameSuggestions,
    setVerificationStatus, setVerifyPanResult, setView, setVkycUrl, settingsData, setup2FACode, setup2FAData,
    show2faRecovery, showAccountSwitcher, showAddAuthModal, showAlert, showBusinessTypeModal, showChangePasswordModal,
    showGstModal, showLegalPage, showPanModal, showSetup2FAModal, sidebarCategory, signupFetchedGstins, signupType,
    state, successMessage, tempToken, useSavedAccount, userEmails, usernameSuggestions,
    validatePassword, verificationStatus, verifyPanResult, view, vkycUrl,
    authLogo, cliksBusinessLogo, cliksLogo, bitToolLogo,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<EmailsTab />} />
          <Route path="/security" element={<SecurityTab />} />
          <Route path="/settings" element={<SettingsTab />} />
          <Route path="/activity" element={<ActivityTab />} />
        </Route>

        <Route element={<AuthLayout />}>
          {/* Auth Routes */}
          <Route path="/" element={view === 'account-selection' ? <AccountSelection /> : view === 'verifying' ? <Verifying /> : view === 'login-2fa' ? <Login2FA /> : view === 'legal-privacy' ? <LegalPrivacy /> : view === 'legal-terms' ? <LegalPrivacy /> : view.startsWith('forgot') ? (
            view === 'forgot-password-identifier' ? <ForgotPasswordIdentifier /> :
            view === 'forgot-password-options' ? <ForgotPasswordOptions /> :
            view === 'forgot-password-otp' ? <ForgotPasswordOtp /> :
            <ForgotPasswordReset />
          ) : view.startsWith('signup') ? (
            view === 'signup-selection' ? <SignupSelection /> :
            view === 'signup-profile' ? <SignupProfile /> :
            view === 'signup-business' ? <SignupBusiness /> :
            view === 'signup-business-onboarding' ? <SignupBusinessOnboarding /> :
            view === 'signup-child' ? <SignupChild /> :
            view === 'signup-parent-verify' ? <SignupParentVerify /> :
            view === 'signup-mail' ? <SignupMail /> :
            view === 'signup-mobile-verify' ? <SignupMobileVerify /> :
            <SignupPasswordSetup />
          ) : view === 'restoring' ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: '300px' }}>
              <RefreshCw className="spin" size={24} color="#64748b" />
            </div>
          ) : <LoginView />} />
        </Route>
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
