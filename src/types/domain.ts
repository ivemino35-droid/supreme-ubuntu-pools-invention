export type TrustDomain = 'family' | 'community' | 'commercial' | 'vouching';

export type TrustSignalType =
  | 'on_time_contribution'
  | 'late_contribution'
  | 'missed_contribution'
  | 'vote_participation'
  | 'missed_vote'
  | 'emergency_support'
  | 'rule_violation'
  | 'successful_vouch'
  | 'failed_vouch'
  | 'orderly_exit'
  | 'disruptive_exit';

export type TrustBand = 'unproven' | 'emerging' | 'reliable' | 'steward';
