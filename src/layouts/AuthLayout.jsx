import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { CheckCircle, AlertCircle } from 'lucide-react';
import authLogo from '../assets/auth2.png';
import cliksBusinessLogo from '../assets/cliks-business.png';
import cliksLogo from '../assets/cliks.png';
import bitToolLogo from '../assets/BIT-TOOL-2.png';

const AuthLayout = () => {
  const { view, customAlert } = useAppContext();

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
