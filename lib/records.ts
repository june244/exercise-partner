export type SetRecord = {
  reps: number;
  restSeconds: number; // 세트 후 휴식(초), 마지막 세트는 0
};

export type WorkoutRecord = {
  id: string;
  date: string; // "YYYY-MM-DD"
  sets: SetRecord[];
  maxConsecutive?: number; // 푸쉬업 전용
};

const PUSHUP_KEY = "exercise-pushup-records";
const ROLLOUT_KEY = "exercise-rollout-records";

function load(key: string): WorkoutRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save(key: string, records: WorkoutRecord[]): void {
  localStorage.setItem(key, JSON.stringify(records));
}

// ── 푸쉬업 ──────────────────────────────────────
export function getPushupRecords(): WorkoutRecord[] {
  return load(PUSHUP_KEY);
}

export function savePushupRecord(record: WorkoutRecord): void {
  const records = load(PUSHUP_KEY);
  const idx = records.findIndex((r) => r.id === record.id);
  if (idx >= 0) records[idx] = record;
  else records.unshift(record);
  save(PUSHUP_KEY, records);
}

export function deletePushupRecord(id: string): void {
  save(PUSHUP_KEY, load(PUSHUP_KEY).filter((r) => r.id !== id));
}

// ── 롤아웃 ──────────────────────────────────────
export function getRolloutRecords(): WorkoutRecord[] {
  return load(ROLLOUT_KEY);
}

export function saveRolloutRecord(record: WorkoutRecord): void {
  const records = load(ROLLOUT_KEY);
  const idx = records.findIndex((r) => r.id === record.id);
  if (idx >= 0) records[idx] = record;
  else records.unshift(record);
  save(ROLLOUT_KEY, records);
}

export function deleteRolloutRecord(id: string): void {
  save(ROLLOUT_KEY, load(ROLLOUT_KEY).filter((r) => r.id !== id));
}

// ── 유틸 ────────────────────────────────────────
export function today(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-");
  return `${y}.${m}.${d}`;
}

export function formatRestTime(seconds: number): string {
  if (seconds === 0) return "-";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}초`;
  return `${m}분 ${String(s).padStart(2, "0")}초`;
}

export function formatTimerDisplay(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
