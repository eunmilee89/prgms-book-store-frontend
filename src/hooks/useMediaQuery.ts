import { getTheme } from '@/style/theme';
import { useEffect, useState } from 'react';

const MOBILE_QUERY = getTheme('light').mediaQuery.mobile;

export const useMediaQuery = () => {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(MOBILE_QUERY).matches
  );

  useEffect(() => {
    const isMobileQuery = window.matchMedia(MOBILE_QUERY);
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    setIsMobile(isMobileQuery.matches);
    // 화면 크기가 바뀔 때마다 다시 판단 (회전, 창 크기 조절 등)
    isMobileQuery.addEventListener('change', handleChange);
    return () => isMobileQuery.removeEventListener('change', handleChange);
  }, []);

  return { isMobile };
};
