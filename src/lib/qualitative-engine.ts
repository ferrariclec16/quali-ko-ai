import { CodeItem, CodedSegment, GroundedTheoryParadigm, InterviewTranscript } from './types';

/**
 * 연구 대상자 보호를 위한 PII(개인식별정보) 자동 비식별화 (IRB 규정 준수)
 */
export function deidentifyTranscript(text: string): { sanitizedText: string; redactedCount: number } {
  let count = 0;
  let result = text;

  // 1. 전화번호 마스킹
  const phoneRegex = /01[016789]-?\d{3,4}-?\d{4}/g;
  result = result.replace(phoneRegex, () => {
    count++;
    return '[010-****-****]';
  });

  // 2. 주민등록번호 / 외국인등록번호 패턴 마스킹
  const rrnRegex = /\d{6}-?[1-4]\d{6}/g;
  result = result.replace(rrnRegex, () => {
    count++;
    return '[생년월일-*******]';
  });

  // 3. 특정 고유 병원/대학/기관명 마스킹
  const orgRegex = /(서울대병원|세브란스병원|아산병원|삼성서울병원|가톨릭성모병원|고려대병원|한양대병원|경희대병원|중앙대병원|부산대병원|경북대병원|전남대병원|충남대병원)/g;
  result = result.replace(orgRegex, () => {
    count++;
    return '[상급종합 A병원]';
  });

  // 4. 이메일 주소 마스킹
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  result = result.replace(emailRegex, () => {
    count++;
    return '[이메일 비식별화]';
  });

  return { sanitizedText: result, redactedCount: count };
}

/**
 * Strauss & Corbin 근거이론(Grounded Theory) 패러다임 매트릭스 구성
 */
export function buildGroundedTheoryParadigm(codes: CodeItem[]): GroundedTheoryParadigm {
  return {
    causalConditions: codes.filter((c) => c.category === 'CAUSAL'),
    contextualConditions: codes.filter((c) => c.category === 'CONTEXTUAL'),
    centralPhenomenon: codes.filter((c) => c.category === 'CENTRAL'),
    interveningConditions: codes.filter((c) => c.category === 'STRATEGY' && c.name.includes('완충') || c.category === 'STRATEGY' && c.name.includes('지지')),
    strategies: codes.filter((c) => c.category === 'STRATEGY' && !c.name.includes('완충') && !c.name.includes('지지')),
    consequences: codes.filter((c) => c.category === 'CONSEQUENCE'),
  };
}

/**
 * KCI / SSCI 학술 논문 제4장 [연구 결과] 표준 표 (Markdown & LaTeX 변환용)
 */
export function generateAcademicFindingsMarkdown(
  transcript: InterviewTranscript,
  codes: CodeItem[]
): string {
  let md = `# [연구 결과] 질적 분석 주제 및 범주화 매트릭스\n\n`;
  md += `**연구 주제**: ${transcript.topic}\n`;
  md += `**분석 대상**: ${transcript.interviewee} (인터뷰 소요시간: ${transcript.demographics.durationMinutes}분)\n\n`;

  md += `### <표 4-2> 근거이론 패러다임에 따른 범주 및 개념 분석\n\n`;
  md += `| 패러다임 영역 | 범주 (Category) | 빈도 | 개념 정의 및 핵심 속성 | 대표 원문 인용 (In-vivo Quotes) |\n`;
  md += `| :--- | :--- | :---: | :--- | :--- |\n`;

  codes.forEach((c) => {
    const quote = c.inVivoQuotes.length > 0 ? `"${c.inVivoQuotes[0]}"` : '-';
    md += `| **${c.categoryLabel}** | ${c.name} | ${c.frequency}회 | ${c.definition} | ${quote} |\n`;
  });

  md += `\n> *주: 본 표는 Strauss & Corbin(1998)의 근거이론 방법론 및 Braun & Clarke(2006)의 주제 분석 절차를 준용하여 QualiKo AI 워크스페이스에서 도출되었습니다.*\n`;

  return md;
}

/**
 * 코드 간 동시 출현(Co-occurrence) 빈도 계산
 */
export function calculateCoOccurrence(
  codes: CodeItem[],
  allSegments: CodedSegment[]
): { source: string; target: string; weight: number }[] {
  // 동일한 문단(paragraphIndex)에 동시에 태깅된 코드 쌍 탐색
  const map: Record<string, number> = {};

  const byParagraph: Record<number, string[]> = {};
  allSegments.forEach((seg) => {
    if (!byParagraph[seg.paragraphIndex]) {
      byParagraph[seg.paragraphIndex] = [];
    }
    if (!byParagraph[seg.paragraphIndex].includes(seg.codeId)) {
      byParagraph[seg.paragraphIndex].push(seg.codeId);
    }
  });

  Object.values(byParagraph).forEach((codeIds) => {
    if (codeIds.length < 2) return;
    for (let i = 0; i < codeIds.length; i++) {
      for (let j = i + 1; j < codeIds.length; j++) {
        const key = [codeIds[i], codeIds[j]].sort().join('___');
        map[key] = (map[key] || 0) + 1;
      }
    }
  });

  const results: { source: string; target: string; weight: number }[] = [];
  Object.entries(map).forEach(([key, weight]) => {
    const [idA, idB] = key.split('___');
    const codeA = codes.find((c) => c.id === idA);
    const codeB = codes.find((c) => c.id === idB);
    if (codeA && codeB) {
      results.push({
        source: codeA.name,
        target: codeB.name,
        weight,
      });
    }
  });

  return results.sort((a, b) => b.weight - a.weight);
}
