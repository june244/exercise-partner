"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { pushupProgram, type PushupDay } from "@/lib/pushup-program";
import {
  getPushupProgress,
  savePushupProgress,
  type PushupProgress,
} from "@/lib/records";

const startGuide = [
  { range: "5회 이하", start: "1주차 시작" },
  { range: "6 ~ 10회", start: "1주차 시작" },
  { range: "11 ~ 20회", start: "1주차 시작" },
  { range: "20회 이상", start: "3주차 시작" },
];

function DayTable({ day, weekIdx }: { day: PushupDay; weekIdx: number }) {
  const totalSets = day.sets[0].length;
  const isLastSetPlus = true; // 마지막 세트는 항상 n+ (이상)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-gray-800 font-black text-sm">{day.day}일차</span>
        <span className="text-gray-400 text-xs">휴식 {day.rest}</span>
      </div>
      <div className="overflow-x-auto -mx-1">
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="text-left text-gray-400 font-semibold py-1.5 px-1 w-14">
                세트
              </th>
              {day.levels.map((level) => (
                <th
                  key={level}
                  className="text-center font-bold py-1.5 px-1"
                  style={{
                    color:
                      weekIdx < 2
                        ? ["#ef4444", "#f59e0b", "#22c55e"][
                            day.levels.indexOf(level)
                          ]
                        : ["#f59e0b", "#3b82f6", "#8b5cf6"][
                            day.levels.indexOf(level)
                          ],
                  }}
                >
                  {level}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: totalSets }, (_, setIdx) => (
              <tr
                key={setIdx}
                className={
                  setIdx % 2 === 0 ? "bg-gray-50" : ""
                }
              >
                <td className="text-gray-500 font-semibold py-1.5 px-1">
                  {setIdx + 1}세트
                </td>
                {day.levels.map((level, levelIdx) => (
                  <td
                    key={level}
                    className="text-center text-gray-700 font-bold py-1.5 px-1"
                  >
                    {day.sets[levelIdx][setIdx]}
                    {isLastSetPlus && setIdx === totalSets - 1 ? "+" : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function getLevelsForWeek(week: number): string[] {
  const w = pushupProgram.find((p) => p.week === week);
  return w ? w.days[0].levels : [];
}

export default function PushupPage() {
  const [openWeek, setOpenWeek] = useState<number | null>(null);
  const [progress, setProgress] = useState<PushupProgress | null>(null);
  const [editing, setEditing] = useState(false);
  const [editWeek, setEditWeek] = useState(1);
  const [editDay, setEditDay] = useState(1);
  const [editLevel, setEditLevel] = useState("");

  useEffect(() => {
    const saved = getPushupProgress();
    if (saved) {
      setProgress(saved);
      setOpenWeek(saved.week);
    }
  }, []);

  function startEdit() {
    if (progress) {
      setEditWeek(progress.week);
      setEditDay(progress.day);
      setEditLevel(progress.level);
    } else {
      setEditWeek(1);
      setEditDay(1);
      const levels = getLevelsForWeek(1);
      setEditLevel(levels[0] || "");
    }
    setEditing(true);
  }

  function saveProgress() {
    const p: PushupProgress = { week: editWeek, day: editDay, level: editLevel };
    savePushupProgress(p);
    setProgress(p);
    setOpenWeek(p.week);
    setEditing(false);
  }

  return (
    <main className="min-h-screen bg-gray-950 pb-10">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <div
          className="px-5 pt-14 pb-10 rounded-b-3xl"
          style={{ background: "linear-gradient(135deg, #f97316, #dc2626)" }}
        >
          <Link
            href="/"
            className="text-white/70 text-sm flex items-center gap-1 mb-6 hover:text-white"
          >
            ← 홈으로
          </Link>
          <div className="text-5xl mb-4">💪</div>
          <h1 className="text-white text-2xl font-black mb-1">푸쉬업 100개</h1>
          <p className="text-orange-200 text-sm">
            6주 완성 · 주 3일 (월수금 or 화목토)
          </p>
        </div>

        {/* 기록 버튼 */}
        <div className="mx-4 -mt-5 mb-4 grid grid-cols-2 gap-2">
          <Link
            href="/pushup/record"
            className="flex items-center justify-center gap-1.5 py-3.5 rounded-2xl text-white font-bold text-sm shadow-lg"
            style={{ background: "linear-gradient(135deg, #f97316, #dc2626)" }}
          >
            ✏️ 오늘 기록
          </Link>
          <Link
            href="/pushup/history"
            className="flex items-center justify-center gap-1.5 py-3.5 rounded-2xl font-bold text-sm"
            style={{ background: "#1f2937", color: "#9ca3af" }}
          >
            📊 기록 보기
          </Link>
        </div>

        {/* 진행 상황 카드 */}
        <div className="mx-4 bg-white rounded-2xl shadow-xl p-5 mb-4">
          <h2 className="font-black text-gray-800 mb-3 text-sm">📍 현재 진행 상황</h2>
          {editing ? (
            <div className="space-y-4">
              {/* 주차 스테퍼 */}
              <div>
                <p className="text-gray-400 text-xs font-semibold mb-2">주차</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      const nw = Math.max(1, editWeek - 1);
                      setEditWeek(nw);
                      const levels = getLevelsForWeek(nw);
                      if (!levels.includes(editLevel)) setEditLevel(levels[0] || "");
                    }}
                    className="w-9 h-9 rounded-full font-black text-lg flex items-center justify-center bg-gray-100 text-gray-600"
                  >
                    −
                  </button>
                  <span className="text-xl font-black text-gray-800">{editWeek}주차</span>
                  <button
                    onClick={() => {
                      const nw = Math.min(6, editWeek + 1);
                      setEditWeek(nw);
                      const levels = getLevelsForWeek(nw);
                      if (!levels.includes(editLevel)) setEditLevel(levels[0] || "");
                    }}
                    className="w-9 h-9 rounded-full font-black text-lg flex items-center justify-center"
                    style={{ background: "#fff7ed", color: "#f97316" }}
                  >
                    +
                  </button>
                </div>
              </div>
              {/* 일차 스테퍼 */}
              <div>
                <p className="text-gray-400 text-xs font-semibold mb-2">일차</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setEditDay((d) => Math.max(1, d - 1))}
                    className="w-9 h-9 rounded-full font-black text-lg flex items-center justify-center bg-gray-100 text-gray-600"
                  >
                    −
                  </button>
                  <span className="text-xl font-black text-gray-800">{editDay}일차</span>
                  <button
                    onClick={() => setEditDay((d) => Math.min(3, d + 1))}
                    className="w-9 h-9 rounded-full font-black text-lg flex items-center justify-center"
                    style={{ background: "#fff7ed", color: "#f97316" }}
                  >
                    +
                  </button>
                </div>
              </div>
              {/* 레벨 칩 */}
              <div>
                <p className="text-gray-400 text-xs font-semibold mb-2">레벨</p>
                <div className="flex flex-wrap gap-2">
                  {getLevelsForWeek(editWeek).map((lv) => (
                    <button
                      key={lv}
                      onClick={() => setEditLevel(lv)}
                      className="px-3 py-1.5 rounded-full text-xs font-bold border transition-colors"
                      style={
                        editLevel === lv
                          ? { background: "#f97316", color: "#fff", borderColor: "#f97316" }
                          : { background: "#fff", color: "#6b7280", borderColor: "#e5e7eb" }
                      }
                    >
                      {lv}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setEditing(false)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-bold text-gray-500 bg-gray-100"
                >
                  취소
                </button>
                <button
                  onClick={saveProgress}
                  className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white"
                  style={{ background: "#f97316" }}
                >
                  저장
                </button>
              </div>
            </div>
          ) : progress ? (
            <div className="flex items-center justify-between">
              <p className="text-gray-700 font-bold text-sm">
                {progress.week}주차 · {progress.day}일차 · {progress.level}
              </p>
              <button
                onClick={startEdit}
                className="text-xs font-bold px-3 py-1.5 rounded-lg"
                style={{ background: "#fff7ed", color: "#f97316" }}
              >
                변경
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-sm">현재 진행 주차를 설정하세요</p>
              <button
                onClick={startEdit}
                className="text-xs font-bold text-white px-3 py-1.5 rounded-lg"
                style={{ background: "#f97316" }}
              >
                설정
              </button>
            </div>
          )}
        </div>

        {/* Start guide card */}
        <div className="mx-4 bg-white rounded-2xl shadow-xl p-5 mb-5">
          <h2 className="font-black text-gray-800 mb-1">📋 시작 전 테스트</h2>
          <p className="text-gray-500 text-xs mb-4">
            정자세 연속 횟수로 시작 주차를 결정하세요
          </p>
          <div className="grid grid-cols-2 gap-2">
            {startGuide.map((g) => (
              <div
                key={g.range}
                className="bg-orange-50 rounded-xl p-3 border border-orange-100"
              >
                <div className="text-orange-600 font-bold text-sm">
                  {g.range}
                </div>
                <div className="text-gray-600 text-xs mt-0.5">{g.start}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 bg-gray-50 rounded-xl p-3 text-xs text-gray-500 leading-relaxed">
            💡 다음 주차 진행이 어려우면 전 주 반복 · 통증 시 회복 후 재개
          </div>
        </div>

        {/* Week accordion */}
        <div className="px-4 space-y-3">
          {pushupProgram.map((w, weekIdx) => {
            const isOpen = openWeek === w.week;
            return (
              <div
                key={w.week}
                className="bg-white rounded-2xl shadow overflow-hidden"
              >
                <button
                  className="w-full text-left p-5 flex items-center justify-between"
                  onClick={() => setOpenWeek(isOpen ? null : w.week)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center font-black text-white text-sm flex-shrink-0"
                      style={{ background: w.badgeColor }}
                    >
                      {w.week}주
                    </div>
                    <div>
                      <div className="font-black text-gray-800">
                        {w.week}주차
                      </div>
                      <div
                        className="text-xs font-semibold"
                        style={{ color: w.badgeColor }}
                      >
                        {w.badge}
                      </div>
                    </div>
                  </div>
                  <span className="text-gray-300 text-sm font-bold">
                    {isOpen ? "▲" : "▼"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-3">
                    {w.target && (
                      <div className="bg-blue-50 text-blue-700 text-xs rounded-xl px-3 py-2 font-semibold">
                        ✅ {w.target}
                      </div>
                    )}
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {w.description}
                    </p>

                    {/* Day tables */}
                    <div className="space-y-4">
                      {w.days.map((day) => (
                        <div
                          key={day.day}
                          className="bg-gray-50 rounded-xl p-3"
                        >
                          <DayTable day={day} weekIdx={weekIdx} />
                        </div>
                      ))}
                    </div>

                    {w.milestone && (
                      <div className="bg-green-50 text-green-700 text-xs rounded-xl px-4 py-3 font-semibold">
                        🏆 {w.milestone}
                      </div>
                    )}
                    {w.tip && (
                      <div className="bg-yellow-50 text-yellow-700 text-xs rounded-xl px-4 py-3 leading-relaxed">
                        💡 {w.tip}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Source */}
        <div className="text-center mt-8 px-4">
          <a
            href="https://blog.naver.com/ordinaryfit/222956705720"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-600 underline"
          >
            원본 포스트 보기 (보통사람 운동채널)
          </a>
        </div>
      </div>
    </main>
  );
}
