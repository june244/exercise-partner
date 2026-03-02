"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  today,
  savePushupRecord,
  getPushupProgress,
  advancePushupProgress,
  formatTimerDisplay,
  type SetRecord,
  type PushupProgress,
} from "@/lib/records";
import { pushupProgram } from "@/lib/pushup-program";

const ACCENT = "#f97316";
const ACCENT_BG = "#fff7ed";

function Stepper({
  value,
  onDec,
  onInc,
  unit,
  decStep = 1,
}: {
  value: number;
  onDec: () => void;
  onInc: () => void;
  unit: string;
  decStep?: number;
}) {
  void decStep;
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

export default function PushupRecordPage() {
  const router = useRouter();
  const [date, setDate] = useState(today());
  const [maxConsecutive, setMaxConsecutive] = useState(0);
  const [sets, setSets] = useState<SetRecord[]>([{ reps: 10, restSeconds: 60 }]);
  const [memo, setMemo] = useState("");
  const [progress, setProgress] = useState<PushupProgress | null>(null);
  const [activeTimer, setActiveTimer] = useState<number | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(0);

  useEffect(() => {
    const p = getPushupProgress();
    setProgress(p);
    if (p) {
      const week = pushupProgram.find((w) => w.week === p.week);
      if (week) {
        const day = week.days[p.day - 1];
        if (day) {
          const levelIdx = day.levels.indexOf(p.level);
          if (levelIdx >= 0) {
            const repsArr = day.sets[levelIdx];
            const restSec = parseInt(day.rest) || 60;
            setSets(repsArr.map((r) => ({ reps: r, restSeconds: restSec })));
          }
        }
      }
    }
  }, []);

  // 타이머 틱
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
    const record = {
      id: Date.now().toString(),
      date,
      sets,
      maxConsecutive: maxConsecutive > 0 ? maxConsecutive : undefined,
      memo: memo.trim() || undefined,
    };
    savePushupRecord(record);
    advancePushupProgress();
    router.push("/pushup/history");
  }

  return (
    <main className="min-h-screen bg-gray-950 pb-12">
      <div className="max-w-sm mx-auto">
        {/* 헤더 */}
        <div
          className="px-5 pt-14 pb-10 rounded-b-3xl"
          style={{ background: "linear-gradient(135deg, #f97316, #dc2626)" }}
        >
          <Link
            href="/pushup"
            className="text-white/70 text-sm mb-6 block hover:text-white"
          >
            ← 루틴으로
          </Link>
          <div className="text-4xl mb-3">📝</div>
          <h1 className="text-white text-2xl font-black">기록 입력</h1>
          <p className="text-orange-200 text-sm">푸쉬업 100개 프로젝트</p>
          {progress && (
            <div className="mt-3 inline-block bg-white/20 backdrop-blur-sm rounded-xl px-3 py-1.5">
              <span className="text-white text-sm font-bold">
                {progress.week}주차 · {progress.day}일차 · {progress.level}
              </span>
            </div>
          )}
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

          {/* 최대 연속 횟수 */}
          <div className="bg-white rounded-2xl p-5">
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-1">
              최대 연속 횟수
            </p>
            <p className="text-gray-400 text-xs mb-4">
              오늘 한 번에 최대로 한 횟수 (선택 사항)
            </p>
            <Stepper
              value={maxConsecutive}
              onDec={() => setMaxConsecutive((v) => Math.max(0, v - 1))}
              onInc={() => setMaxConsecutive((v) => v + 1)}
              unit="개"
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

              {/* 횟수 */}
              <p className="text-gray-400 text-xs font-semibold mb-3">횟수</p>
              <Stepper
                value={set.reps}
                onDec={() => updateReps(idx, -1)}
                onInc={() => updateReps(idx, 1)}
                unit="개"
              />

              {/* 휴식 */}
              <div className="mt-5 pt-4 border-t border-gray-100">
                <p className="text-gray-400 text-xs font-semibold mb-3">
                  세트 후 휴식 시간
                </p>

                {activeTimer === idx ? (
                  /* 타이머 실행 중 */
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
                  /* 수동 입력 + 타이머 버튼 */
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <Stepper
                        value={set.restSeconds}
                        onDec={() => updateRest(idx, -5)}
                        onInc={() => updateRest(idx, 5)}
                        unit="초"
                        decStep={5}
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

          {/* 세트 추가 */}
          <button
            onClick={addSet}
            className="w-full bg-gray-900 border border-gray-800 text-gray-400 rounded-2xl py-4 font-bold text-sm"
          >
            + 세트 추가
          </button>

          {/* 메모 */}
          <div className="bg-white rounded-2xl p-5">
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-3">
              메모
            </p>
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="오늘 운동은 어땠나요? (선택사항)"
              rows={3}
              className="w-full text-gray-800 text-sm outline-none resize-none leading-relaxed"
            />
          </div>

          {/* 저장 */}
          <button
            onClick={handleSave}
            className="w-full text-white rounded-2xl py-5 font-black text-lg shadow-lg"
            style={{ background: "linear-gradient(135deg, #f97316, #dc2626)" }}
          >
            저장하기
          </button>
        </div>
      </div>
    </main>
  );
}
