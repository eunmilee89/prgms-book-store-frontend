import { useState } from 'react';
import styled from 'styled-components';
import { Theme } from '@/style/theme';
import { getCoverInk, getImgSrc, NO_COVER_SRC } from '@/utils/image';

interface Props {
  img: number;
  title: string;
  author?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function BookCover({
  img,
  title,
  author,
  size = 'medium',
  className,
}: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <StyledBookCover
      className={className}
      $ink={getCoverInk(img)}
      $size={size}
    >
      <img
        src={failed ? NO_COVER_SRC : getImgSrc(img)}
        alt={title}
        loading='lazy'
        onError={() => setFailed(true)}
      />
      {!failed && (
        // 표지 글자는 장식용이므로 CSS content로 그려 텍스트 노드 중복을 피함
        <div className='cover-text' aria-hidden='true'>
          <span className='cover-title' data-text={title} />
          {author && <span className='cover-author' data-text={author} />}
        </div>
      )}
    </StyledBookCover>
  );
}

interface StyleProps {
  $ink: string;
  $size: 'small' | 'medium' | 'large';
}


const StyledBookCover = styled.div<StyleProps>`
  position: relative;
  /* 표지 글자를 표지 너비에 비례해 키우기 위한 컨테이너 */
  container-type: inline-size;
  aspect-ratio: 5 / 7;
  width: 100%;
  overflow: hidden;
  border-radius: 4px 8px 8px 4px;
  background: ${({ theme }) => (theme as Theme).color.surfaceAlt};
  box-shadow: ${({ theme }) => (theme as Theme).shadow.medium};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .cover-text {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 4cqw;
    padding: 13% 12% 0 15%;
    pointer-events: none;
    color: ${({ $ink }) => $ink};
  }

  .cover-title::before,
  .cover-author::before {
    content: attr(data-text);
  }

  .cover-title {
    font-family: ${({ theme }) => (theme as Theme).font.serif};
    font-weight: 700;
    font-size: 11cqw;
    line-height: 1.3;
    letter-spacing: -0.02em;
    word-break: keep-all;
    overflow-wrap: anywhere;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .cover-author {
    display: ${({ $size }) => ($size === 'small' ? 'none' : 'block')};
    font-size: max(7px, 4.4cqw);
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.85;
  }
`;
