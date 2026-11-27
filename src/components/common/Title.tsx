import { styled } from 'styled-components';
import { ColorKey, HeadingSize, Theme } from '../../style/theme';

interface Props {
  children: React.ReactNode;
  size: HeadingSize;
  color?: ColorKey;
}

export default function Title({ children, size, color }: Props) {
  return (
    <TitleStyle $size={size} $color={color}>
      {children}
    </TitleStyle>
  );
}

interface TitleStyleProps {
  $size: HeadingSize;
  $color?: ColorKey;
}

type TitleStyleArgs = TitleStyleProps & { theme: Theme };

const TitleStyle = styled.h1<TitleStyleProps>`
  font-family: ${({ theme }: TitleStyleArgs) => theme.font.serif};
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.03em;
  word-break: keep-all;
  font-size: ${({ theme, $size }: TitleStyleArgs) =>
    theme.heading[$size].fontSize};
  color: ${({ theme, $color }: TitleStyleArgs) =>
    $color ? theme.color[$color] : theme.color.text};
`;
