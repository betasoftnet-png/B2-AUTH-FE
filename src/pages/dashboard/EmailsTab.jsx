import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import { Mail, CheckCircle, Smartphone, Monitor, Tablet, XCircle, AlertCircle, RefreshCw, Trash2, Edit3, Save, Plus, ChevronDown, Check, X, ShieldCheck } from 'lucide-react';

const EmailsTab = () => {
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
                key="emails"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="content-section"
              >
                <header className="section-header">
                  <h2>Admin</h2>
                  <p>Manage your linked mail accounts and primary address.</p>
                </header>
                <div className="identity-container animate-scale-in">
                  {userEmails.map(email => (
                    <div key={email.id} className="identity-row">
                      <div className="identity-leading">
                        <div className="identity-icon-box"><Mail size={18} /></div>
                      </div>
                      <div className="identity-info">
                        <div className="identity-label">
                          {email.email}
                          {email.isPrimary && <CheckCircle size={14} className="success-icon" />}
                        </div>
                        <div className="identity-sub">{email.emailName} • {email.active ? 'Active' : 'Inactive'}</div>
                      </div>
                      <div className="identity-trailing">
                        {email.isPrimary ? (
                          <span className="primary-pill-mini">Primary</span>
                        ) : (
                          <button
                            className="row-action-btn"
                            onClick={() => handleMakePrimary(email.id)}
                            disabled={loading}
                          >
                            Make Primary
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {/* <button className="add-identity-row">
                    <Plus size={18} />
                    <span>Add New Mailbox</span>
                  </button> */}
                </div>

                <div className="accounts-dashboard-section" style={{ marginTop: '40px' }}>
                  <header className="section-header">
                    <h2>Logged-in Identities</h2>
                    <p>Quickly switch between your active B2Auth accounts.</p>
                  </header>

                  {/* Business Accounts Section */}
                  {(sidebarCategory === 'ALL' ? accounts.some(a => a.userData.accountType === 'BUSINESS') : sidebarCategory === 'BUSINESS') && (
                    <div className="identity-group" style={{ marginTop: sidebarCategory === 'ALL' ? '0' : '24px' }}>
                      <h3 className="identity-group-title"><Briefcase size={14} /> Business Accounts</h3>
                      <div className="identity-container animate-scale-in">
                        {accounts.filter(a => a.userData.accountType === 'BUSINESS').length > 0 ? (
                          accounts.filter(a => a.userData.accountType === 'BUSINESS').map(account => (
                            <div
                              key={account.userData.email}
                              className={`identity-row clickable ${account.token === accessToken ? 'active-identity' : ''}`}
                              onClick={() => account.token !== accessToken && handleSwitchAccount(account)}
                            >
                              <div className="identity-leading">
                                <div className="identity-avatar-mini business">
                                  {account.userData.firstName?.[0] || account.userData.email[0].toUpperCase()}
                                </div>
                              </div>
                              <div className="identity-info">
                                <div className="identity-label">
                                  {account.userData.firstName} {account.userData.lastName}
                                  {account.token === accessToken && <span className="current-badge-mini">Current</span>}
                                  {account.userData.isPrimary && <span className="primary-badge-mini">Primary</span>}
                                </div>
                                <div className="identity-sub">{account.userData.email}</div>
                              </div>
                              <div className="identity-trailing">
                                {account.token !== accessToken && <ChevronRight size={16} className="switch-arrow-hint" />}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div style={{ padding: '24px', textAlign: 'center', color: '#5f6368', fontSize: '14px' }}>
                            No business accounts found.
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Personal Accounts Section */}
                  {(sidebarCategory === 'ALL' ? accounts.some(a => a.userData.accountType === 'PERSONAL' || a.userData.accountType === 'PUBLIC') : sidebarCategory === 'PERSONAL') && (
                    <div className="identity-group" style={{ marginTop: '24px' }}>
                      <h3 className="identity-group-title"><User size={14} /> Personal Accounts</h3>
                      <div className="identity-container animate-scale-in">
                        {accounts.filter(a => a.userData.accountType === 'PERSONAL' || a.userData.accountType === 'PUBLIC').length > 0 ? (
                          accounts.filter(a => a.userData.accountType === 'PERSONAL' || a.userData.accountType === 'PUBLIC').map(account => (
                            <div
                              key={account.userData.email}
                              className={`identity-row clickable ${account.token === accessToken ? 'active-identity' : ''}`}
                              onClick={() => account.token !== accessToken && handleSwitchAccount(account)}
                            >
                              <div className="identity-leading">
                                <div className="identity-avatar-mini">
                                  {account.userData.firstName?.[0] || account.userData.email[0].toUpperCase()}
                                </div>
                              </div>
                              <div className="identity-info">
                                <div className="identity-label">
                                  {account.userData.firstName} {account.userData.lastName}
                                  {account.token === accessToken && <span className="current-badge-mini">Current</span>}
                                  {account.userData.isPrimary && <span className="primary-badge-mini">Primary</span>}
                                </div>
                                <div className="identity-sub">{account.userData.email}</div>
                              </div>
                              <div className="identity-trailing">
                                {account.token !== accessToken && <ChevronRight size={16} className="switch-arrow-hint" />}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div style={{ padding: '24px', textAlign: 'center', color: '#5f6368', fontSize: '14px' }}>
                            No personal accounts found.
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Child Accounts Section */}
                  {(sidebarCategory === 'ALL' ? accounts.some(a => a.userData.accountType === 'CHILD') : sidebarCategory === 'CHILD') && (
                    <div className="identity-group" style={{ marginTop: '24px' }}>
                      <h3 className="identity-group-title"><User size={14} /> Child Accounts</h3>
                      <div className="identity-container animate-scale-in">
                        {accounts.filter(a => a.userData.accountType === 'CHILD').length > 0 ? (
                          accounts.filter(a => a.userData.accountType === 'CHILD').map(account => (
                            <div
                              key={account.userData.email}
                              className={`identity-row clickable ${account.token === accessToken ? 'active-identity' : ''}`}
                              onClick={() => account.token !== accessToken && handleSwitchAccount(account)}
                            >
                              <div className="identity-leading">
                                <div className="identity-avatar-mini">
                                  {account.userData.firstName?.[0] || account.userData.email[0].toUpperCase()}
                                </div>
                              </div>
                              <div className="identity-info">
                                <div className="identity-label">
                                  {account.userData.firstName} {account.userData.lastName}
                                  {account.token === accessToken && <span className="current-badge-mini">Current</span>}
                                  {account.userData.isPrimary && <span className="primary-badge-mini">Primary</span>}
                                </div>
                                <div className="identity-sub">{account.userData.email}</div>
                              </div>
                              <div className="identity-trailing">
                                {account.token !== accessToken && <ChevronRight size={16} className="switch-arrow-hint" />}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div style={{ padding: '24px', textAlign: 'center', color: '#5f6368', fontSize: '14px' }}>
                            No child accounts found.
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Primary Accounts Section */}
                  {(sidebarCategory === 'ALL' ? accounts.some(a => a.userData.isPrimary) : sidebarCategory === 'PRIMARY') && (
                    <div className="identity-group" style={{ marginTop: '24px' }}>
                      <h3 className="identity-group-title"><CheckCircle size={14} /> Primary Accounts</h3>
                      <div className="identity-container animate-scale-in">
                        {accounts.filter(a => a.userData.isPrimary).length > 0 ? (
                          accounts.filter(a => a.userData.isPrimary).map(account => (
                            <div
                              key={account.userData.email}
                              className={`identity-row clickable ${account.token === accessToken ? 'active-identity' : ''}`}
                              onClick={() => account.token !== accessToken && handleSwitchAccount(account)}
                            >
                              <div className="identity-leading">
                                <div className="identity-avatar-mini">
                                  {account.userData.firstName?.[0] || account.userData.email[0].toUpperCase()}
                                </div>
                              </div>
                              <div className="identity-info">
                                <div className="identity-label">
                                  {account.userData.firstName} {account.userData.lastName}
                                  {account.token === accessToken && <span className="current-badge-mini">Current</span>}
                                  {account.userData.isPrimary && <span className="primary-badge-mini">Primary</span>}
                                </div>
                                <div className="identity-sub">{account.userData.email}</div>
                              </div>
                              <div className="identity-trailing">
                                {account.token !== accessToken && <ChevronRight size={16} className="switch-arrow-hint" />}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div style={{ padding: '24px', textAlign: 'center', color: '#5f6368', fontSize: '14px' }}>
                            No primary accounts found.
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                </div>


              </motion.div>
            
    </>
  );
};

export default EmailsTab;
