import React from 'react';

export default function Section(props: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="card" style={{ padding: 16 }}>
      <div className="hrow" style={{ alignItems: 'baseline' }}>
        <div>
          <h2 style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {props.title}
          </h2>
          {props.subtitle ? <div className="small" style={{ marginTop: 6 }}>{props.subtitle}</div> : null}
        </div>
      </div>
      <hr />
      {props.children}
    </div>
  );
}
