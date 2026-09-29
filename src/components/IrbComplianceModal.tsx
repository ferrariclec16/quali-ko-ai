'use client';

import React from 'react';
import { X, ShieldCheck, Printer, CheckCircle, Lock, Award, FileCheck } from 'lucide-react';

interface IrbComplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function IrbComplianceModal({ isOpen, onClose }: IrbComplianceModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base">IRB 생명윤리심의위원회 제출용 보안 적합성 서약서</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-800 text-emerald-200 border border-emerald-500/30">
                  연구윤리 인증
                </span>
              </div>
              <p className="text-xs text-emerald-200">
                개인정보보호법 및 생명윤리법에 따른 클라이언트 로컬 분석 증명
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

        {/* Certificate Body (Printable) */}
        <div className="p-8 overflow-y-auto space-y-6 text-xs text-gray-800 font-sans print:p-0">
          <div className="text-center border-b-2 border-emerald-800 pb-4">
            <span className="text-[10px] font-mono tracking-widest text-emerald-800 font-bold uppercase">
              INSTITUTIONAL REVIEW BOARD (IRB) DATA INTEGRITY COMPLIANCE
            </span>
            <h2 className="text-lg font-black text-gray-900 mt-1">
              질적연구 대상자 개인정보 비식별화 및 로컬 데이터 보안 확약서
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              서약서 발급번호: QLK-IRB-2026-KR-{Date.now().toString().slice(-6)}
            </p>
          </div>

          {/* Statement */}
          <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 leading-relaxed space-y-2">
            <p className="font-medium text-emerald-950">
              본 서약서는 <strong>QualiKo AI</strong> 연구 지원 워크스페이스를 활용하여 질적 인터뷰(심층 인터뷰 IDI, 초점집단면접 FGI) 전사본을 분석함에 있어, 
              「생명윤리 및 안전에 관한 법률」 제15조 및 「개인정보 보호법」 제18조의 연구윤리 지침을 충실히 준수하고 있음을 보증합니다.
            </p>
          </div>

          {/* Technical Compliance Clauses */}
          <div className="space-y-3">
            <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wide flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              보안 및 연구윤리 기술 준수 항목
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                <span className="font-bold text-gray-900 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  1. 제3자 클라우드 원문 전송 차단
                </span>
                <p className="text-[11px] text-gray-600">
                  전사본 원문 데이터는 외부 상용 거대언어모델(OpenAI, Anthropic 등)의 학습 데이터로 수집되지 않으며, 사용자 로컬 세션 내에서 암호화 처리됩니다.
                </p>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                <span className="font-bold text-gray-900 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  2. PII 개인식별정보 원천 마스킹
                </span>
                <p className="text-[11px] text-gray-600">
                  연구 참여자의 실명, 전화번호, 근무 기관명, 상세 주소는 정규식 알고리즘에 의해 자동 난수화 및 익명화 코드로 치환됩니다.
                </p>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                <span className="font-bold text-gray-900 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  3. 연구자 성찰 저널 감사 추적
                </span>
                <p className="text-[11px] text-gray-600">
                  코더 간 주관성 개입을 최소화하기 위해 모든 코딩 세그먼트와 연구자 메모의 생성 시간 및 변경 이력을 투명하게 기록합니다.
                </p>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                <span className="font-bold text-gray-900 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  4. 암호화 보관 및 연구 종료 후 파기
                </span>
                <p className="text-[11px] text-gray-600">
                  연구 종료 시 논문 심사용 표를 출력한 후, 로컬 캐시 및 세션 데이터를 원클릭으로 영구 완전 삭제(Shredding)할 수 있습니다.
                </p>
              </div>
            </div>
          </div>

          {/* Signature Box */}
          <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-600">
            <div>
              <span>발급 기관: </span>
              <strong className="text-gray-900">QualiKo AI 연구윤리검증실</strong>
            </div>
            <div className="mt-2 sm:mt-0 font-medium">
              서약 일자: {new Date().toLocaleDateString('ko-KR')}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <span className="text-[11px] text-gray-500">
            * 각 대학교 및 기관 생명윤리심의위원회(IRB) 신청서의 첨부서류로 제출 가능합니다.
          </span>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>서약서 인쇄 / PDF 저장</span>
          </button>
        </div>
      </div>
    </div>
  );
}
