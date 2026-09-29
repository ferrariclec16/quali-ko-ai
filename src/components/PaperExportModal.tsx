'use client';

import React, { useState } from 'react';
import { X, Copy, Check, Printer, FileText, Download, Table } from 'lucide-react';
import { CodeItem, InterviewTranscript } from '@/lib/types';
import { generateAcademicFindingsMarkdown } from '@/lib/qualitative-engine';

interface PaperExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  transcript: InterviewTranscript;
  codes: CodeItem[];
}

export function PaperExportModal({
  isOpen,
  onClose,
  transcript,
  codes,
}: PaperExportModalProps) {
  const [copiedMd, setCopiedMd] = useState(false);
  const [copiedLatex, setCopiedLatex] = useState(false);

  if (!isOpen) return null;

  const markdownContent = generateAcademicFindingsMarkdown(transcript, codes);

  const handleCopyMd = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const handleCopyLatex = () => {
    const latex = `% KCI / SSCI 논문 양식 제4장 결과 표
\\begin{table}[htbp]
\\centering
\\caption{근거이론 패러다임에 따른 범주 및 개념 분석}
\\begin{tabular}{llclp{6cm}}
\\hline
\\textbf{영역} & \\textbf{범주} & \\textbf{빈도} & \\textbf{대표 원문 인용} \\\\
\\hline
${codes
  .map(
    (c) =>
      `${c.categoryLabel} & ${c.name} & ${c.frequency} & "${c.inVivoQuotes[0] || '-'}" \\\\`
  )
  .join('\n')}
\\hline
\\end{tabular}
\\end{table}`;

    navigator.clipboard.writeText(latex);
    setCopiedLatex(true);
    setTimeout(() => setCopiedLatex(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <Table className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h3 className="font-extrabold text-base">학술 논문(KCI / SSCI) 제4장 연구 결과 표 추출</h3>
              <p className="text-xs text-emerald-200">
                APA 7th 에디션 및 국내 등재학술지 표준 표 양식으로 즉시 내보내기
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-gray-800">
          {/* Table 1: Demographics */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-gray-900 text-sm">
                &lt;표 4-1&gt; 연구 참여자의 일반적 특성
              </h4>
              <span className="text-[11px] text-gray-400">IRB 익명 식별자 적용</span>
            </div>

            <div className="border border-gray-200 rounded-xl overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold">
                  <tr>
                    <th className="px-4 py-2.5">참여자 ID</th>
                    <th className="px-4 py-2.5">성별</th>
                    <th className="px-4 py-2.5">경력 (연차)</th>
                    <th className="px-4 py-2.5">담당 직무</th>
                    <th className="px-4 py-2.5">인터뷰 일시</th>
                    <th className="px-4 py-2.5 text-right">인터뷰 시간</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3 font-bold text-gray-900">{transcript.interviewee}</td>
                    <td className="px-4 py-3">{transcript.demographics.gender}</td>
                    <td className="px-4 py-3 font-semibold">{transcript.demographics.careerYears}년</td>
                    <td className="px-4 py-3 text-gray-600">{transcript.demographics.role}</td>
                    <td className="px-4 py-3 text-gray-500 font-mono">{transcript.demographics.interviewDate}</td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-emerald-700">
                      {transcript.demographics.durationMinutes}분
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Table 2: Thematic Findings with In-vivo Quotes */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-gray-900 text-sm">
                &lt;표 4-2&gt; 질적 분석 범주 및 대표 원문 인용문구 (In-vivo Quotes)
              </h4>
              <span className="text-[11px] text-gray-400">총 {codes.length}개 핵심 범주</span>
            </div>

            <div className="border border-gray-200 rounded-xl overflow-x-auto max-h-[380px]">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold sticky top-0">
                  <tr>
                    <th className="px-3.5 py-2.5">패러다임 영역</th>
                    <th className="px-3.5 py-2.5">범주 (Category)</th>
                    <th className="px-3.5 py-2.5 text-center">출현 빈도</th>
                    <th className="px-4 py-2.5">개념 정의</th>
                    <th className="px-4 py-2.5">대표 원문 인용 (In-vivo Quotes)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {codes.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/70 transition">
                      <td className="px-3.5 py-3 font-bold text-emerald-800 whitespace-nowrap">
                        {c.categoryLabel}
                      </td>
                      <td className="px-3.5 py-3 font-bold text-gray-900 whitespace-nowrap">
                        {c.name}
                      </td>
                      <td className="px-3.5 py-3 text-center">
                        <span className="px-2 py-0.5 rounded-full bg-gray-100 font-mono font-bold text-gray-700">
                          {c.frequency}회
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 max-w-xs leading-relaxed text-[11px]">
                        {c.definition}
                      </td>
                      <td className="px-4 py-3 font-serif italic text-gray-800 bg-amber-50/30 text-[11px] leading-relaxed">
                        {c.inVivoQuotes.length > 0 ? `"${c.inVivoQuotes[0]}"` : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-gray-500">
            * 한글 HWP, MS Word, Overleaf(LaTeX) 문서에 서식 그대로 붙여넣을 수 있습니다.
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMd}
              className="px-3.5 py-2 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-100 border border-gray-200 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              {copiedMd ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copiedMd ? 'Markdown 복사됨' : 'Markdown 표 복사'}</span>
            </button>

            <button
              onClick={handleCopyLatex}
              className="px-3.5 py-2 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-100 border border-gray-200 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              {copiedLatex ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLatex ? 'LaTeX 복사됨' : 'LaTeX 표 복사'}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>보고서 인쇄</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
