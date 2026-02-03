import React from 'react';
import { useParams } from 'react-router-dom';
import Section from '../components/Section';
import { getPool } from '../services/repo';
import { PILOT_FAMILY_CONSTITUTION } from '../pilotConstitution';

const COMMUNITY_STOKVEL_CONSTITUTION = {
  name: "Ubuntu Pools Community Constitution (Basic)",
  version: "v1.0",
  clauses: [
    { id: "c1", title: "1. Purpose", content: "Members coordinate contributions for mutual financial support. Ubuntu Pools enforces process, not outcomes." },
    { id: "c2", title: "2. Contributions", content: "Members contribute as agreed. Late or missed contributions may reduce privileges per group rules." },
    { id: "c3", title: "3. Withdrawals", content: "Withdrawals follow the group’s voting rules and are recorded transparently." },
    { id: "c4", title: "4. Disputes", content: "Disputes follow discussion, vote, and process review." },
  ]
} as const;

export default function Agreement() {
  const { id } = useParams();
  const pool = id ? getPool(id) : null;
  const constitution = pool?.template === 'family_pilot' ? PILOT_FAMILY_CONSTITUTION : COMMUNITY_STOKVEL_CONSTITUTION;

  return (
    <div className="container">
      <div className="grid grid2">
        <Section title="Pool Agreement" subtitle="Digital Constitution (preview).">
          <div className="small">Pool: <b>{pool?.name || 'Unknown Pool'}</b></div>
          <div className="small">Template: <b>{pool?.template || 'n/a'}</b></div>
          <div className="small">Version: <b>{constitution.version}</b></div>
          <hr />
          <div className="grid" style={{ gap: 10 }}>
            {constitution.clauses.map(c => (
              <div key={c.id} className="card" style={{ padding: 12, borderRadius: 14 }}>
                <div style={{ fontWeight: 950 }}>{c.title}</div>
                <div className="small" style={{ marginTop: 6, lineHeight: 1.5 }}>{c.content}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Signature" subtitle="Preview-only signature (no legal effect).">
          <div className="grid" style={{ gap: 12 }}>
            <div>
              <label>Legal Name</label>
              <input placeholder="e.g. Mihle Majokweni" />
            </div>
            <div>
              <label>Consent</label>
              <div className="small">
                This preview stores no real identity and holds no funds. Signing indicates you understand the constitution governs process.
              </div>
            </div>
            <button className="btn secondary" onClick={() => alert('Saved locally (demo).')}>Sign (Demo)</button>
          </div>
        </Section>
      </div>
    </div>
  );
}
