import { TrustBand, TrustDomain, TrustSignalType } from '../types/domain';

export interface TrustSignal {
  signalId: string;
  userId: string;
  poolId: string;
  domain: TrustDomain;
  signalType: TrustSignalType;
  weight: number;
  timestamp: string;
}

export interface TrustProfile {
  userId: string;
  domain: TrustDomain;
  score: number;
  confidence: number;
  lastUpdated: string;
}

export interface DomainPolicy {
  domain: TrustDomain;
  lambda: number;
  minSignalsForConfidence: number;
  clampMin: number;
  clampMax: number;
}

export const DOMAIN_POLICIES: Record<TrustDomain, DomainPolicy> = {
  family:    { domain: 'family',    lambda: 0.008, minSignalsForConfidence: 8,  clampMin: 0, clampMax: 1 },
  community: { domain: 'community', lambda: 0.015, minSignalsForConfidence: 10, clampMin: 0, clampMax: 1 },
  commercial:{ domain: 'commercial',lambda: 0.020, minSignalsForConfidence: 12, clampMin: 0, clampMax: 1 },
  vouching:  { domain: 'vouching',  lambda: 0.040, minSignalsForConfidence: 6,  clampMin: 0, clampMax: 1 },
};

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

export function decayFactor(lambda: number, timeElapsedDays: number): number {
  return Math.exp(-lambda * timeElapsedDays);
}

export function computeTrustProfile(userId: string, domain: TrustDomain, signals: TrustSignal[], nowIso = new Date().toISOString()): TrustProfile {
  const policy = DOMAIN_POLICIES[domain];
  const now = new Date(nowIso).getTime();

  const domainSignals = signals
    .filter(s => s.userId === userId && s.domain === domain)
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  if (domainSignals.length === 0) {
    return { userId, domain, score: 0.3, confidence: 0.0, lastUpdated: nowIso };
  }

  let weighted = 0;
  let norm = 0;

  for (const s of domainSignals) {
    const t = new Date(s.timestamp).getTime();
    const days = Math.max(0, (now - t) / (1000 * 60 * 60 * 24));
    const d = decayFactor(policy.lambda, days);
    weighted += (s.weight * d);
    norm += (Math.abs(s.weight) * d);
  }

  const raw = 0.5 + (norm === 0 ? 0 : (weighted / (2 * norm)));
  const score = clamp(raw, policy.clampMin, policy.clampMax);
  const confidence = clamp(domainSignals.length / policy.minSignalsForConfidence, 0, 1);

  return { userId, domain, score, confidence, lastUpdated: nowIso };
}

export function scoreBand(score01: number): TrustBand {
  if (score01 < 0.30) return 'unproven';
  if (score01 < 0.60) return 'emerging';
  if (score01 < 0.80) return 'reliable';
  return 'steward';
}
