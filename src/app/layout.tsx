import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'QualiKo AI - 한국형 로컬 AI 질적연구 전사본 분석 & 근거이론 코딩 SaaS',
  description:
    '한국어 심층 인터뷰(IDI) 전사본 분석, Strauss & Corbin 근거이론 패러다임 매트릭스, Braun & Clarke 주제 분석, IRB 로컬 보안 비식별화 및 KCI/SSCI 학술 논문 표 자동 생성 워크스페이스',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full antialiased bg-slate-50 text-slate-900">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
