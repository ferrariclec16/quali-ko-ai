'use client';

import React, { useState } from 'react';
import { X, Network, ArrowRight, ArrowDown, Share2, Layers, CheckCircle2 } from 'lucide-react';
import { CodeItem, CodedSegment } from '@/lib/types';
import { buildGroundedTheoryParadigm, calculateCoOccurrence } from '@/lib/qualitative-engine';

interface GroundedTheoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  codes: CodeItem[];
  allSegments: CodedSegment[];
}

export function GroundedTheoryModal({
  isOpen,
  onClose,
  codes,
  allSegments,
}: GroundedTheoryModalProps) {
  const [activeTab, setActiveTab] = useState<'paradigm' | 'cooccurrence'>('paradigm');

  if (!isOpen) return null;

  const paradigm = buildGroundedTheoryParadigm(codes);
  const coOccurrences = calculateCoOccurrence(codes, allSegments);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 rounded-xl">
              <Network className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base">근거이론 패러다임 모형 & 개념망 분석</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-900 text-indigo-200 border border-indigo-500/30">
                  Strauss & Corbin (1998)
                </span>
              </div>
              <p className="text-xs text-slate-300">
                개방 코딩(Open Coding)에서 도출된 개념들을 6대 축 코딩(Axial Coding) 패러다임으로 자동 구조화합니다.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-gray-200 bg-gray-50/70 px-6 pt-2">
          <button
            onClick={() => setActiveTab('paradigm')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition cursor-pointer ${
              activeTab === 'paradigm'
                ? 'border-indigo-600 text-indigo-700 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            패러다임 모형 시각화 (축 코딩)
          </button>
          <button
            onClick={() => setActiveTab('cooccurrence')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition cursor-pointer ${
              activeTab === 'cooccurrence'
                ? 'border-indigo-600 text-indigo-700 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            동시 출현 빈도 매트릭스 (Co-occurrence)
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === 'paradigm' ? (
            <div className="space-y-6">
              {/* Strauss & Corbin Visual Flowchart */}
              <div className="p-6 bg-slate-50 rounded-2xl border border-gray-200 space-y-6">
                {/* Row 1: Causal -> Central -> Strategy -> Consequence */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  {/* 1. Causal */}
                  <div className="p-4 bg-white rounded-xl border-2 border-red-200 shadow-sm space-y-2">
                    <span className="text-[10px] font-black uppercase text-red-600 tracking-wider block">
                      1. 인과적 조건 (Causal)
                    </span>
                    <h4 className="text-xs font-bold text-gray-900">현상을 촉발하는 사건·원인</h4>
                    <div className="space-y-1.5 pt-2">
                      {paradigm.causalConditions.map((c) => (
                        <div key={c.id} className="text-xs p-2 bg-red-50 text-red-900 rounded-lg font-medium">
                          {c.name}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 2. Central Phenomenon */}
                  <div className="p-4 bg-white rounded-xl border-2 border-purple-300 shadow-md space-y-2 ring-2 ring-purple-500/20">
                    <span className="text-[10px] font-black uppercase text-purple-600 tracking-wider block">
                      2. 중심 현상 (Central)
                    </span>
                    <h4 className="text-xs font-bold text-gray-900">참여자가 겪는 핵심 본질</h4>
                    <div className="space-y-1.5 pt-2">
                      {paradigm.centralPhenomenon.map((c) => (
                        <div key={c.id} className="text-xs p-2 bg-purple-50 text-purple-900 rounded-lg font-bold">
                          {c.name}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. Action / Interaction Strategy */}
                  <div className="p-4 bg-white rounded-xl border-2 border-blue-200 shadow-sm space-y-2">
                    <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider block">
                      3. 작용/상호작용 전략
                    </span>
                    <h4 className="text-xs font-bold text-gray-900">현상에 대처하는 행위·전략</h4>
                    <div className="space-y-1.5 pt-2">
                      {paradigm.strategies.map((c) => (
                        <div key={c.id} className="text-xs p-2 bg-blue-50 text-blue-900 rounded-lg font-medium">
                          {c.name}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 4. Consequence */}
                  <div className="p-4 bg-white rounded-xl border-2 border-pink-200 shadow-sm space-y-2">
                    <span className="text-[10px] font-black uppercase text-pink-600 tracking-wider block">
                      4. 결과 (Consequence)
                    </span>
                    <h4 className="text-xs font-bold text-gray-900">전략 채택에 따른 최종 결과</h4>
                    <div className="space-y-1.5 pt-2">
                      {paradigm.consequences.map((c) => (
                        <div key={c.id} className="text-xs p-2 bg-pink-50 text-pink-900 rounded-lg font-medium">
                          {c.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Row 2: Contextual & Intervening Conditions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div className="p-4 bg-white rounded-xl border border-amber-200 space-y-1.5">
                    <span className="text-[10px] font-black uppercase text-amber-600 tracking-wider block">
                      맥락적 조건 (Contextual Conditions)
                    </span>
                    <h4 className="text-xs font-bold text-gray-900">현상에 영향을 미치는 특수한 환경적 조건</h4>
                    <div className="space-y-1 pt-1">
                      {paradigm.contextualConditions.map((c) => (
                        <div key={c.id} className="text-xs p-2 bg-amber-50 text-amber-900 rounded-lg font-medium">
                          {c.name}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-emerald-200 space-y-1.5">
                    <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider block">
                      중재적 조건 (Intervening Conditions)
                    </span>
                    <h4 className="text-xs font-bold text-gray-900">전략을 촉진하거나 억제하는 완충 요인</h4>
                    <div className="space-y-1 pt-1">
                      {paradigm.interveningConditions.length > 0 ? (
                        paradigm.interveningConditions.map((c) => (
                          <div key={c.id} className="text-xs p-2 bg-emerald-50 text-emerald-900 rounded-lg font-medium">
                            {c.name}
                          </div>
                        ))
                      ) : (
                        <div className="text-xs text-gray-400 p-2">동료 간 정서적 지지 및 완충망</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl text-xs text-indigo-900 space-y-1 leading-relaxed">
                <span className="font-bold block">💡 학술 연구자를 위한 조언:</span>
                위 패러다임 구조는 Strauss & Corbin(1998)의 근거이론 질적 분석 절차에 따라 KCI 등재 학술지 및 석박사 학위논문의 제4장 결과 부분에 다이어그램 형태로 그대로 인용하여 작성할 수 있습니다.
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-xs text-gray-600">
                인터뷰 대상자의 동일 발화 문단 내에서 2개 이상의 개념이 함께 출현한 빈도를 집계하여 개념 간 상관성을 분석합니다.
              </div>

              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3">개념 A (범주)</th>
                      <th className="px-4 py-3">연계된 개념 B (범주)</th>
                      <th className="px-4 py-3 text-center">동시 출현 빈도</th>
                      <th className="px-4 py-3 text-right">개념 연계도</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {coOccurrences.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
                          동일 문단에 동시 코딩된 쌍이 아직 없습니다.
                        </td>
                      </tr>
                    ) : (
                      coOccurrences.map((pair, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition">
                          <td className="px-4 py-3 font-bold text-gray-900">{pair.source}</td>
                          <td className="px-4 py-3 font-bold text-indigo-700">{pair.target}</td>
                          <td className="px-4 py-3 text-center">
                            <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-black text-xs">
                              {pair.weight}회
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right text-emerald-600 font-bold">
                            강한 상호작용
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
