export type SetRecord = {
  reps: number;
  restSeconds: number; // 세트 후 휴식(초), 마지막 세트는 0
};

export type WorkoutRecord = {
  id: string;
  date: string; // "YYYY-MM-DD"
  sets: SetRecord[];
  maxConsecutive?: number; // 푸쉬업 전용
  memo?: string;
};

export type PushupProgress = {
  week: number; // 1-6
  day: number; // 1-3
  level: string; // e.g. "<5", "6-10", "11-20"
};

export type RolloutProgress = {
  week: number; // 1-4
  day: string; // "월"~"토"
};

const PUSHUP_KEY = "exercise-pushup-records";
const ROLLOUT_KEY = "exercise-rollout-records";
const PUSHUP_PROGRESS_KEY = "exercise-pushup-progress";
const ROLLOUT_PROGRESS_KEY = "exercise-rollout-progress";

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

// ── 진행 상황 ──────────────────────────────────
export function getPushupProgress(): PushupProgress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PUSHUP_PROGRESS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function savePushupProgress(progress: PushupProgress): void {
  localStorage.setItem(PUSHUP_PROGRESS_KEY, JSON.stringify(progress));
}

export function getRolloutProgress(): RolloutProgress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ROLLOUT_PROGRESS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveRolloutProgress(progress: RolloutProgress): void {
  localStorage.setItem(ROLLOUT_PROGRESS_KEY, JSON.stringify(progress));
}

export function advancePushupProgress(): void {
  const p = getPushupProgress();
  if (!p) return;
  if (p.day < 3) {
    savePushupProgress({ ...p, day: p.day + 1 });
  } else if (p.week < 6) {
    savePushupProgress({ ...p, week: p.week + 1, day: 1 });
  }
  // week 6 day 3 → 완료 상태, 변경 없음
}

const ROLLOUT_DAYS = ["월", "화", "수", "목", "금", "토"];

export function advanceRolloutProgress(): void {
  const p = getRolloutProgress();
  if (!p) return;
  const idx = ROLLOUT_DAYS.indexOf(p.day);
  if (idx < ROLLOUT_DAYS.length - 1) {
    saveRolloutProgress({ ...p, day: ROLLOUT_DAYS[idx + 1] });
  } else if (p.week < 4) {
    saveRolloutProgress({ week: p.week + 1, day: "월" });
  }
  // week 4 토 → 완료 상태, 변경 없음
}
