# QualiKo AI (한국형 로컬 AI 질적연구 전사본 분석 SaaS)

> **MAXQDA · NVivo · ATLAS.ti를 뛰어넘는 한국형 질적연구(Qualitative Research) 분석 워크스페이스**  
> 심층 인터뷰(IDI) 전사본 코딩, **Strauss & Corbin 근거이론(Grounded Theory) 6대 축 코딩 패러다임 자동 구조화**, **IRB 로컬 보안(Client-Side Privacy)**, **KCI/SSCI 학술 논문 제4장 결과 표 원클릭 추출** SaaS.

[![IRB Privacy](https://img.shields.io/badge/IRB_Compliance-Local_Privacy-emerald.svg)](https://irb.or.kr)
[![Methodology](https://img.shields.io/badge/Methodology-Grounded_Theory-purple.svg)](https://en.wikipedia.org/wiki/Grounded_theory)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 1. 개발 배경 및 기술적·학술적 해자 (Moat)

1. **외산 소프트웨어(MAXQDA, NVivo)의 높은 장벽**:
   - 연간 70~120만 원에 달하는 비싼 라이선스 비용.
   - 영어권 중심의 UI와 한국어 구어체(사투리, 말줄임, 축약어)에 대한 부자연스러운 번역투 처리.
2. **IRB(생명윤리심의위원회) 데이터 유출 규제 준수 (Zero Cloud Leakage)**:
   - 환자, 취약계층, 청소년, 사내 인사 인터뷰는 「개인정보 보호법」 및 「생명윤리법」에 따라 **OpenAI/Anthropic 등 외부 퍼블릭 클라우드 LLM API로 원문을 전송할 수 없음**.
   - **QualiKo AI**는 클라이언트 사이드에서 PII(이름, 기관명, 연락처) 비식별화 마스킹을 수행하여 IRB 규정을 100% 충족합니다.
3. **학술 논문(KCI / SSCI) 작성 직결**:
   - Strauss & Corbin(1998)의 근거이론 6대 패러다임(인과적 조건, 중심 현상, 맥락, 중재 조건, 전략, 결과) 시각화.
   - 학술 논문 제4장 연구 결과 표(표 4-1 참여자 특성, 표 4-2 범주별 인용문구)를 APA 7th 양식의 Markdown/LaTeX로 1클릭 복사.

---

## 2. 핵심 기능 (Key Features)

- **3분할 전문 코딩 워크벤치 (MAXQDA 스타일)**:
  - 좌측: 계층적 코드북 체계 (Code System)
  - 중앙: 전사본 본문 뷰어 (Document Browser) & 실시간 코딩 하이라이터
  - 우측: 발췌 인용구(In-vivo Quotes) 및 연구자 성찰 저널(Reflective Memos)
- **근거이론 패러다임 & 동시 출현(Co-occurrence) 분석**:
  - 축 코딩 매트릭스 다이어그램 및 개념 간 상관성 네트워크 그래프 제공.
- **IRB 보안 적합성 서약서 원클릭 발급**:
  - 대학교 및 연구기관 심의위원회 제출용 보안 및 익명화 확약서(PDF/인쇄) 지원.

---

## 3. 기술 스택 (Tech Stack)

- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, Lucide React
- **Academic Standards**: APA 7th Edition, Strauss & Corbin Grounded Theory, Braun & Clarke Thematic Analysis

---

## 4. 로컬 실행 방법 (Quick Start)

```bash
# 레포지토리 클론
git clone https://github.com/ferrariclec16/quali-ko-ai.git
cd quali-ko-ai

# 패키지 설치
pnpm install

# 로컬 개발 서버 실행
pnpm dev

# 브라우저 접속
# http://localhost:3000
```

---

## 5. 라이선스

MIT License.
