import Term from './model/Term';

// id.snucse.org privacy policy
export const privacy = {
  termId: 0,
  name: 'privacy-policy',
  title: {
    ko: '개인정보처리방침',
    en: 'Privacy policy',
  },
  currentRevision: 0,
  contents: [],
};

// www.snucse.org terms of use
export const snucseTerm = {
  termId: 1,
  name: 'snucse-tos',
  title: {
    ko: '컴퓨터공학부 커뮤니티 이용약관',
    en: 'SNUCSE Terms of Service',
  },
  currentRevision: 0,
  contents: [],
};

// @snucse.org mail term
export const emailTerm = {
  termId: 2,
  name: 'snucse-mail-tos',
  title: {
    ko: 'SNUCSE 메일 서비스 이용약관',
    en: 'SNUCSE Mail Terms of Service',
  },
  currentRevision: 0,
  contents: [],
};

export const appDevTerm = {
  termId: 3,
  name: 'app-developer-guideline',
  title: {
    ko: '앱 개발자 지침',
    en: 'Guideline for app developers',
  },
  currentRevision: 0,
  contents: [],
};

export const classTerm = {
  termId: 4,
  name: 'class-tos',
  title: {
    ko: '실습 지원 이용약관',
    en: 'Classroom Terms of Service',
  },
  currentRevision: 0,
  contents: [],
};

export const advancedTerm = {
  termId: 5,
  name: 'advanced-guideline',
  title: {
    ko: '고급 실습 자원 이용규칙',
    en: 'Guideline for advanced resources'
  },
  currentRevision: 0,
  contents: [],
};

export const serverTerm = {
  termId: 6,
  name: 'server-guideline',
  title: {
    ko: '실습 서버 이용규칙',
    en: 'Guideline for using servers',
  },
  currentRevision: 0,
  contents: [],
};

export const pcTerm = {
  termId: 7,
  name: 'lab-pc-guideline',
  title: {
    ko: '실습실 PC 이용규칙',
    en: 'Guideline for using lab PCs'
  },
  currentRevision: 0,
  contents: [],
};

export const terms: Array<Term> = [
  privacy,
  snucseTerm,
  emailTerm,
  appDevTerm,
  classTerm,
  advancedTerm,
  serverTerm,
  pcTerm,
];