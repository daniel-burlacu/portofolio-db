// /lib/qaLocal.ts
export type QA = { q: string; a: string; ts: number };
const KEY = 'qa_history_v1';
const MAX = 1000;

export function loadQA(): QA[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as QA[]) : [];
  } catch {
    return [];
  }
}

export function saveQA(entry: QA) {
  const list = loadQA();
  list.push(entry);
  if (list.length > MAX) list.splice(0, list.length - MAX);
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function exportQA(): string {
  return JSON.stringify(loadQA(), null, 2);
}

export function importQA(json: string) {
  const parsed = JSON.parse(json) as QA[];
  localStorage.setItem(KEY, JSON.stringify(parsed));
}
