'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { TranscriptCodingWorkbench } from '@/components/TranscriptCodingWorkbench';
import { GroundedTheoryModal } from '@/components/GroundedTheoryModal';
import { PaperExportModal } from '@/components/PaperExportModal';
import { IrbComplianceModal } from '@/components/IrbComplianceModal';
import { PricingModal } from '@/components/PricingModal';
import { INITIAL_CODES, MOCK_TRANSCRIPTS } from '@/lib/mock-transcripts';
import { CodeItem, CodedSegment, InterviewTranscript } from '@/lib/types';
import { BookOpen, ShieldCheck, Cpu, Sparkles, Network, FileText, CheckCircle2, ChevronRight } from 'lucide-react';

export default function Home() {
  const [transcripts, setTranscripts] = useState<InterviewTranscript[]>(MOCK_TRANSCRIPTS);
  const [selectedTranscriptId, setSelectedTranscriptId] = useState<string>(MOCK_TRANSCRIPTS[0].id);
  const [codes, setCodes] = useState<CodeItem[]>(INITIAL_CODES);

  // Modals state
  const [isIrbModalOpen, setIsIrbModalOpen] = useState(false);
  const [isPaperModalOpen, setIsPaperModalOpen] = useState(false);
  const [isParadigmModalOpen, setIsParadigmModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  const currentTranscript = transcripts.find((t) => t.id === selectedTranscriptId) || transcripts[0];
  const allSegments = transcripts.flatMap((t) => t.paragraphs.flatMap((p) => p.codedSegments));

  const handleAddCode = (newCode: CodeItem) => {
    setCodes((prev) => [...prev, newCode]);
  };

  const handleApplyCode = (paragraphIndex: number, selectedText: string, codeId: string) => {
    const newSeg: CodedSegment = {
      id: `seg-${Date.now()}`,
      transcriptId: currentTranscript.id,
      paragraphIndex,
      selectedText,
      codeId,
      createdAt: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
    };

    setTranscripts((prev) =>
      prev.map((t) => {
        if (t.id !== currentTranscript.id) return t;
        const newParagraphs = [...t.paragraphs];
        const targetP = newParagraphs[paragraphIndex];
        if (targetP) {
          targetP.codedSegments = [...targetP.codedSegments, newSeg];
        }
        return { ...t, paragraphs: newParagraphs };
      })
    );

    // Update code frequency
    setCodes((prev) =>
      prev.map((c) => {
        if (c.id === codeId) {
          return {
            ...c,
            frequency: c.frequency + 1,
            inVivoQuotes: c.inVivoQuotes.includes(selectedText)
              ? c.inVivoQuotes
              : [selectedText, ...c.inVivoQuotes],
          };
        }
        return c;
      })
    );
  };

  const handleRemoveSegment = (segmentId: string) => {
    setTranscripts((prev) =>
      prev.map((t) => {
        const newParagraphs = t.paragraphs.map((p) => ({
          ...p,
          codedSegments: p.codedSegments.filter((s) => s.id !== segmentId),
        }));
        return { ...t, paragraphs: newParagraphs };
      })
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-emerald-500 selection:text-white">
      {/* 1. Navbar */}
      <Navbar
        onOpenIrb={() => setIsIrbModalOpen(true)}
        onOpenPaper={() => setIsPaperModalOpen(true)}
        onOpenParadigm={() => setIsParadigmModalOpen(true)}
        onOpenPricing={() => setIsPricingModalOpen(true)}
        totalCodedSegments={allSegments.length}
      />

      {/* 2. Top Transcript Selector & Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 text-white border-b border-emerald-900/60 p-4 lg:p-6 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                MAXQDA · NVivo 대체 K-질적연구 SaaS
              </span>
              <span className="text-xs text-slate-300 font-semibold hidden sm:inline">
                Strauss & Corbin 근거이론 6대 패러다임 완벽 지원
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              한국어 심층 인터뷰 질적 코딩 & 연구 결과 표 자동 생성
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              수십 시간 분량의 질적 인터뷰 전사본을 안전하게 분석하세요. 
              외부 클라우드로 원문이 유출되지 않으며, IRB 비식별화 마스킹과 학술지(KCI/SSCI) 제4장 결과 표를 원클릭 추출합니다.
            </p>
          </div>

          {/* Transcript Switcher Pills */}
          <div className="flex flex-col gap-2 bg-slate-800/80 p-3 rounded-2xl border border-emerald-800/40">
            <span className="text-[11px] font-bold text-emerald-300">인터뷰 데이터셋 전환:</span>
            <div className="flex flex-wrap gap-2">
              {transcripts.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTranscriptId(t.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                    selectedTranscriptId === t.id
                      ? 'bg-emerald-600 text-white shadow'
                      : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <span>{t.interviewee}</span>
                  {selectedTranscriptId === t.id && <CheckCircle2 className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Coding Workbench */}
      <main className="flex-1">
        <TranscriptCodingWorkbench
          transcript={currentTranscript}
          codes={codes}
          onAddCode={handleAddCode}
          onApplyCode={handleApplyCode}
          onRemoveSegment={handleRemoveSegment}
        />

        {/* 4. Qualitative Research Academic Moat Section */}
        <section className="w-full max-w-7xl mx-auto px-4 py-12">
          <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-teal-900/60 shadow-xl space-y-8">
            <div className="max-w-3xl">
              <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 uppercase tracking-widest">
                Academic Moat & Research Integrity
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 tracking-tight">
                왜 챗GPT나 외산 툴로는 질적 연구 논문을 통과하기 어려운가?
              </h2>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                질적 연구(Qualitative Research)는 단순한 텍스트 요약이 아닙니다. 참여자의 날것 그대로의 구어체 속에서 
                심층적 맥락(In-vivo Quote)을 발굴하고, Strauss & Corbin의 패러다임 축 코딩과 Braun & Clarke의 주제 분석 기준을 
                엄격히 충족해야만 학위 논문 심사와 학술지 피어리뷰를 통과할 수 있습니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-teal-800/40">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/30 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">IRB 생명윤리 로컬 보안</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  환자 인터뷰, 취약계층, 인사 고과 등 민감 데이터를 외부 상용 LLM 서버로 전송하지 않아 연구윤리 서약 위반 및 데이터 유출 리스크를 원천 차단합니다.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/30 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Network className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">근거이론 패러다임 매트릭스</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  인과적 조건, 맥락, 중심 현상, 중재 조건, 상호작용 전략, 결과로 이어지는 6대 축 코딩 다이어그램을 자동으로 생성하여 논문 작성 시간을 80% 단축합니다.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/30 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">KCI / SSCI 표준 표 자동 생성</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  연구 결과 장에 삽입할 참여자 특성표(표 4-1)와 범주별 핵심 인용구 매트릭스(표 4-2)를 APA 7th 양식의 Markdown과 LaTeX로 1클릭 복사합니다.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 5. Footer */}
      <footer className="w-full border-t border-gray-200 bg-white py-8 px-4 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900">QualiKo AI</span>
            <span>—</span>
            <span>Korean Qualitative Research Transcript Analysis & Grounded Theory Workspace</span>
          </div>

          <div className="flex items-center gap-4 text-gray-600 font-medium">
            <button onClick={() => setIsPricingModalOpen(true)} className="hover:text-emerald-700 cursor-pointer">
              연구자 요금제
            </button>
            <button onClick={() => setIsIrbModalOpen(true)} className="hover:text-emerald-700 cursor-pointer">
              IRB 보안 서약서
            </button>
            <a
              href="https://github.com/ferrariclec16/quali-ko-ai"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-900"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <GroundedTheoryModal
        isOpen={isParadigmModalOpen}
        onClose={() => setIsParadigmModalOpen(false)}
        codes={codes}
        allSegments={allSegments}
      />

      <PaperExportModal
        isOpen={isPaperModalOpen}
        onClose={() => setIsPaperModalOpen(false)}
        transcript={currentTranscript}
        codes={codes}
      />

      <IrbComplianceModal
        isOpen={isIrbModalOpen}
        onClose={() => setIsIrbModalOpen(false)}
      />

      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
      />
    </div>
  );
}
