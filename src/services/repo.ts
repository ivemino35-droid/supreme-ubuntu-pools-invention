import { PoolDraft } from '../types/pool';

const KEY = 'ubuntu_pools_pilot_state_v1';

export interface AppState {
  pools: PoolDraft[];
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { pools: [] };
    const parsed = JSON.parse(raw) as AppState;
    return { pools: Array.isArray(parsed.pools) ? parsed.pools : [] };
  } catch {
    return { pools: [] };
  }
}

export function saveState(state: AppState): void {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function addPool(pool: PoolDraft): PoolDraft {
  const state = loadState();
  const next: AppState = { pools: [pool, ...state.pools] };
  saveState(next);
  return pool;
}

export function getPool(id: string): PoolDraft | null {
  const state = loadState();
  return state.pools.find(p => p.id === id) || null;
}
