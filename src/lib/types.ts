export interface CodedSegment {
  id: string;
  transcriptId: string;
  paragraphIndex: number;
  selectedText: string;
  codeId: string;
  memo?: string;
  createdAt: string;
}

export interface CodeItem {
  id: string;
  name: string;
  category: 'CAUSAL' | 'CONTEXTUAL' | 'CENTRAL' | 'STRATEGY' | 'CONSEQUENCE' | 'GENERAL';
  categoryLabel: string;
  color: string;
  definition: string;
  frequency: number;
  inVivoQuotes: string[];
}

export interface TranscriptParagraph {
  id: string;
  speaker: string; // e.g., '연구자', '참여자 A (7년차 간호사)'
  timestamp: string;
  text: string;
  codedSegments: CodedSegment[];
}

export interface InterviewTranscript {
  id: string;
  title: string;
  interviewee: string;
  demographics: {
    gender: string;
    careerYears: number;
    role: string;
    interviewDate: string;
    durationMinutes: number;
  };
  topic: string;
  paragraphs: TranscriptParagraph[];
}

export interface GroundedTheoryParadigm {
  causalConditions: CodeItem[];      // 인과적 조건
  contextualConditions: CodeItem[];  // 맥락적 조건
  centralPhenomenon: CodeItem[];     // 중심 현상
  interveningConditions: CodeItem[]; // 중재적 조건
  strategies: CodeItem[];            // 작용/상호작용 전략
  consequences: CodeItem[];          // 결과
}

export interface ThematicCluster {
  themeName: string;
  subThemes: {
    name: string;
    codes: CodeItem[];
    verbatimQuote: string;
  }[];
}
