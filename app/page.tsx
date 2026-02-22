import Link from "next/link";

const projects = [
  {
    href: "/pushup",
    emoji: "💪",
    title: "푸쉬업 100개",
    subtitle: "6주 완성 프로그램",
    tags: ["주 3일", "6주", "맨몸운동"],
    from: "#f97316",
    to: "#dc2626",
    textColor: "#fed7aa",
  },
  {
    href: "/rollout",
    emoji: "🔥",
    title: "AB슬라이드 복근",
    subtitle: "4주 완성 프로그램",
    tags: ["4주", "뱃살 감소", "복근 형성"],
    from: "#14b8a6",
    to: "#2563eb",
    textColor: "#99f6e4",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="text-4xl mb-3">🏃</p>
          <h1 className="text-white text-3xl font-black tracking-tight mb-2">
            운동 루틴
          </h1>
          <p className="text-gray-500 text-sm">프로젝트를 선택하세요</p>
        </div>

        <div className="flex flex-col gap-4">
          {projects.map((p) => (
            <Link key={p.href} href={p.href}>
              <div
                className="rounded-3xl p-6 shadow-2xl active:scale-95 transition-transform duration-150 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${p.from}, ${p.to})`,
                }}
              >
                <div className="text-5xl mb-4">{p.emoji}</div>
                <h2 className="text-white text-2xl font-black mb-1">
                  {p.title}
                </h2>
                <p className="text-sm mb-5" style={{ color: p.textColor }}>
                  {p.subtitle}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-white text-xs font-semibold px-3 py-1.5 rounded-full"
                      style={{ background: "rgba(255,255,255,0.2)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-gray-700 text-xs text-center mt-10">
          출처: 보통사람 운동채널 (ordinaryfit)
        </p>
      </div>
    </main>
  );
}
