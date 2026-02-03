import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Section from '../components/Section';
import { getPool } from '../services/repo';

type WithdrawalType = 'emergency' | 'education';

interface WithdrawalRequest {
  id: string;
  type: WithdrawalType;
  amount: number;
  reason: string;
  approvalsRequired: number;
  approvals: number;
  status: 'PENDING' | 'APPROVED';
  createdAt: string;
}

function wid() {
  return 'wd_' + Math.random().toString(36).slice(2) + '_' + Date.now().toString(36);
}

export default function Pool() {
  const { id } = useParams();
  const pool = id ? getPool(id) : null;

  const [requests, setRequests] = useState<WithdrawalRequest[]>([]);
  const [type, setType] = useState<WithdrawalType>('emergency');
  const [amount, setAmount] = useState<number>(250);
  const [reason, setReason] = useState<string>('');

  const approvalsRequired = useMemo(() => {
    const n = Math.max(1, pool?.members.filter(m => m.role !== 'observer').length || 3);
    if (type === 'emergency') return Math.floor(n / 2) + 1;
    return Math.ceil((2 * n) / 3);
  }, [pool, type]);

  const createRequest = () => {
    if (!pool) return;
    if (!amount || amount <= 0) return;
    const req: WithdrawalRequest = {
      id: wid(),
      type,
      amount,
      reason: reason.trim() || (type === 'emergency' ? 'Emergency support' : 'Education milestone'),
      approvalsRequired,
      approvals: 0,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };
    setRequests(prev => [req, ...prev]);
    setReason('');
  };

  const approve = (rid: string) => {
    setRequests(prev => prev.map(r => {
      if (r.id !== rid || r.status !== 'PENDING') return r;
      const approvals = r.approvals + 1;
      const status = approvals >= r.approvalsRequired ? 'APPROVED' : 'PENDING';
      return { ...r, approvals, status };
    }));
  };

  return (
    <div className="container">
      <div className="grid grid2">
        <Section title="Pool Details" subtitle="Governance + requests (preview).">
          <div style={{ fontWeight: 950, fontSize: 18 }}>{pool?.name || 'Unknown Pool'}</div>
          <div className="kv" style={{ marginTop: 10 }}>
            <div><div style={{ fontWeight: 900 }}>Members</div><div className="small">{pool?.members.length || 0}</div></div>
            <div><div style={{ fontWeight: 900 }}>Contribution</div><div className="small">R {pool?.contributionAmountZar.toFixed(0)} / month</div></div>
            <div><div style={{ fontWeight: 900 }}>Template</div><div className="small">{pool?.template}</div></div>
          </div>
          <hr />
          <div className="grid" style={{ gap: 10 }}>
            <div>
              <label>Withdrawal Type</label>
              <select value={type} onChange={(e) => setType(e.target.value as WithdrawalType)}>
                <option value="emergency">Emergency Release</option>
                <option value="education">Education Milestone</option>
              </select>
            </div>
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label>Amount</label>
                <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
              </div>
              <div>
                <label>Approvals Required</label>
                <input value={approvalsRequired} readOnly />
              </div>
            </div>
            <div>
              <label>Reason</label>
              <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason" />
            </div>
            <button className="btn" onClick={createRequest}>Create Request (Demo)</button>
          </div>
        </Section>

        <Section title="Requests" subtitle="Approve until quorum is reached (demo).">
          {requests.length === 0 ? (
            <div className="pill">No requests yet</div>
          ) : (
            <div className="grid" style={{ gap: 10 }}>
              {requests.map(r => (
                <div key={r.id} className="card" style={{ padding: 12, borderRadius: 14 }}>
                  <div className="hrow">
                    <div style={{ fontWeight: 950 }}>{r.type.toUpperCase()} • {r.status}</div>
                    <div className="pill">R {r.amount.toFixed(0)}</div>
                  </div>
                  <div className="small" style={{ marginTop: 6 }}>{r.reason}</div>
                  <div className="small" style={{ marginTop: 6 }}>Approvals: {r.approvals}/{r.approvalsRequired}</div>
                  <div style={{ marginTop: 10 }}>
                    <button className="btn secondary" onClick={() => approve(r.id)} disabled={r.status !== 'PENDING'}>Approve (Demo)</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Section>
      </div>
    </div>
  );
}
