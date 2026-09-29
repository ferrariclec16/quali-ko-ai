import { CodeItem, InterviewTranscript } from './types';

export const INITIAL_CODES: CodeItem[] = [
  {
    id: 'code-1',
    name: '인력 부족과 과중한 중증도 부담',
    category: 'CAUSAL',
    categoryLabel: '인과적 조건',
    color: '#EF4444', // Red
    definition: '환자 대 간호사 비율 불균형 및 고난도 장비 처치에 따른 물리적·정신적 한계 상태',
    frequency: 14,
    inVivoQuotes: [
      '환자 1명만 어레스트(심정지) 나도 나머지 2명 투약은 전부 딜레이되고 손이 덜덜 떨려요.',
      '밥 먹을 시간은커녕 화장실 한 번 못 가고 12시간을 서서 뛰었습니다.',
    ],
  },
  {
    id: 'code-2',
    name: '투약·의료사고에 대한 상시적 공포',
    category: 'CENTRAL',
    categoryLabel: '중심 현상',
    color: '#8B5CF6', // Purple
    definition: '나의 실수 하나로 환자가 사망할 수 있다는 중압감과 법적 책임에 대한 만성적 불안',
    frequency: 18,
    inVivoQuotes: [
      '퇴근하고 침대에 누워도 내가 아까 에피네프린 용량을 제대로 확인했나 자꾸 환청이 들려요.',
      '매 순간 벼랑 끝에 서 있는 기분이었어요. 누구도 날 지켜주지 않는다는 느낌.',
    ],
  },
  {
    id: 'code-3',
    name: '폐쇄적 인수인계 및 비난 문화',
    category: 'CONTEXTUAL',
    categoryLabel: '맥락적 조건',
    color: '#F59E0B', // Amber
    definition: '실수를 학습의 기회로 삼기보다 개인의 무능으로 낙인찍는 병동 내 침묵과 압박 분위기',
    frequency: 11,
    inVivoQuotes: [
      '모르는 걸 물어보면 "그것도 학교에서 안 배웠어?"라는 핀잔부터 돌아오니 입을 닫게 돼요.',
    ],
  },
  {
    id: 'code-4',
    name: '동기 및 동료 간의 정서적 완충',
    category: 'STRATEGY',
    categoryLabel: '중재적 조건',
    color: '#10B981', // Emerald
    definition: '같은 고통을 공유하는 동기 간의 위로와 비공식적 디브리핑을 통한 버팀목 형성',
    frequency: 9,
    inVivoQuotes: [
      '동기 카톡방에서 같이 울고 욕하면서 겨우 다음 날 출근할 용기를 냈죠.',
    ],
  },
  {
    id: 'code-5',
    name: '감정 분리 및 기계적 업무 대처',
    category: 'STRATEGY',
    categoryLabel: '작용/상호작용',
    color: '#3B82F6', // Blue
    definition: '환자의 고통이나 보호자의 슬픔에 깊이 공감하지 않고 루틴 체크리스트 위주로 거리두기',
    frequency: 8,
    inVivoQuotes: [
      '어느 순간부터 환자가 사람으로 안 보이고 수행해야 할 처방 오더 목록으로만 보이더라고요.',
    ],
  },
  {
    id: 'code-6',
    name: '소명감 상실 및 번아웃 퇴사 결심',
    category: 'CONSEQUENCE',
    categoryLabel: '결과',
    color: '#EC4899', // Pink
    definition: '환자를 살리겠다는 초심의 증발과 신체적 질환(수면장애, 위장염) 발현으로 인한 사직',
    frequency: 16,
    inVivoQuotes: [
      '"내가 여기서 죽겠구나" 싶었을 때 사직서를 냈어요. 더 이상 환자를 볼 자신이 없었습니다.',
    ],
  },
];

