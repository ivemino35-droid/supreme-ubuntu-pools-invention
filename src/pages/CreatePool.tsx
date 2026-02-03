import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Section from '../components/Section';
import { addPool } from '../services/repo';
import { PoolDraft, PoolMember, PoolTemplateKey } from '../types/pool';

function uid() {
  return 'pool_' + Math.random().toString(36).slice(2) + '_' + Date.now().toString(36);
}

export default function CreatePool() {
  const nav = useNavigate();
  const [name, setName] = useState('');
  const [template, setTemplate] = useState<PoolTemplateKey>('family_pilot');
  const [amount, setAmount] = useState<number>(300);
  const [members, setMembers] = useState<PoolMember[]>([
    { name: 'Custodian', email: 'custodian@example.com', role: 'custodian' },
    { name: 'Contributor A', email: 'a@example.com', role: 'contributor' },
    { name: 'Contributor B', email: 'b@example.com', role: 'contributor' },
  ]);

  const canSubmit = useMemo(
    () => name.trim().length >= 3 && amount > 0 && members.filter(m => m.name.trim() && m.email.trim()).length >= 3,
    [name, amount, members]
  );

  const addMember = () => setMembers(prev => [...prev, { name: '', email: '', role: 'contributor' }]);
  const removeMember = (i: number) => setMembers(prev => prev.filter((_, idx) => idx !== i));

  const updateMember = (i: number, patch: Partial<PoolMember>) => {
    setMembers(prev => prev.map((m, idx) => (idx === i ? { ...m, ...patch } : m)));
  };

  const submit = () => {
    if (!canSubmit) return;

    const pool: PoolDraft = {
      id: uid(),
      name: name.trim(),
      template,
      contributionAmountZar: Number(amount),
      members: members
        .map(m => ({ ...m, name: m.name.trim(), email: m.email.trim() }))
        .filter(m => m.name && m.email),
      createdAt: new Date().toISOString()
    };

    addPool(pool);
    nav(`/agreement/${pool.id}`);
  };

  return (
    <div className="container">
      <div className="grid grid2">
        <Section title="Create a Pool" subtitle="Choose a constitution template and define your members.">
          <div className="grid" style={{ gap: 12 }}>
            <div>
              <label>Pool Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Majokweni Family Reserve" />
            </div>

            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label>Template</label>
                <select value={template} onChange={(e) => setTemplate(e.target.value as PoolTemplateKey)}>
                  <option value="family_pilot">Pilot: Family Emergency & Education (Locked)</option>
                  <option value="community_stokvel">Community Stokvel (Basic)</option>
                </select>
              </div>
              <div>
                <label>Contribution (ZAR / month)</label>
                <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} min={1} />
              </div>
            </div>

            <div>
              <label>Members</label>
              <div className="small">Minimum 3 members for this preview.</div>

              <div className="grid" style={{ marginTop: 10 }}>
                {members.map((m, i) => (
                  <div key={i} className="card" style={{ padding: 12, borderRadius: 14 }}>
                    <div className="grid" style={{ gridTemplateColumns: '1fr 1fr 0.6fr', gap: 10 }}>
                      <input value={m.name} onChange={(e) => updateMember(i, { name: e.target.value })} placeholder="Name" />
                      <input value={m.email} onChange={(e) => updateMember(i, { email: e.target.value })} placeholder="Email" />
                      <select value={m.role} onChange={(e) => updateMember(i, { role: e.target.value as PoolMember['role'] })}>
                        <option value="custodian">Custodian</option>
                        <option value="contributor">Contributor</option>
                        <option value="observer">Observer</option>
                        <option value="successor">Successor</option>
                      </select>
                    </div>
                    <div style={{ marginTop: 10, display: 'flex', justifyContent: 'flex-end' }}>
                      <button className="btn danger" onClick={() => removeMember(i)} disabled={members.length <= 3}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 10 }}>
                <button className="btn secondary" onClick={addMember}>Add member</button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button className="btn" onClick={submit} disabled={!canSubmit}>Generate Agreement</button>
              <button className="btn secondary" onClick={() => nav('/')}>Cancel</button>
            </div>
          </div>
        </Section>

        <Section title="Template Notes" subtitle="What the pilot constitution demonstrates.">
          <div className="grid" style={{ gap: 10 }}>
            <div className="pill">Emergency releases: simple majority vote</div>
            <div className="pill">Education releases: two-thirds vote + 14-day time lock</div>
            <div className="pill">Contribution grace periods + member review flow</div>
            <div className="pill">Succession: cooling period + capped trust recognition</div>
            <div className="pill">Non-custodial: preview uses local storage</div>
          </div>
        </Section>
      </div>
    </div>
  );
}
