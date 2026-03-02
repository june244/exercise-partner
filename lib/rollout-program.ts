export type RolloutDay = {
  day: string;
  reps: number;
  restSeconds: number;
  sets: number;
};

export type RolloutWeek = {
  week: number;
  level: string;
  levelName: string;
  badge: string;
  badgeColor: string;
  description: string;
  tip: string | null;
  milestone: string | null;
  days: RolloutDay[];
};

export const rolloutProgram: RolloutWeek[] = [
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
    days: [
      { day: "월", reps: 8, restSeconds: 30, sets: 3 },
      { day: "화", reps: 8, restSeconds: 30, sets: 3 },
      { day: "수", reps: 10, restSeconds: 30, sets: 3 },
      { day: "목", reps: 10, restSeconds: 25, sets: 3 },
      { day: "금", reps: 12, restSeconds: 25, sets: 3 },
      { day: "토", reps: 12, restSeconds: 20, sets: 3 },
    ],
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
    days: [
      { day: "월", reps: 8, restSeconds: 30, sets: 3 },
      { day: "화", reps: 8, restSeconds: 30, sets: 3 },
      { day: "수", reps: 10, restSeconds: 25, sets: 3 },
      { day: "목", reps: 10, restSeconds: 25, sets: 3 },
      { day: "금", reps: 12, restSeconds: 25, sets: 3 },
      { day: "토", reps: 12, restSeconds: 20, sets: 3 },
    ],
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
    days: [
      { day: "월", reps: 4, restSeconds: 30, sets: 3 },
      { day: "화", reps: 4, restSeconds: 30, sets: 3 },
      { day: "수", reps: 5, restSeconds: 25, sets: 3 },
      { day: "목", reps: 5, restSeconds: 25, sets: 3 },
      { day: "금", reps: 6, restSeconds: 20, sets: 3 },
      { day: "토", reps: 6, restSeconds: 20, sets: 3 },
    ],
  },
];

export const rolloutBonus = {
  level: "Level 10",
  levelName: "벽 없이 · 무릎 펴고",
  description:
    "4주 루틴 완료 후 도전하는 끝판왕 레벨. Level 10을 단 1개 할 수 있는 복근이면 Level 1은 50개도 거뜬합니다.",
  warning: "부상 위험이 높으니 충분한 준비 후 조심해서 도전하세요!",
};
