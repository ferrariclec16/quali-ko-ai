'use client';

import React from 'react';
import { X, Check, BookOpen, GraduationCap, Users, Building, ShieldCheck } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PricingModal({ isOpen, onClose }: PricingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 text-white flex items-center justify-between">
          <div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              외산 툴(MAXQDA) 대비 80% 이상 절감
            </span>
            <h3 className="text-xl font-black mt-1">
              한국 연구자 맞춤형 질적연구 분석 요금제
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              외산 소프트웨어의 비싼 구독료와 번역투 AI 한계를 벗어나, 한국어 구어체와 KCI 논문 양식에 최적화된 연구를 시작하세요.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Plan 1: Graduate Student Thesis */}
          <div className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                <span>석박사 논문 통과 플랜</span>
              </div>
              <h4 className="text-base font-bold text-gray-900 mt-1">Graduate Thesis</h4>
              <p className="text-xs text-gray-500 mt-1">
                학위 논문이나 학술지 게재를 준비 중인 대학원생 및 1인 독립 연구자
              </p>

              <div className="mt-4 pb-4 border-b border-gray-200">
                <span className="text-2xl font-black text-gray-900">₩19,000</span>
                <span className="text-xs text-gray-500 ml-1">/ 월 (학기권 ₩59,000)</span>
              </div>

              <ul className="mt-4 space-y-2.5 text-xs text-gray-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>무제한 전사본 텍스트 코딩 & 인용구 추출</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>근거이론 패러다임 매트릭스 시각화</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>KCI / SSCI 제4장 표(APA 7th) 무제한 출력</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>IRB 제출용 데이터 비식별화 보안 서약서 발급</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => alert('석박사 논문 플랜 7일 무료 체험이 시작되었습니다.')}
              className="w-full py-2.5 text-xs font-bold text-gray-700 bg-white hover:bg-gray-100 border border-gray-200 rounded-xl transition cursor-pointer shadow-sm"
            >
              7일 무료 체험 시작
            </button>
          </div>

          {/* Plan 2: Research Lab (Recommended) */}
          <div className="p-5 rounded-2xl border-2 border-emerald-600 bg-emerald-50/20 relative flex flex-col justify-between space-y-4 shadow-lg shadow-emerald-600/10">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[10px] font-black uppercase tracking-wider shadow">
              연구실 최다 선택
            </span>

            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>연구실 & 공동 연구자</span>
              </div>
              <h4 className="text-base font-bold text-gray-900 mt-1">Research Lab & Co-work</h4>
              <p className="text-xs text-gray-500 mt-1">
                지도교수, 연구원 5인 이상이 참여하는 공동 질적연구 및 국책 과제
              </p>

              <div className="mt-4 pb-4 border-b border-emerald-100">
                <span className="text-2xl font-black text-gray-900">₩79,000</span>
                <span className="text-xs text-gray-500 ml-1">/ 월 (최대 5인 공유)</span>
              </div>

              <ul className="mt-4 space-y-2.5 text-xs text-gray-700">
                <li className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>최대 5인 연구원 공동 코딩 & 코드북 동기화</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>코더 간 일치도 (Cohen's Kappa) 자동 산출</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>동시 출현 빈도 네트워크(Co-occurrence) 분석</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>연구비 정산용 전자세금계산서 자동 발행</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => alert('연구실 플랜 도입 신청이 접수되었습니다.')}
              className="w-full py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition cursor-pointer shadow-md shadow-emerald-600/30"
            >
              연구실 플랜 신청하기
            </button>
          </div>

          {/* Plan 3: University Enterprise */}
          <div className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <Building className="w-4 h-4 text-emerald-600" />
                <span>대학 및 국책 연구원</span>
              </div>
              <h4 className="text-base font-bold text-gray-900 mt-1">Campus Enterprise</h4>
              <p className="text-xs text-gray-500 mt-1">
                대학교 산학협력단, 국책 싱크탱크(KEDI, 보사연, KISDI 등) 기관 라이선스
              </p>

              <div className="mt-4 pb-4 border-b border-gray-200">
                <span className="text-2xl font-black text-gray-900">₩2,400,000</span>
                <span className="text-xs text-gray-500 ml-1">/ 연간 계약</span>
              </div>

              <ul className="mt-4 space-y-2.5 text-xs text-gray-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>소속 단과대 학생/교원 전원 무제한 사용</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>기관 폐쇄망(Private On-premise) 배포 지원</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>질적 연구방법론 학술 세미나 1회 무료 제공</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>산학협력 연구과제 계약 및 조달 등록 연계</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => alert('기관 라이선스 문의가 접수되었습니다.')}
              className="w-full py-2.5 text-xs font-bold text-gray-700 bg-white hover:bg-gray-100 border border-gray-200 rounded-xl transition cursor-pointer shadow-sm"
            >
              기관 도입 문의
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-gray-200 text-center text-xs text-gray-500">
          모든 결제는 연구비 카드(신용/체크), 산학협력단 세금계산서 결제를 지원합니다.
        </div>
      </div>
    </div>
  );
}
