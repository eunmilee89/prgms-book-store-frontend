// public/images/covers 에 있는 표지 이미지 개수
export const COVER_COUNT = 12;
export const NO_COVER_SRC = '/images/covers/no-cover.svg';

const normalize = (img: number) => {
  const n = Number.isFinite(img) ? Math.abs(Math.trunc(img)) : 0;
  return n % COVER_COUNT;
};

export const getImgSrc = (img: number) => {
  return `/images/covers/cover-${normalize(img) + 1}.svg`;
};

// 홀수 번째 표지는 어두운 배경, 짝수 번째 표지는 밝은 배경
export const getCoverInk = (img: number) => {
  return normalize(img) % 2 === 0 ? '#FBF7F0' : '#1C1A17';
};
