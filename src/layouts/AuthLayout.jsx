import React from 'react';
import { Outlet } from 'react-router-dom';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const AuthLayout = () => {
  const { customAlert } = useAppContext();

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
            <CheckCircle
              size={20}
              style={{ color: '#22c55e', flexShrink: 0 }}
            />
          ) : (
            <AlertCircle
              size={20}
              style={{ color: '#ef4444', flexShrink: 0 }}
            />
          )}

          <span style={{ fontSize: '14px', fontWeight: '600' }}>
            {customAlert.message}
          </span>
        </div>
      )}
    </div>
  );
};

export default AuthLayout;