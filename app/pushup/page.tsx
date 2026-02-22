"use client";

import { useState } from "react";
import Link from "next/link";

const startGuide = [
  { range: "5회 이하", start: "1주차 시작" },
  { range: "6 ~ 10회", start: "1주차 시작" },
  { range: "11 ~ 20회", start: "1주차 시작" },
  { range: "20회 이상", start: "3주차 시작 ✅" },
];

type Day = { label: string; sets: number; rest: string };

type Week = {
  week: number;
  badge: string;
  badgeColor: string;
  target: string | null;
  description: string;
  days: Day[] | null;
  milestone: string | null;
  tip: string | null;
};

const weeks: Week[] = [
  {
    week: 1,
    badge: "적응기",
    badgeColor: "#fb923c",
    target: "연속 20회 미만 대상",
    description:
      "푸쉬업 동작에 익숙해지는 단계. 올바른 정자세를 완성하는 것이 이 주차의 핵심 목표입니다.",
    days: null,
    milestone: null,
    tip: "20개 이상 가능하다면 3주차로 바로 건너뛰세요!",
  },
  {
    week: 2,
    badge: "성장기",
    badgeColor: "#f59e0b",
    target: null,
    description:
      "1주차에서 익숙해진 동작을 바탕으로 횟수를 점진적으로 늘려나가는 기간. 세트 간 충분한 휴식을 두면 누구나 어렵지 않게 진행 가능합니다.",
    days: null,
    milestone: null,
    tip: null,
  },
  {
    week: 3,
    badge: "강화 시작",
    badgeColor: "#84cc16",
    target: "정자세 20회 이상이면 여기서 시작",
    description:
      "이미 푸쉬업에 익숙한 상태를 가정. 처음 해보면 제법 빡센 느낌이 드는 구간. 이 시점부터 손목 피로가 쌓이기 쉽습니다.",
    days: null,
    milestone: null,
    tip: "3주차부터 손목에 피로/염증이 오기 쉬움. 푸쉬업바 사용을 강력 권장!",
  },
  {
    week: 4,
    badge: "고반복",
    badgeColor: "#22c55e",
    target: null,
    description:
      "3주차와 세트수는 동일하지만 횟수를 더 늘려 고반복에 익숙해지는 구간. 한 번에 40개가 가능한 몸을 만드는 기간.",
    days: null,
    milestone: "4주차 완료 → 연속 약 40개 가능",
    tip: null,
  },
  {
    week: 5,
    badge: "폭발 성장",
    badgeColor: "#3b82f6",
    target: null,
    description:
      "힘과 근육량을 폭발적으로 성장시키는 본격 구간. 운동 볼륨이 대폭 늘어나고 쉬는 시간은 줄어드는 가장 빡센 주차.",
    days: [
      { label: "1일차", sets: 5, rest: "60초" },
      { label: "2일차", sets: 8, rest: "45초" },
      { label: "3일차", sets: 8, rest: "45초" },
    ],
    milestone: "5주차 완료 → 연속 50개 이상 가능",
    tip: "상당히 빡세지만 이 구간을 버텨야 각이 잡힙니다 🔥",
  },
  {
    week: 6,
    badge: "마무리 & 도전",
    badgeColor: "#a855f7",
    target: null,
    description:
      "2·3일차는 초반 세트 횟수를 줄이고 마지막 세트에 몰빵하는 전략. 100개 연속을 위한 '워밍업 → 전력 투구' 패턴 훈련.",
    days: null,
    milestone: "6주차 완료 → 연속 60~70개 이상 가능",
    tip: "마지막 세트에 모든 걸 쏟아붓는 연습! 실패해도 괜찮아요, 몸은 이미 성장했습니다.",
  },
];

export default function PushupPage() {
  const [openWeek, setOpenWeek] = useState<number | null>(null);

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

        {/* Start guide card */}
        <div className="mx-4 -mt-5 bg-white rounded-2xl shadow-xl p-5 mb-5">
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
                      className="w-11 h-11 rounded-full flex items-center justify-center font-black text-white text-sm flex-shrink-0"
                      style={{ background: w.badgeColor }}
                    >
                      {w.week}주
                    </div>
                    <div>
                      <div className="font-black text-gray-800">
                        {w.week}주차
                      </div>
                      <div className="text-xs font-semibold" style={{ color: w.badgeColor }}>
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

                    {/* Days table (week 5 only has data) */}
                    {w.days ? (
                      <div>
                        <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-2">
                          세트 구성
                        </div>
                        <div className="space-y-2">
                          {w.days.map((d) => (
                            <div
                              key={d.label}
                              className="flex justify-between items-center bg-orange-50 rounded-xl px-4 py-3"
                            >
                              <span className="text-gray-700 font-semibold text-sm">
                                {d.label}
                              </span>
                              <div className="flex gap-3 text-sm">
                                <span className="text-orange-600 font-black">
                                  {d.sets}세트
                                </span>
                                <span className="text-gray-400">
                                  휴식 {d.rest}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="text-gray-400 text-xs mt-2 text-center">
                          세트당 횟수는 원본 루틴표 이미지 참고
                        </p>
                      </div>
                    ) : (
                      <div className="bg-gray-50 rounded-xl px-4 py-3 text-xs text-gray-400 text-center">
                        📸 세부 세트/횟수 → 원본 루틴표 이미지 참고
                      </div>
                    )}

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
