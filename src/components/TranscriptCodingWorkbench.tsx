'use client';

import React, { useState } from 'react';
import {
  CodeItem,
  CodedSegment,
  InterviewTranscript,
  TranscriptParagraph,
} from '@/lib/types';
import {
  Tag,
  Plus,
  Trash2,
  Bookmark,
  Shield,
  Clock,
  User,
  MessageSquare,
  Highlighter,
  CheckCircle,
  FileText,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { deidentifyTranscript } from '@/lib/qualitative-engine';

interface TranscriptCodingWorkbenchProps {
  transcript: InterviewTranscript;
  codes: CodeItem[];
  onAddCode: (newCode: CodeItem) => void;
  onApplyCode: (paragraphIndex: number, selectedText: string, codeId: string) => void;
  onRemoveSegment: (segmentId: string) => void;
}

export function TranscriptCodingWorkbench({
  transcript,
  codes,
  onAddCode,
  onApplyCode,
  onRemoveSegment,
}: TranscriptCodingWorkbenchProps) {
  const [selectedCodeId, setSelectedCodeId] = useState<string | null>(codes[0]?.id || null);
  const [isPiiMasked, setIsPiiMasked] = useState(true);
  const [newCodeName, setNewCodeName] = useState('');
  const [newCodeCategory, setNewCodeCategory] = useState<CodeItem['category']>('CENTRAL');
  const [newCodeColor, setNewCodeColor] = useState('#8B5CF6');
  const [showAddCodeModal, setShowAddCodeModal] = useState(false);

  // Quick code apply simulation
  const [activeParagraphIndex, setActiveParagraphIndex] = useState<number | null>(null);
  const [customSnippet, setCustomSnippet] = useState('');

  const handleCreateCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCodeName.trim()) return;

    const categoryLabels: Record<CodeItem['category'], string> = {
      CAUSAL: '인과적 조건',
      CONTEXTUAL: '맥락적 조건',
      CENTRAL: '중심 현상',
      STRATEGY: '작용/상호작용',
      CONSEQUENCE: '결과',
      GENERAL: '일반 주제',
    };

    const newCode: CodeItem = {
      id: `code-${Date.now()}`,
      name: newCodeName.trim(),
      category: newCodeCategory,
      categoryLabel: categoryLabels[newCodeCategory],
      color: newCodeColor,
      definition: '연구자가 전사본 코딩 과정에서 직접 정의한 범주',
      frequency: 0,
      inVivoQuotes: [],
    };

    onAddCode(newCode);
    setSelectedCodeId(newCode.id);
    setNewCodeName('');
    setShowAddCodeModal(false);
  };

  const handleApplyQuickCode = (pIndex: number) => {
    if (!selectedCodeId) return;
    const textToCode = customSnippet.trim() || '참여자의 핵심 경험 진술 (원문 발췌)';
    onApplyCode(pIndex, textToCode, selectedCodeId);
    setCustomSnippet('');
    setActiveParagraphIndex(null);
  };

  // Flatten all coded segments
  const allSegments: CodedSegment[] = transcript.paragraphs.flatMap((p) => p.codedSegments);
  const activeCode = codes.find((c) => c.id === selectedCodeId);
  const activeSegments = allSegments.filter((s) => s.codeId === selectedCodeId);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* 1. Header Banner: Research Meta & IRB Toggle */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200">
              {transcript.demographics.role}
            </span>
            <span className="text-xs text-gray-400">|</span>
            <span className="text-xs text-gray-500 font-medium">
              인터뷰 일자: {transcript.demographics.interviewDate} ({transcript.demographics.durationMinutes}분)
            </span>
          </div>
          <h1 className="text-lg font-black text-gray-900">
            {transcript.title}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            <strong>연구 주제:</strong> {transcript.topic}
          </p>
        </div>

        {/* IRB De-identification toggle */}
        <div className="flex items-center gap-3 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-200">
          <Shield className="w-4 h-4 text-emerald-600" />
          <div className="text-left">
            <div className="text-xs font-bold text-gray-800">IRB 로컬 비식별화 (PII 마스킹)</div>
            <div className="text-[10px] text-gray-500">인명, 병원명, 연락처 자동 보호</div>
          </div>
          <button
            onClick={() => setIsPiiMasked(!isPiiMasked)}
            className={`ml-2 relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${
              isPiiMasked ? 'bg-emerald-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                isPiiMasked ? 'translate-x-4.5' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* 2. Three-Column MAXQDA-style Coding Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Panel: Code System (코드북 트리) - 3.5 cols */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-200 p-4 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h2 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-indigo-600" />
                <span>코드북 체계 (Code System)</span>
              </h2>
              <span className="text-[11px] text-gray-400">총 {codes.length}개 주제·개념 범주</span>
            </div>

            <button
              onClick={() => setShowAddCodeModal(true)}
              className="p-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer"
              title="새 코드 생성"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>새 코드</span>
            </button>
          </div>

          {/* Code List */}
          <div className="space-y-1.5 max-h-[620px] overflow-y-auto pr-1">
            {codes.map((code) => {
              const isSelected = selectedCodeId === code.id;
              const segCount = allSegments.filter((s) => s.codeId === code.id).length;

              return (
                <button
                  key={code.id}
                  onClick={() => setSelectedCodeId(code.id)}
                  className={`w-full text-left p-2.5 rounded-xl border transition flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/60 shadow-sm ring-1 ring-indigo-500/20'
                      : 'border-gray-100 hover:border-gray-200 bg-gray-50/50 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: code.color }}
                    />
                    <div className="truncate">
                      <div className="text-xs font-bold text-gray-900 truncate">
                        {code.name}
                      </div>
                      <span className="text-[10px] text-gray-500">
                        {code.categoryLabel}
                      </span>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    segCount > 0 ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {segCount}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Info Box */}
          {activeCode && (
            <div className="pt-3 border-t border-gray-100 text-[11px] text-gray-600 bg-slate-50 p-3 rounded-xl space-y-1">
              <div className="font-bold text-gray-900 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeCode.color }} />
                <span>선택된 코드 정의:</span>
              </div>
              <p className="leading-relaxed text-gray-600">{activeCode.definition}</p>
            </div>
          )}
        </div>

        {/* Center Panel: Transcript Document Browser (원문 전사본) - 5 cols */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h2 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>전사본 원문 뷰어 (Document Browser)</span>
            </h2>
            <span className="text-[11px] text-gray-400">총 {transcript.paragraphs.length}개 발화 문단</span>
          </div>

          <div className="space-y-4 max-h-[640px] overflow-y-auto pr-1">
            {transcript.paragraphs.map((p, idx) => {
              const displayInfo = isPiiMasked
                ? deidentifyTranscript(p.text)
                : { sanitizedText: p.text, redactedCount: 0 };

              const hasCodedSegments = p.codedSegments.length > 0;

              return (
                <div
                  key={p.id}
                  className={`p-3.5 rounded-xl border transition ${
                    hasCodedSegments
                      ? 'bg-slate-50/50 border-gray-200'
                      : 'bg-white border-gray-100 hover:border-gray-200'
                  }`}
                >
                  {/* Speaker & Timestamp */}
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className={`font-bold flex items-center gap-1 ${
                      p.speaker.includes('연구자') ? 'text-gray-500' : 'text-emerald-700'
                    }`}>
                      <User className="w-3.5 h-3.5" />
                      {p.speaker}
                    </span>
                    <span className="text-[11px] font-mono text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {p.timestamp}
                    </span>
                  </div>

                  {/* Utterance Text */}
                  <p className="text-xs text-gray-800 leading-relaxed font-sans select-text">
                    {displayInfo.sanitizedText}
                  </p>

                  {/* In-text Applied Coded Badges */}
                  {hasCodedSegments && (
                    <div className="mt-2.5 pt-2 border-t border-gray-200/50 flex flex-wrap gap-1.5">
                      {p.codedSegments.map((seg) => {
                        const code = codes.find((c) => c.id === seg.codeId);
                        if (!code) return null;
                        return (
                          <span
                            key={seg.id}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold text-white shadow-xs"
                            style={{ backgroundColor: code.color }}
                          >
                            <span>{code.name}</span>
                            <button
                              onClick={() => onRemoveSegment(seg.id)}
                              className="hover:opacity-75 transition ml-0.5 cursor-pointer"
                              title="코드 삭제"
                            >
                              &times;
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  )}

                  {/* Quick Code Action Bar */}
                  <div className="mt-2 text-right">
                    {activeParagraphIndex === idx ? (
                      <div className="p-2.5 bg-indigo-50/80 rounded-xl border border-indigo-200 text-left space-y-2 text-xs mt-2">
                        <span className="font-bold text-indigo-900 block">
                          선택된 코드 [ {activeCode?.name} ] 부여하기:
                        </span>
                        <input
                          type="text"
                          placeholder="발췌할 핵심 구문 (비워두면 전체 문단 코딩)..."
                          value={customSnippet}
                          onChange={(e) => setCustomSnippet(e.target.value)}
                          className="w-full px-2.5 py-1 text-xs bg-white border border-indigo-200 rounded-lg focus:outline-none"
                        />
                        <div className="flex justify-end gap-1.5">
                          <button
                            onClick={() => setActiveParagraphIndex(null)}
                            className="px-2.5 py-1 text-[11px] text-gray-600 bg-white border border-gray-200 rounded cursor-pointer"
                          >
                            취소
                          </button>
                          <button
                            onClick={() => handleApplyQuickCode(idx)}
                            className="px-2.5 py-1 text-[11px] font-bold text-white bg-indigo-600 rounded cursor-pointer"
                          >
                            코드 적용
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setActiveParagraphIndex(idx)}
                        className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
                      >
                        + 이 문단에 [{activeCode?.name || '코드'}] 코딩
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Coded Segments & Researcher Memos (발췌문 & 연구자 메모) - 3.5 cols */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-200 p-4 shadow-sm space-y-4">
          <div className="pb-3 border-b border-gray-100">
            <h2 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
              <Highlighter className="w-4 h-4 text-amber-500" />
              <span>코딩 발췌문 & 연구자 메모</span>
            </h2>
            <span className="text-[11px] text-gray-400">
              [{activeCode?.name}] 범주에 연결된 인용구 ({activeSegments.length}건)
            </span>
          </div>

          <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1">
            {activeSegments.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-xs bg-gray-50 rounded-xl border border-dashed border-gray-200">
                선택된 코드에 아직 부여된 전사본 구문이 없습니다. 좌측 본문에서 [+ 이 문단에 코딩]을 눌러보세요.
              </div>
            ) : (
              activeSegments.map((seg) => (
                <div
                  key={seg.id}
                  className="p-3 bg-amber-50/30 border border-amber-200/80 rounded-xl space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between text-[11px] text-gray-500">
                    <span className="font-semibold text-amber-900">
                      문단 #{seg.paragraphIndex + 1}
                    </span>
                    <button
                      onClick={() => onRemoveSegment(seg.id)}
                      className="text-gray-400 hover:text-red-600 transition cursor-pointer"
                      title="발췌 해제"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <blockquote className="italic text-gray-800 bg-white p-2.5 rounded-lg border border-amber-100 leading-relaxed font-serif">
                    &ldquo;{seg.selectedText}&rdquo;
                  </blockquote>

                  {seg.memo && (
                    <div className="text-[11px] text-indigo-900 bg-indigo-50/70 p-2 rounded-lg border border-indigo-100">
                      <span className="font-bold block mb-0.5">연구자 성찰 메모:</span>
                      {seg.memo}
                    </div>
                  )}

                  <div className="text-[10px] text-gray-400 text-right">
                    코딩 시각: {seg.createdAt}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Add New Code Modal */}
      {showAddCodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-gray-200 space-y-4">
            <h3 className="font-bold text-sm text-gray-900">새 연구 코드(범주) 등록</h3>
            <form onSubmit={handleCreateCode} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">코드 명칭 (Concept / Theme)</label>
                <input
                  type="text"
                  placeholder="예: 역할 갈등 및 탈진"
                  value={newCodeName}
                  onChange={(e) => setNewCodeName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">근거이론 패러다임 분류</label>
                <select
                  value={newCodeCategory}
                  onChange={(e) => setNewCodeCategory(e.target.value as CodeItem['category'])}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
                >
                  <option value="CAUSAL">인과적 조건 (Causal Condition)</option>
                  <option value="CENTRAL">중심 현상 (Central Phenomenon)</option>
                  <option value="CONTEXTUAL">맥락적 조건 (Contextual Condition)</option>
                  <option value="STRATEGY">작용/상호작용 전략 (Action/Interaction Strategy)</option>
                  <option value="CONSEQUENCE">결과 (Consequence)</option>
                  <option value="GENERAL">일반 주제 (General Theme)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">라벨 색상</label>
                <div className="flex gap-2">
                  {['#EF4444', '#8B5CF6', '#F59E0B', '#10B981', '#3B82F6', '#EC4899'].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setNewCodeColor(c)}
                      className={`w-7 h-7 rounded-full border-2 cursor-pointer transition ${
                        newCodeColor === c ? 'border-gray-900 scale-110' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCodeModal(false)}
                  className="px-4 py-2 border border-gray-200 rounded-xl text-gray-600 font-medium cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold cursor-pointer"
                >
                  코드 추가
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
