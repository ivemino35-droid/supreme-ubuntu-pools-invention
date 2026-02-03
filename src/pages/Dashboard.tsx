import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import { loadState } from '../services/repo';

export default function Dashboard() {
  const state = loadState();

  return (
    <div className="container">
      <div className="grid grid2">
        <div className="grid">
          <Section title="Your Pools" subtitle="Local preview data (stored in your browser).">
            {state.pools.length === 0 ? (
              <div>
                <div className="pill">No pools yet</div>
                <div style={{ marginTop: 10 }}>
                  <Link to="/create" className="btn" style={{ display: 'inline-flex' }}>Create a Pool</Link>
                </div>
              </div>
            ) : (
              <div className="grid">
                {state.pools.map(p => (
                  <div key={p.id} className="card" style={{ padding: 14, borderRadius: 14 }}>
                    <div className="hrow">
                      <div>
                        <div style={{ fontWeight: 950, fontSize: 16 }}>{p.name}</div>
                        <div className="small">Template: {p.template}</div>
                      </div>
                      <div className="pill">R {p.contributionAmountZar.toFixed(0)} / month</div>
                    </div>
                    <div className="small" style={{ marginTop: 10 }}>Members: {p.members.length}</div>
                    <div style={{ marginTop: 12, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      <Link to={`/agreement/${p.id}`} className="btn secondary">View Constitution</Link>
                      <Link to={`/pool/${p.id}`} className="btn">Open Pool</Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>
        </div>

        <div className="grid">
          <Section title="Pilot Focus" subtitle="Single pilot constitution to prove trust + governance end-to-end.">
            <div className="kv">
              <div>
                <div style={{ fontWeight: 900 }}>Pilot</div>
                <div className="small">Family Emergency & Education Pool</div>
              </div>
              <div>
                <div style={{ fontWeight: 900 }}>Governance</div>
                <div className="small">Quorum + voting thresholds + time-lock</div>
              </div>
              <div>
                <div style={{ fontWeight: 900 }}>Trust</div>
                <div className="small">Signals + time decay (multi-domain)</div>
              </div>
            </div>
            <div style={{ marginTop: 12 }} className="small">
              This preview is non-custodial and uses localStorage for demonstration.
            </div>
          </Section>

          <Section title="Quick Links">
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link to="/manifesto" className="btn secondary">Manifesto</Link>
              <Link to="/trust-graph" className="btn secondary">Trust Graph</Link>
              <Link to="/create" className="btn">Create Pool</Link>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
