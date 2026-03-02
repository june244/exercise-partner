"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getPushupRecords,
  deletePushupRecord,
  formatDate,
  formatRestTime,
  type WorkoutRecord,
} from "@/lib/records";

const ACCENT = "#f97316";
const ACCENT_BG = "#fff7ed";

export default function PushupHistoryPage() {
  const [records, setRecords] = useState<WorkoutRecord[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    setRecords(getPushupRecords());
  }, []);

  function handleDelete(id: string) {
    deletePushupRecord(id);
    setRecords(getPushupRecords());
    if (expandedId === id) setExpandedId(null);
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
          <div className="flex items-end justify-between">
            <div>
              <div className="text-4xl mb-3">📊</div>
              <h1 className="text-white text-2xl font-black">기록 히스토리</h1>
              <p className="text-orange-200 text-sm">
                푸쉬업 100개 · {records.length}개의 기록
              </p>
            </div>
            <Link
              href="/pushup/record"
              className="text-white font-bold text-sm px-4 py-2 rounded-xl mb-1"
              style={{ background: "rgba(255,255,255,0.25)" }}
            >
              + 기록
            </Link>
          </div>
        </div>

        <div className="px-4 pt-4">
          {records.length === 0 ? (
            /* 빈 상태 */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="text-6xl mb-5">💪</div>
              <p className="text-white font-black text-xl mb-2">
                아직 기록이 없어요
              </p>
              <p className="text-gray-500 text-sm mb-8">
                오늘의 운동을 기록해 보세요!
              </p>
              <Link
                href="/pushup/record"
                className="text-white font-bold px-6 py-3 rounded-2xl text-sm"
                style={{ background: ACCENT }}
              >
                첫 기록 남기기
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {records.map((record) => {
                const isOpen = expandedId === record.id;
                const totalReps = record.sets.reduce((a, s) => a + s.reps, 0);
                return (
                  <div
                    key={record.id}
                    className="bg-white rounded-2xl overflow-hidden shadow"
                  >
                    {/* 요약 행 */}
                    <button
                      className="w-full text-left p-5 flex items-center justify-between"
                      onClick={() =>
                        setExpandedId(isOpen ? null : record.id)
                      }
                    >
                      <div>
                        <p className="font-black text-gray-800 text-base">
                          {formatDate(record.date)}
                        </p>
                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                          {record.maxConsecutive != null &&
                            record.maxConsecutive > 0 && (
                              <span
                                className="text-xs font-bold px-2 py-0.5 rounded-full"
                                style={{ background: ACCENT_BG, color: ACCENT }}
                              >
                                💪 연속 {record.maxConsecutive}개
                              </span>
                            )}
                          <span className="text-gray-500 text-xs">
                            {record.sets.length}세트
                          </span>
                          <span className="text-gray-500 text-xs">
                            총 {totalReps}개
                          </span>
                        </div>
                      </div>
                      <span className="text-gray-300 font-bold text-sm ml-2">
                        {isOpen ? "▲" : "▼"}
                      </span>
                    </button>

                    {/* 상세 */}
                    {isOpen && (
                      <div className="border-t border-gray-100 px-5 pb-5 pt-4">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-gray-400 text-xs">
                              <th className="text-left font-semibold pb-2 w-12">
                                세트
                              </th>
                              <th className="text-center font-semibold pb-2">
                                횟수
                              </th>
                              <th className="text-right font-semibold pb-2">
                                휴식
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-50">
                            {record.sets.map((set, i) => (
                              <tr key={i}>
                                <td className="py-2 text-gray-500 text-xs">
                                  {i + 1}세트
                                </td>
                                <td className="py-2 text-center font-bold text-gray-800">
                                  {set.reps}개
                                </td>
                                <td className="py-2 text-right text-gray-500 text-xs">
                                  {i < record.sets.length - 1
                                    ? formatRestTime(set.restSeconds)
                                    : "-"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {record.memo && (
                          <div className="mt-3 bg-gray-50 rounded-xl px-4 py-3">
                            <p className="text-gray-400 text-xs font-semibold mb-1">메모</p>
                            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                              {record.memo}
                            </p>
                          </div>
                        )}

                        <button
                          onClick={() => handleDelete(record.id)}
                          className="mt-4 text-xs text-red-400 font-semibold px-3 py-1.5 rounded-lg"
                          style={{ background: "#fff1f2" }}
                        >
                          기록 삭제
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
