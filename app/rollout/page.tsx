"use client";

import { useState } from "react";
import Link from "next/link";

type Week = {
  week: number;
  level: string;
  levelName: string;
  badge: string;
  badgeColor: string;
  description: string;
  tip: string | null;
  milestone: string | null;
};

const weeks: Week[] = [
  {
    week: 1,
    level: "Level 1",
    levelName: "벽까지 · 무릎 대고",
    badge: "적응기",
    badgeColor: "#14b8a6",
    description:
      "롤아웃 동작에 익숙해지는 적응 기간. 가동범위를 짧게 (벽까지), 무릎은 바닥에 대고 진행. 복부 자극에 집중하며 정확한 자세를 먼저 완성하세요.",
    tip: "정확한 자세가 자극도 잘 받고 부상도 예방합니다!",
    milestone: null,
  },
  {
    week: 2,
    level: "Level 2",
    levelName: "벽 없이 · 무릎 대고",
    badge: "집중 자극",
    badgeColor: "#3b82f6",
    description:
      "벽 없이 가동범위를 길게 가져가며 복부에 집중적으로 자극을 넣는 기간. 롤아웃 자세에 더 익숙해지고, 복근에 전달되는 자극이 한층 강해집니다.",
    tip: "3주차로 넘어갈 코어 힘이 부족하면 2주차 루틴을 더 오래 반복해도 OK!",
    milestone: null,
  },
  {
    week: 3,
    level: "Level 3",
    levelName: "벽 가까이 · 무릎 펴고",
    badge: "강화",
    badgeColor: "#8b5cf6",
    description:
      "무릎을 펴고 짧은 가동범위로 진행. 무릎을 대고 할 때보다 훨씬 강렬한 복부 자극을 느낄 수 있습니다. 강도가 높아지는 만큼 횟수는 줄여서 진행.",
    tip: "강도가 확 올라갑니다. 루틴표 횟수대로 줄여서 부상 없이 진행하세요!",
    milestone: null,
  },
  {
    week: 4,
    level: "Level 4",
    levelName: "Level 2 → Level 3 반복",
    badge: "최대 자극",
    badgeColor: "#ec4899",
    description:
      "Level 2 (벽없이 · 무릎대고) 로 워밍업을 충분히 한 뒤, Level 3 (벽 가까이 · 무릎펴고) 로 본 세트를 진행. 롤아웃으로 얻을 수 있는 복근 자극을 최대치로 끌어올립니다.",
    tip: "워밍업을 충분히 해야 부상 없이 최대 효과를 낼 수 있습니다.",
    milestone: "4주 완료 → 뱃살 감소 + 복근 라인 형성 🎉",
  },
];

const bonus = {
  level: "Level 10",
  levelName: "벽 없이 · 무릎 펴고",
  description:
    "4주 루틴 완료 후 도전하는 끝판왕 레벨. Level 10을 단 1개 할 수 있는 복근이면 Level 1은 50개도 거뜬합니다.",
  warning: "부상 위험이 높으니 충분한 준비 후 조심해서 도전하세요!",
};

const levelColors = ["#14b8a6", "#3b82f6", "#8b5cf6", "#ec4899"];

export default function RolloutPage() {
  const [openWeek, setOpenWeek] = useState<number | null>(null);

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

        {/* Intro card */}
        <div className="mx-4 -mt-5 bg-white rounded-2xl shadow-xl p-5 mb-5">
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
            {weeks.map((w, i) => (
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
          </div>
        </div>

        {/* Week accordion */}
        <div className="px-4 space-y-3">
          {weeks.map((w) => {
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

                    <div className="bg-gray-50 rounded-xl px-4 py-3 text-xs text-gray-400 text-center">
                      📸 세부 세트/횟수 → 원본 루틴표 이미지 참고
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
              {bonus.level} · 끝판왕
            </div>
            <div className="text-purple-200 text-sm font-semibold mb-3">
              {bonus.levelName}
            </div>
            <p className="text-purple-100 text-sm leading-relaxed">
              {bonus.description}
            </p>
            <div
              className="mt-3 text-xs rounded-xl p-3 leading-relaxed"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              ⚠️ {bonus.warning}
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
