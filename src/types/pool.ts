export type PoolTemplateKey = 'community_stokvel' | 'family_pilot';

export interface PoolMember {
  name: string;
  email: string;
  role: 'custodian' | 'contributor' | 'observer' | 'successor';
}

export interface PoolDraft {
  id: string;
  name: string;
  template: PoolTemplateKey;
  contributionAmountZar: number;
  members: PoolMember[];
  createdAt: string;
}
