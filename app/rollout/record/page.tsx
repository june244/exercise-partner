"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  today,
  saveRolloutRecord,
  formatTimerDisplay,
  type SetRecord,
} from "@/lib/records";

const ACCENT = "#14b8a6";
const ACCENT_BG = "#f0fdfa";

function Stepper({
  value,
  onDec,
  onInc,
  unit,
}: {
  value: number;
  onDec: () => void;
  onInc: () => void;
  unit: string;
}) {
  return (
    <div className="flex items-center justify-between flex-1">
      <button
        onClick={onDec}
        className="w-11 h-11 rounded-full font-black text-xl flex items-center justify-center"
        style={{ background: "#f3f4f6", color: "#374151" }}
      >
        −
      </button>
      <div className="text-center">
        <span className="text-3xl font-black text-gray-800">{value}</span>
        <span className="text-gray-400 text-sm ml-1">{unit}</span>
      </div>
      <button
        onClick={onInc}
        className="w-11 h-11 rounded-full font-black text-xl flex items-center justify-center"
        style={{ background: ACCENT_BG, color: ACCENT }}
      >
        +
      </button>
    </div>
  );
}

export default function RolloutRecordPage() {
  const router = useRouter();
  const [date, setDate] = useState(today());
  const [sets, setSets] = useState<SetRecord[]>([{ reps: 10, restSeconds: 60 }]);
  const [activeTimer, setActiveTimer] = useState<number | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(0);

  useEffect(() => {
    if (activeTimer === null) return;
    const id = setInterval(() => setTimerSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [activeTimer]);

  function startTimer(idx: number) {
    setActiveTimer(idx);
    setTimerSeconds(0);
  }

  function stopTimer(idx: number) {
    setSets((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, restSeconds: timerSeconds } : s))
    );
    setActiveTimer(null);
    setTimerSeconds(0);
  }

  function updateReps(idx: number, delta: number) {
    setSets((prev) =>
      prev.map((s, i) =>
        i === idx ? { ...s, reps: Math.max(0, s.reps + delta) } : s
      )
    );
  }

  function updateRest(idx: number, delta: number) {
    setSets((prev) =>
      prev.map((s, i) =>
        i === idx
          ? { ...s, restSeconds: Math.max(0, s.restSeconds + delta) }
          : s
      )
    );
  }

  function addSet() {
    setSets((prev) => [...prev, { reps: 10, restSeconds: 60 }]);
  }

  function removeSet(idx: number) {
    if (sets.length <= 1) return;
    if (activeTimer === idx) {
      setActiveTimer(null);
      setTimerSeconds(0);
    }
    setSets((prev) => prev.filter((_, i) => i !== idx));
  }

  function handleSave() {
    saveRolloutRecord({
      id: Date.now().toString(),
      date,
      sets,
    });
    router.push("/rollout/history");
  }

  return (
    <main className="min-h-screen bg-gray-950 pb-12">
      <div className="max-w-sm mx-auto">
        {/* 헤더 */}
        <div
          className="px-5 pt-14 pb-10 rounded-b-3xl"
          style={{ background: "linear-gradient(135deg, #14b8a6, #2563eb)" }}
        >
          <Link
            href="/rollout"
            className="text-white/70 text-sm mb-6 block hover:text-white"
          >
            ← 루틴으로
          </Link>
          <div className="text-4xl mb-3">📝</div>
          <h1 className="text-white text-2xl font-black">기록 입력</h1>
          <p className="text-teal-200 text-sm">AB슬라이드 복근 프로젝트</p>
        </div>

        <div className="px-4 pt-4 space-y-3">
          {/* 날짜 */}
          <div className="bg-white rounded-2xl p-5">
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-3">
              날짜
            </p>
            <input
              type="date"
              value={date}
              max={today()}
              onChange={(e) => setDate(e.target.value)}
              className="w-full text-gray-800 font-bold text-lg outline-none"
            />
          </div>

          {/* 세트 목록 */}
          {sets.map((set, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5">
              <div className="flex justify-between items-center mb-4">
                <span className="font-black text-gray-800 text-base">
                  {idx + 1}세트
                </span>
                {sets.length > 1 && (
                  <button
                    onClick={() => removeSet(idx)}
                    className="text-red-400 text-xs font-semibold px-2 py-1 rounded-lg"
                    style={{ background: "#fff1f2" }}
                  >
                    삭제
                  </button>
                )}
              </div>

              <p className="text-gray-400 text-xs font-semibold mb-3">횟수</p>
              <Stepper
                value={set.reps}
                onDec={() => updateReps(idx, -1)}
                onInc={() => updateReps(idx, 1)}
                unit="개"
              />

              <div className="mt-5 pt-4 border-t border-gray-100">
                <p className="text-gray-400 text-xs font-semibold mb-3">
                  세트 후 휴식 시간
                </p>

                {activeTimer === idx ? (
                  <div
                    className="flex items-center justify-between rounded-2xl px-5 py-4"
                    style={{ background: ACCENT_BG }}
                  >
                    <div>
                      <p className="text-xs font-semibold" style={{ color: ACCENT }}>
                        쉬는 중…
                      </p>
                      <p
                        className="text-3xl font-black tabular-nums"
                        style={{ color: ACCENT }}
                      >
                        {formatTimerDisplay(timerSeconds)}
                      </p>
                    </div>
                    <button
                      onClick={() => stopTimer(idx)}
                      className="text-white font-bold px-4 py-2 rounded-xl text-sm"
                      style={{ background: ACCENT }}
                    >
                      완료
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <Stepper
                        value={set.restSeconds}
                        onDec={() => updateRest(idx, -5)}
                        onInc={() => updateRest(idx, 5)}
                        unit="초"
                      />
                    </div>
                    <button
                      onClick={() => startTimer(idx)}
                      className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl text-lg font-bold flex-shrink-0"
                      style={{ background: ACCENT_BG, color: ACCENT }}
                    >
                      ⏱
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          <button
            onClick={addSet}
            className="w-full bg-gray-900 border border-gray-800 text-gray-400 rounded-2xl py-4 font-bold text-sm"
          >
            + 세트 추가
          </button>

          <button
            onClick={handleSave}
            className="w-full text-white rounded-2xl py-5 font-black text-lg shadow-lg"
            style={{ background: "linear-gradient(135deg, #14b8a6, #2563eb)" }}
          >
            저장하기
          </button>
        </div>
      </div>
    </main>
  );
}
