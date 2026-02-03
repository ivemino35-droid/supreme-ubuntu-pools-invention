import React from 'react';
import Section from '../components/Section';
import { UBUNTU_POOLS_MANIFESTO } from '../manifesto';

export default function ManifestoPage() {
  return (
    <div className="container">
      <Section title={UBUNTU_POOLS_MANIFESTO.title} subtitle={UBUNTU_POOLS_MANIFESTO.subtitle}>
        <div className="grid" style={{ gap: 10 }}>
          {UBUNTU_POOLS_MANIFESTO.sections.map((s) => (
            <div key={s.heading} className="card" style={{ padding: 14, borderRadius: 14 }}>
              <div style={{ fontWeight: 950 }}>{s.heading}</div>
              <div className="small" style={{ marginTop: 8, lineHeight: 1.6 }}>{s.body}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
