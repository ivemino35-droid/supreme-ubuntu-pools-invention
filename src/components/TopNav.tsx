import React from 'react';
import { NavLink } from 'react-router-dom';

const linkStyle: React.CSSProperties = {
  padding: '10px 10px',
  borderRadius: 12,
  fontWeight: 900,
  fontSize: 12,
  letterSpacing: '0.12em',
  textTransform: 'uppercase'
};

export default function TopNav() {
  const nav = [
    { to: '/', label: 'Dashboard' },
    { to: '/create', label: 'Create Pool' },
    { to: '/manifesto', label: 'Manifesto' },
    { to: '/trust-graph', label: 'Trust Graph' },
  ];

  return (
    <div className="nav">
      <div className="container">
        <div className="hrow">
          <div className="brand">
            <div className="logo">U</div>
            <div>
              <div style={{ fontWeight: 950, letterSpacing: '-0.02em' }}>Ubuntu Pools</div>
              <div className="small">Collective Prosperity • Fresh Preview Build</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {nav.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                style={({ isActive }) => ({
                  ...linkStyle,
                  border: '1px solid var(--border)',
                  background: isActive ? 'rgba(212,175,55,0.18)' : 'rgba(255,255,255,0.05)',
                  color: isActive ? 'var(--text)' : 'var(--muted)'
                })}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
