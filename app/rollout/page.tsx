"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { rolloutProgram, rolloutBonus } from "@/lib/rollout-program";
import {
  getRolloutProgress,
  saveRolloutProgress,
  type RolloutProgress,
} from "@/lib/records";

const levelColors = ["#14b8a6", "#3b82f6", "#8b5cf6", "#ec4899"];

const DAYS = ["월", "화", "수", "목", "금", "토"];

export default function RolloutPage() {
  const [openWeek, setOpenWeek] = useState<number | null>(null);
  const [progress, setProgress] = useState<RolloutProgress | null>(null);
  const [editing, setEditing] = useState(false);
  const [editWeek, setEditWeek] = useState(1);
  const [editDay, setEditDay] = useState("월");

  useEffect(() => {
    const saved = getRolloutProgress();
    if (saved) {
      setProgress(saved);
      setOpenWeek(saved.week);
    }
  }, []);

  function startEdit() {
    if (progress) {
      setEditWeek(progress.week);
      setEditDay(progress.day);
    } else {
      setEditWeek(1);
      setEditDay("월");
    }
    setEditing(true);
  }

  function saveProgress() {
    const p: RolloutProgress = { week: editWeek, day: editDay };
    saveRolloutProgress(p);
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
          style={{ background: "linear-gradient(135deg, #14b8a6, #2563eb)" }}
        >
          <Link
            href="/"
            className="text-white/70 text-sm flex items-center gap-1 mb-6 hover:text-white"
          >
            ← 홈으로
          </Link>
          <div className="text-5xl mb-4">🔥</div>
          <h1 className="text-white text-2xl font-black mb-1">
            AB슬라이드 복근
          </h1>
          <p className="text-teal-200 text-sm">
            4주 완성 · 뱃살 감소 + 복근 형성
          </p>
        </div>

        {/* 기록 버튼 */}
        <div className="mx-4 -mt-5 mb-4 grid grid-cols-2 gap-2">
          <Link
            href="/rollout/record"
            className="flex items-center justify-center gap-1.5 py-3.5 rounded-2xl text-white font-bold text-sm shadow-lg"
            style={{ background: "linear-gradient(135deg, #14b8a6, #2563eb)" }}
          >
            ✏️ 오늘 기록
          </Link>
          <Link
            href="/rollout/history"
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
                    onClick={() => setEditWeek((w) => Math.max(1, w - 1))}
                    className="w-9 h-9 rounded-full font-black text-lg flex items-center justify-center bg-gray-100 text-gray-600"
                  >
                    −
                  </button>
                  <span className="text-xl font-black text-gray-800">{editWeek}주차</span>
                  <button
                    onClick={() => setEditWeek((w) => Math.min(4, w + 1))}
                    className="w-9 h-9 rounded-full font-black text-lg flex items-center justify-center"
                    style={{ background: "#f0fdfa", color: "#14b8a6" }}
                  >
                    +
                  </button>
                </div>
              </div>
              {/* 요일 칩 */}
              <div>
                <p className="text-gray-400 text-xs font-semibold mb-2">요일</p>
                <div className="flex flex-wrap gap-2">
                  {DAYS.map((d) => (
                    <button
                      key={d}
                      onClick={() => setEditDay(d)}
                      className="px-3 py-1.5 rounded-full text-xs font-bold border transition-colors"
                      style={
                        editDay === d
                          ? { background: "#14b8a6", color: "#fff", borderColor: "#14b8a6" }
                          : { background: "#fff", color: "#6b7280", borderColor: "#e5e7eb" }
                      }
                    >
                      {d}
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
                  style={{ background: "#14b8a6" }}
                >
                  저장
                </button>
              </div>
            </div>
          ) : progress ? (
            <div className="flex items-center justify-between">
              <p className="text-gray-700 font-bold text-sm">
                {progress.week}주차 · {progress.day}요일
              </p>
              <button
                onClick={startEdit}
                className="text-xs font-bold px-3 py-1.5 rounded-lg"
                style={{ background: "#f0fdfa", color: "#14b8a6" }}
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
                style={{ background: "#14b8a6" }}
              >
                설정
              </button>
            </div>
          )}
        </div>

        {/* Intro card */}
        <div className="mx-4 bg-white rounded-2xl shadow-xl p-5 mb-5">
          <h2 className="font-black text-gray-800 mb-2">📋 프로그램 소개</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            롤아웃(AB슬라이드) 동작으로 4주 만에 뱃살을 빼고 복근을 만드는
            루틴. 레벨이 단계적으로 상승해 초보자도 안전하게 시작 가능.
          </p>
          <div className="mt-3 bg-teal-50 text-teal-700 text-xs rounded-xl p-3 leading-relaxed">
            💡 스프링 없는 AB슬라이드가 복근에 더 강한 자극을 줍니다
          </div>
        </div>

        {/* Level overview */}
        <div className="px-4 mb-5">
          <div className="grid grid-cols-2 gap-2">
            {rolloutProgram.map((w, i) => (
              <div
                key={w.week}
                className="rounded-xl p-3"
                style={{
                  background: `${levelColors[i]}18`,
                  border: `1px solid ${levelColors[i]}40`,
                }}
              >
                <div
                  className="font-black text-xs mb-1"
                  style={{ color: levelColors[i] }}
                >
                  {w.week}주차 · {w.level}
                </div>
                <div className="text-gray-600 text-xs">{w.levelName}</div>
              </div>
            ))}
            {/* 4주차 (Level 2→3 반복) */}
            <div
              className="rounded-xl p-3"
              style={{
                background: `${levelColors[3]}18`,
                border: `1px solid ${levelColors[3]}40`,
              }}
            >
              <div
                className="font-black text-xs mb-1"
                style={{ color: levelColors[3] }}
              >
                4주차 · Level 4
              </div>
              <div className="text-gray-600 text-xs">
                Level 2 → Level 3 반복
              </div>
            </div>
          </div>
        </div>

        {/* Week accordion */}
        <div className="px-4 space-y-3">
          {rolloutProgram.map((w, i) => {
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
                      className="w-11 h-11 rounded-full flex items-center justify-center font-black text-white text-xs flex-shrink-0"
                      style={{ background: w.badgeColor }}
                    >
                      {w.week}주
                    </div>
                    <div>
                      <div className="font-black text-gray-800">
                        {w.week}주차 · {w.level}
                      </div>
                      <div
                        className="text-xs font-semibold"
                        style={{ color: w.badgeColor }}
                      >
                        {w.levelName}
                      </div>
                    </div>
                  </div>
                  <span className="text-gray-300 text-sm font-bold">
                    {isOpen ? "▲" : "▼"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-3">
                    <span
                      className="inline-block text-white text-xs font-bold px-3 py-1 rounded-full"
                      style={{ background: w.badgeColor }}
                    >
                      {w.badge}
                    </span>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {w.description}
                    </p>

                    {/* Day schedule table */}
                    <div className="bg-gray-50 rounded-xl p-3">
                      <table className="w-full text-xs">
                        <thead>
                          <tr>
                            <th className="text-left text-gray-400 font-semibold py-1.5 px-1">
                              요일
                            </th>
                            <th className="text-center text-gray-400 font-semibold py-1.5 px-1">
                              횟수
                            </th>
                            <th className="text-center text-gray-400 font-semibold py-1.5 px-1">
                              휴식시간
                            </th>
                            <th className="text-center text-gray-400 font-semibold py-1.5 px-1">
                              세트
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {w.days.map((d, idx) => (
                            <tr
                              key={d.day}
                              className={idx % 2 === 0 ? "bg-white" : ""}
                            >
                              <td className="py-2 px-1 font-bold text-gray-700">
                                {d.day}
                              </td>
                              <td
                                className="py-2 px-1 text-center font-black"
                                style={{ color: levelColors[i] }}
                              >
                                {d.reps}회
                              </td>
                              <td className="py-2 px-1 text-center text-gray-500">
                                {d.restSeconds}초
                              </td>
                              <td className="py-2 px-1 text-center text-gray-500">
                                {d.sets}세트
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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

          {/* 4주차 카드 */}
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <button
              className="w-full text-left p-5 flex items-center justify-between"
              onClick={() => setOpenWeek(openWeek === 4 ? null : 4)}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center font-black text-white text-xs flex-shrink-0"
                  style={{ background: levelColors[3] }}
                >
                  4주
                </div>
                <div>
                  <div className="font-black text-gray-800">
                    4주차 · Level 4
                  </div>
                  <div
                    className="text-xs font-semibold"
                    style={{ color: levelColors[3] }}
                  >
                    Level 2 → Level 3 반복
                  </div>
                </div>
              </div>
              <span className="text-gray-300 text-sm font-bold">
                {openWeek === 4 ? "▲" : "▼"}
              </span>
            </button>

            {openWeek === 4 && (
              <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-3">
                <span
                  className="inline-block text-white text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: levelColors[3] }}
                >
                  최대 자극
                </span>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Level 2 (벽없이 · 무릎대고) 로 워밍업을 충분히 한 뒤, Level 3
                  (벽 가까이 · 무릎펴고) 로 본 세트를 진행. 롤아웃으로 얻을 수
                  있는 복근 자극을 최대치로 끌어올립니다.
                </p>

                <div className="bg-gray-50 rounded-xl p-3 space-y-3">
                  <div>
                    <div
                      className="text-xs font-black mb-2"
                      style={{ color: levelColors[1] }}
                    >
                      워밍업 — Level 2 (벽 없이 · 무릎 대고)
                    </div>
                    <table className="w-full text-xs">
                      <thead>
                        <tr>
                          <th className="text-left text-gray-400 font-semibold py-1 px-1">
                            요일
                          </th>
                          <th className="text-center text-gray-400 font-semibold py-1 px-1">
                            횟수
                          </th>
                          <th className="text-center text-gray-400 font-semibold py-1 px-1">
                            휴식
                          </th>
                          <th className="text-center text-gray-400 font-semibold py-1 px-1">
                            세트
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {rolloutProgram[1].days.map((d, idx) => (
                          <tr
                            key={d.day}
                            className={idx % 2 === 0 ? "bg-white" : ""}
                          >
                            <td className="py-1.5 px-1 font-bold text-gray-700">
                              {d.day}
                            </td>
                            <td
                              className="py-1.5 px-1 text-center font-black"
                              style={{ color: levelColors[1] }}
                            >
                              {d.reps}회
                            </td>
                            <td className="py-1.5 px-1 text-center text-gray-500">
                              {d.restSeconds}초
                            </td>
                            <td className="py-1.5 px-1 text-center text-gray-500">
                              {d.sets}세트
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div
                      className="text-xs font-black mb-2"
                      style={{ color: levelColors[2] }}
                    >
                      본 세트 — Level 3 (벽 가까이 · 무릎 펴고)
                    </div>
                    <table className="w-full text-xs">
                      <thead>
                        <tr>
                          <th className="text-left text-gray-400 font-semibold py-1 px-1">
                            요일
                          </th>
                          <th className="text-center text-gray-400 font-semibold py-1 px-1">
                            횟수
                          </th>
                          <th className="text-center text-gray-400 font-semibold py-1 px-1">
                            휴식
                          </th>
                          <th className="text-center text-gray-400 font-semibold py-1 px-1">
                            세트
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {rolloutProgram[2].days.map((d, idx) => (
                          <tr
                            key={d.day}
                            className={idx % 2 === 0 ? "bg-white" : ""}
                          >
                            <td className="py-1.5 px-1 font-bold text-gray-700">
                              {d.day}
                            </td>
                            <td
                              className="py-1.5 px-1 text-center font-black"
                              style={{ color: levelColors[2] }}
                            >
                              {d.reps}회
                            </td>
                            <td className="py-1.5 px-1 text-center text-gray-500">
                              {d.restSeconds}초
                            </td>
                            <td className="py-1.5 px-1 text-center text-gray-500">
                              {d.sets}세트
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-green-50 text-green-700 text-xs rounded-xl px-4 py-3 font-semibold">
                  🏆 4주 완료 → 뱃살 감소 + 복근 라인 형성
                </div>
                <div className="bg-yellow-50 text-yellow-700 text-xs rounded-xl px-4 py-3 leading-relaxed">
                  💡 워밍업을 충분히 해야 부상 없이 최대 효과를 낼 수 있습니다.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bonus card */}
        <div className="px-4 mt-5">
          <div
            className="rounded-2xl p-5 text-white"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #db2777)",
            }}
          >
            <div className="text-2xl mb-2">⚡</div>
            <div className="font-black text-base mb-0.5">
              {rolloutBonus.level} · 끝판왕
            </div>
            <div className="text-purple-200 text-sm font-semibold mb-3">
              {rolloutBonus.levelName}
            </div>
            <p className="text-purple-100 text-sm leading-relaxed">
              {rolloutBonus.description}
            </p>
            <div
              className="mt-3 text-xs rounded-xl p-3 leading-relaxed"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              ⚠️ {rolloutBonus.warning}
            </div>
          </div>
        </div>

        {/* Source */}
        <div className="text-center mt-8 px-4">
          <a
            href="https://blog.naver.com/ordinaryfit/223234414110"
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