export const MOCK_TRANSCRIPTS: InterviewTranscript[] = [
  {
    id: 'transcript-nursing-01',
    title: '중환자실 간호사 A (경력 5년 8개월) 심층 인터뷰 전사본',
    interviewee: '참여자 A (30대 초반, 삼교대 책임간호사)',
    demographics: {
      gender: '여성',
      careerYears: 5.7,
      role: '상급종합병원 중환자실(ICU) 차지 간호사',
      interviewDate: '2026-04-18',
      durationMinutes: 78,
    },
    topic: '중환자실 교대근무 간호사의 소진(Burnout) 경험과 생존 전략에 대한 질적 연구',
    paragraphs: [
      {
        id: 'p-1',
        speaker: '연구자',
        timestamp: '00:01:15',
        text: '선생님, 바쁘신 와중에 인터뷰에 응해주셔서 감사합니다. 먼저 중환자실에서 일하시면서 가장 한계에 부딪혔다고 느끼셨던 순간에 대해 편하게 말씀해 주시겠어요?',
        codedSegments: [],
      },
      {
        id: 'p-2',
        speaker: '참여자 A',
        timestamp: '00:02:40',
        text: '정말 매일이 전쟁터인데요, 특히 나이트 근무 때 환자 1명만 어레스트(심정지) 나도 나머지 2명 투약은 전부 딜레이되고 손이 덜덜 떨려요. 인공호흡기 알람은 사방에서 울리지, 승압제 용량은 계속 조절해야 하지... 밥 먹을 시간은커녕 화장실 한 번 못 가고 12시간을 서서 뛰었습니다.',
        codedSegments: [
          {
            id: 'seg-1',
            transcriptId: 'transcript-nursing-01',
            paragraphIndex: 1,
            selectedText: '환자 1명만 어레스트(심정지) 나도 나머지 2명 투약은 전부 딜레이되고 손이 덜덜 떨려요.',
            codeId: 'code-1',
            memo: '간호사 1인당 과도한 중증도 배정으로 인한 응급 대처 불능 상황 서술',
            createdAt: '2026-09-29 14:00',
          },
          {
            id: 'seg-2',
            transcriptId: 'transcript-nursing-01',
            paragraphIndex: 1,
            selectedText: '밥 먹을 시간은커녕 화장실 한 번 못 가고 12시간을 서서 뛰었습니다.',
            codeId: 'code-1',
            createdAt: '2026-09-29 14:02',
          },
        ],
      },
      {
        id: 'p-3',
        speaker: '연구자',
        timestamp: '00:05:10',
        text: '그런 육체적 과부하 상태에서 심리적으로는 어떤 감정이 가장 크게 다가왔나요?',
        codedSegments: [],
      },
      {
        id: 'p-4',
        speaker: '참여자 A',
        timestamp: '00:06:22',
        text: '공포였어요. 퇴근하고 침대에 누워도 내가 아까 에피네프린 용량을 제대로 확인했나 자꾸 환청이 들려요. 매 순간 벼랑 끝에 서 있는 기분이었어요. 누구도 날 지켜주지 않는다는 느낌. 약 하나 잘못 주입해서 환자가 잘못되면 내 인생도 끝장이라는 극심한 불안감에 시달렸죠.',
        codedSegments: [
          {
            id: 'seg-3',
            transcriptId: 'transcript-nursing-01',
            paragraphIndex: 3,
            selectedText: '퇴근하고 침대에 누워도 내가 아까 에피네프린 용량을 제대로 확인했나 자꾸 환청이 들려요.',
            codeId: 'code-2',
            memo: '외상후 스트레스에 준하는 강박적 확인 행동 및 침습적 사고',
            createdAt: '2026-09-29 14:05',
          },
          {
            id: 'seg-4',
            transcriptId: 'transcript-nursing-01',
            paragraphIndex: 3,
            selectedText: '매 순간 벼랑 끝에 서 있는 기분이었어요. 누구도 날 지켜주지 않는다는 느낌.',
            codeId: 'code-2',
            createdAt: '2026-09-29 14:06',
          },
        ],
      },
      {
        id: 'p-5',
        speaker: '참여자 A',
        timestamp: '00:11:05',
        text: '병동 분위기도 여유가 없다 보니, 모르는 걸 물어보면 "그것도 학교에서 안 배웠어?"라는 핀잔부터 돌아오니 입을 닫게 돼요. 결국 방어적으로 변하고, 어느 순간부터 환자가 사람으로 안 보이고 수행해야 할 처방 오더 목록으로만 보이더라고요. 마음을 닫지 않으면 버틸 수가 없었어요.',
        codedSegments: [
          {
            id: 'seg-5',
            transcriptId: 'transcript-nursing-01',
            paragraphIndex: 4,
            selectedText: '모르는 걸 물어보면 "그것도 학교에서 안 배웠어?"라는 핀잔부터 돌아오니 입을 닫게 돼요.',
            codeId: 'code-3',
            memo: '심리적 안전감(Psychological Safety)의 결여 및 질문 억제',
            createdAt: '2026-09-29 14:08',
          },
          {
            id: 'seg-6',
            transcriptId: 'transcript-nursing-01',
            paragraphIndex: 4,
            selectedText: '환자가 사람으로 안 보이고 수행해야 할 처방 오더 목록으로만 보이더라고요.',
            codeId: 'code-5',
            memo: '탈인격화(Depersonalization)를 통한 자기보호적 방어기제',
            createdAt: '2026-09-29 14:10',
          },
        ],
      },
      {
        id: 'p-6',
        speaker: '참여자 A',
        timestamp: '00:18:30',
        text: '그래도 입사 동기들이 있어서 버텼죠. 동기 카톡방에서 같이 울고 욕하면서 겨우 다음 날 출근할 용기를 냈죠. 하지만 결국 만성 위염에 불면증까지 겹치니까, "내가 여기서 죽겠구나" 싶었을 때 사직서를 냈어요. 더 이상 환자를 볼 자신이 없었습니다.',
        codedSegments: [
          {
            id: 'seg-7',
            transcriptId: 'transcript-nursing-01',
            paragraphIndex: 5,
            selectedText: '동기 카톡방에서 같이 울고 욕하면서 겨우 다음 날 출근할 용기를 냈죠.',
            codeId: 'code-4',
            memo: '비공식적 지지 집단(Peer Support)의 완충 효과',
            createdAt: '2026-09-29 14:12',
          },
          {
            id: 'seg-8',
            transcriptId: 'transcript-nursing-01',
            paragraphIndex: 5,
            selectedText: '"내가 여기서 죽겠구나" 싶었을 때 사직서를 냈어요. 더 이상 환자를 볼 자신이 없었습니다.',
            codeId: 'code-6',
            memo: '소명감의 완전한 소진 및 신체적 한계 도달로 인한 사직',
            createdAt: '2026-09-29 14:15',
          },
        ],
      },
    ],
  },
  {
    id: 'transcript-saas-founder-02',
    title: '초기 B2B SaaS 창업가 B (창업 2년차) 심층 인터뷰 전사본',
    interviewee: '참여자 B (30대 중반, AI 스타트업 대표)',
    demographics: {
      gender: '남성',
      careerYears: 2.2,
      role: 'B2B 테크 엔터프라이즈 솔루션 대표',
      interviewDate: '2026-05-12',
      durationMinutes: 65,
    },
    topic: '초기 B2B 스타트업 창업가의 제품-시장 적합성(PMF) 탐색과 피봇팅 경험 연구',
    paragraphs: [
      {
        id: 'p-201',
        speaker: '연구자',
        timestamp: '00:01:00',
        text: '처음 제품을 출시했을 때와 실제 고객의 반응 사이에 어떤 간극이 있었는지 말씀해 주시겠어요?',
        codedSegments: [],
      },
      {
        id: 'p-202',
        speaker: '참여자 B',
        timestamp: '00:03:15',
        text: '개발자 출신이다 보니까 기술이 훌륭하면 무조건 팔릴 거라고 믿었어요. 그런데 막상 대기업 담당자들 만나보니까 "좋은 기술인 건 알겠는데, 우리 보안 규정 통과 못하면 한 푼도 못 줍니다"라고 일갈하더라고요. 런웨이는 4개월밖에 안 남았는데 매일 피가 마르는 심정이었습니다.',
        codedSegments: [],
      },
    ],
  },
];
