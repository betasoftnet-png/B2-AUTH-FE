import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import { Mail, CheckCircle, Smartphone, Monitor, Tablet, XCircle, AlertCircle, RefreshCw, Trash2, Edit3, Save, Plus, ChevronDown, Check, X, ShieldCheck } from 'lucide-react';

const ActivityTab = () => {
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
    // Add any other destructured state from AppContext here
  } = useAppContext();

  return (
    <>
      
              <motion.div
                key="activity"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="content-section"
              >
                <header className="section-header">
                  <h2>Recent Activity</h2>
                  <p>A log of important security events on your account.</p>
                </header>
                <div className="activity-placeholder">
                  <Activity size={64} />
                  <h3>Nothing to show yet</h3>
                  <p>Your recent sign-ins and security changes will appear here.</p>
                </div>
              </motion.div>
            
    </>
  );
};

export default ActivityTab;
