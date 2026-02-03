import React, { useMemo, useState } from 'react';
import Section from '../components/Section';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { DOMAIN_POLICIES, TrustSignal, computeTrustProfile, decayFactor, scoreBand } from '../services/trustGraph';
import { TrustDomain } from '../types/domain';

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

const sampleSignals: TrustSignal[] = [
  { signalId: 's1', userId: 'user_1', poolId: 'pool_a', domain: 'family', signalType: 'on_time_contribution', weight: 1.0, timestamp: daysAgo(7) },
  { signalId: 's2', userId: 'user_1', poolId: 'pool_a', domain: 'family', signalType: 'vote_participation', weight: 0.6, timestamp: daysAgo(14) },
  { signalId: 's3', userId: 'user_1', poolId: 'pool_a', domain: 'family', signalType: 'late_contribution', weight: -0.5, timestamp: daysAgo(35) },
  { signalId: 's4', userId: 'user_1', poolId: 'pool_b', domain: 'community', signalType: 'vote_participation', weight: 0.5, timestamp: daysAgo(9) },
  { signalId: 's5', userId: 'user_1', poolId: 'pool_b', domain: 'community', signalType: 'missed_vote', weight: -0.3, timestamp: daysAgo(22) },
  { signalId: 's6', userId: 'user_1', poolId: 'pool_c', domain: 'commercial', signalType: 'on_time_contribution', weight: 0.9, timestamp: daysAgo(5) },
  { signalId: 's7', userId: 'user_1', poolId: 'pool_c', domain: 'commercial', signalType: 'missed_contribution', weight: -0.8, timestamp: daysAgo(60) },
  { signalId: 's8', userId: 'user_1', poolId: 'pool_d', domain: 'vouching', signalType: 'successful_vouch', weight: 1.2, timestamp: daysAgo(3) },
  { signalId: 's9', userId: 'user_1', poolId: 'pool_d', domain: 'vouching', signalType: 'failed_vouch', weight: -1.0, timestamp: daysAgo(28) },
];

export default function TrustGraphPage() {
  const [domain, setDomain] = useState<TrustDomain>('family');
  const profile = useMemo(() => computeTrustProfile('user_1', domain, sampleSignals), [domain]);

  const decayData = useMemo(() => {
    const lambda = DOMAIN_POLICIES[domain].lambda;
    return Array.from({ length: 61 }, (_, i) => ({ days: i, decay: Number(decayFactor(lambda, i).toFixed(4)) }));
  }, [domain]);

  return (
    <div className="container">
      <div className="grid grid2">
        <Section title="Ubuntu Score Trust Graph" subtitle="Multi-domain trust profiles computed from time-decaying behavioral signals.">
          <div className="grid" style={{ gap: 12 }}>
            <div>
              <label>Domain</label>
              <select value={domain} onChange={(e) => setDomain(e.target.value as TrustDomain)}>
                <option value="family">Family</option>
                <option value="community">Community</option>
                <option value="commercial">Commercial</option>
                <option value="vouching">Vouching</option>
              </select>
            </div>

            <div className="kv">
              <div>
                <div style={{ fontWeight: 900 }}>Score</div>
                <div className="small">{(profile.score * 100).toFixed(0)} / 100</div>
              </div>
              <div>
                <div style={{ fontWeight: 900 }}>Band</div>
                <div className="small">{scoreBand(profile.score)}</div>
              </div>
              <div>
                <div style={{ fontWeight: 900 }}>Confidence</div>
                <div className="small">{(profile.confidence * 100).toFixed(0)}%</div>
              </div>
              <div>
                <div style={{ fontWeight: 900 }}>λ (Decay Rate)</div>
                <div className="small">{DOMAIN_POLICIES[domain].lambda}</div>
              </div>
            </div>

            <div style={{ height: 280 }} className="card">
              <div style={{ padding: 12, fontWeight: 900 }}>Decay Curve (e^(-λ·t))</div>
              <div style={{ height: 220, padding: 12 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={decayData}>
                    <XAxis dataKey="days" />
                    <YAxis domain={[0, 1]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="decay" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="small">
              Family trust decays slowest. Vouching decays fastest. Older behavior matters less as time passes.
            </div>
          </div>
        </Section>

        <Section title="Signals (Sample)" subtitle="Append-only behavioral events used to compute trust.">
          <div className="grid" style={{ gap: 10 }}>
            {sampleSignals.filter(s => s.domain === domain).map(s => (
              <div key={s.signalId} className="card" style={{ padding: 12, borderRadius: 14 }}>
                <div style={{ fontWeight: 950 }}>{s.signalType}</div>
                <div className="small">Weight: {s.weight}</div>
                <div className="small">Time: {new Date(s.timestamp).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
