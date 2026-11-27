export type ThemeName = 'light' | 'dark';
export type ColorKey =
  | 'primary'
  | 'onPrimary'
  | 'accent'
  | 'background'
  | 'surface'
  | 'surfaceAlt'
  | 'secondary'
  | 'third'
  | 'border'
  | 'text'
  | 'muted'
  | 'hover'
  | 'danger';
export type HeadingSize = 'large' | 'medium' | 'small';
export type ButtonSize = 'large' | 'medium' | 'small';
export type ButtonScheme = 'primary' | 'normal' | 'like';
export type LayoutWidth = 'large' | 'medium' | 'small';
export type MediaQuery = 'mobile' | 'tablet' | 'desktop';

export interface Theme {
  name: ThemeName;
  color: Record<ColorKey, string>;
  font: {
    sans: string;
    serif: string;
  };
  heading: {
    [key in HeadingSize]: {
      fontSize: string;
    };
  };
  button: {
    [key in ButtonSize]: {
      fontSize: string;
      padding: string;
    };
  };
  buttonScheme: {
    [key in ButtonScheme]: {
      color: string;
      backgroundColor: string;
      border: string;
      hoverBackgroundColor: string;
    };
  };
  borderRadius: {
    default: string;
    large: string;
    pill: string;
  };
  shadow: {
    small: string;
    medium: string;
    large: string;
  };
  layout: {
    width: {
      [key in LayoutWidth]: string;
    };
  };
  mediaQuery: {
    [key in MediaQuery]: string;
  };
}

const common = {
  font: {
    sans: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif",
    serif: "'Noto Serif KR', 'Nanum Myeongjo', serif",
  },
  heading: {
    large: { fontSize: '2rem' },
    medium: { fontSize: '1.375rem' },
    small: { fontSize: '1.0625rem' },
  },
  button: {
    large: { fontSize: '1.0625rem', padding: '0.95rem 1.75rem' },
    medium: { fontSize: '0.9375rem', padding: '0.6rem 1.1rem' },
    small: { fontSize: '0.8125rem', padding: '0.35rem 0.7rem' },
  },
  borderRadius: {
    default: '10px',
    large: '18px',
    pill: '999px',
  },
  layout: {
    width: {
      large: '1180px',
      medium: '760px',
      small: '400px',
    },
  },
  mediaQuery: {
    mobile: '(max-width: 768px)',
    tablet: '(max-width: 1024px)',
    desktop: '(min-width: 1025px)',
  },
};

export const light: Theme = {
  ...common,
  name: 'light',
  color: {
    primary: '#1F3A34',
    onPrimary: '#FBF7F0',
    accent: '#C8553D',
    background: '#FAF7F2',
    surface: '#FFFFFF',
    surfaceAlt: '#F3EEE6',
    secondary: '#8A8378',
    third: '#2E7D5B',
    border: '#E7E1D7',
    text: '#1C1A17',
    muted: '#6E685F',
    hover: '#F1ECE3',
    danger: '#C0392B',
  },
  buttonScheme: {
    primary: {
      color: '#FBF7F0',
      backgroundColor: '#1F3A34',
      border: '#1F3A34',
      hoverBackgroundColor: '#2C5249',
    },
    normal: {
      color: '#1C1A17',
      backgroundColor: '#FFFFFF',
      border: '#E7E1D7',
      hoverBackgroundColor: '#F1ECE3',
    },
    like: {
      color: '#FFFFFF',
      backgroundColor: '#C8553D',
      border: '#C8553D',
      hoverBackgroundColor: '#B34A34',
    },
  },
  shadow: {
    small: '0 1px 2px rgba(28, 26, 23, 0.06)',
    medium: '0 6px 20px -6px rgba(28, 26, 23, 0.14)',
    large: '0 20px 40px -12px rgba(28, 26, 23, 0.22)',
  },
};

export const dark: Theme = {
  ...common,
  name: 'dark',
  color: {
    primary: '#9CC7B5',
    onPrimary: '#10201C',
    accent: '#E9806A',
    background: '#121110',
    surface: '#1B1A18',
    surfaceAlt: '#22211E',
    secondary: '#8F897F',
    third: '#7FC8A2',
    border: '#2E2C28',
    text: '#F1EDE6',
    muted: '#A39E95',
    hover: '#26241F',
    danger: '#F07167',
  },
  buttonScheme: {
    primary: {
      color: '#10201C',
      backgroundColor: '#9CC7B5',
      border: '#9CC7B5',
      hoverBackgroundColor: '#B3D6C7',
    },
    normal: {
      color: '#F1EDE6',
      backgroundColor: '#1B1A18',
      border: '#34322D',
      hoverBackgroundColor: '#26241F',
    },
    like: {
      color: '#1B1A18',
      backgroundColor: '#E9806A',
      border: '#E9806A',
      hoverBackgroundColor: '#F09580',
    },
  },
  shadow: {
    small: '0 1px 2px rgba(0, 0, 0, 0.4)',
    medium: '0 6px 20px -6px rgba(0, 0, 0, 0.6)',
    large: '0 20px 40px -12px rgba(0, 0, 0, 0.7)',
  },
};

export const getTheme = (themeName: ThemeName): Theme => {
  switch (themeName) {
    case 'light':
      return light;
    case 'dark':
      return dark;
  }
};
