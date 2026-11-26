import { Banner as IBanner } from '@/models/banner.model';
import styled from 'styled-components';
import BannerItem from './BannerItem';
import { useEffect, useMemo, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

interface Props {
  banners: IBanner[];
}

const AUTOPLAY_DELAY = 6000;

export default function Banner({ banners }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const transFormValue = useMemo(() => {
    return currentIndex * -100;
  }, [currentIndex]);

  const handlePrev = () => {
    if (currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
  };
  const handleNext = () => {
    if (currentIndex === banners.length - 1) return;
    setCurrentIndex(currentIndex + 1);
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (banners.length < 2) return;
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, AUTOPLAY_DELAY);
    return () => clearTimeout(timer);
  }, [currentIndex, banners.length]);

  if (banners.length === 0) {
    return <StyledBanner className='placeholder' />;
  }

  return (
    <StyledBanner>
      <StyledBannerContainer $transFormValue={transFormValue}>
        {banners.map((item, index) => (
          <BannerItem key={item.id} banner={item} index={index} />
        ))}
      </StyledBannerContainer>

      <StyledBannerButton>
        <button
          className='prev'
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label='이전 배너'
        >
          <FaAngleLeft />
        </button>
        <button
          className='next'
          onClick={handleNext}
          disabled={currentIndex === banners.length - 1}
          aria-label='다음 배너'
        >
          <FaAngleRight />
        </button>
      </StyledBannerButton>
      <StyledBannerIndicator>
        {banners.map((banner, index) => (
          <button
            key={banner.id}
            type='button'
            aria-label={`${index + 1}번 배너`}
            className={index === currentIndex ? 'active' : ''}
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </StyledBannerIndicator>
    </StyledBanner>
  );
}

const StyledBanner = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadow.medium};

  &.placeholder {
    height: 400px;
    background: ${({ theme }) => theme.color.surfaceAlt};
  }

  @media ${({ theme }) => `screen and ${theme.mediaQuery.mobile}`} {
    border-radius: ${({ theme }) => theme.borderRadius.default};

    &.placeholder {
      height: 320px;
    }
  }
`;

interface StyledBannerContainerProps {
  $transFormValue: number;
}

const StyledBannerContainer = styled.div<StyledBannerContainerProps>`
  display: flex;
  transform: translateX(${(props) => props.$transFormValue}%);
  transition: transform 0.7s cubic-bezier(0.65, 0, 0.35, 1);
`;

const StyledBannerButton = styled.div`
  button {
    border: 1px solid rgba(255, 255, 255, 0.25);
    width: 44px;
    height: 44px;
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(6px);
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 24px;
    transition: background-color 0.2s ease, opacity 0.2s ease;

    svg {
      width: 18px;
      height: 18px;
      fill: #fff;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.25);
    }

    &:disabled {
      opacity: 0.35;
      cursor: default;
    }

    &.prev {
      right: 80px;
    }

    &.next {
      right: 28px;
    }

    @media ${({ theme }) => `screen and ${theme.mediaQuery.mobile}`} {
      display: none;
    }
  }
`;

const StyledBannerIndicator = styled.div`
  position: absolute;
  bottom: 40px;
  left: 56px;
  display: flex;
  gap: 6px;

  button {
    width: 8px;
    height: 8px;
    padding: 0;
    border: 0;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    transition: width 0.3s ease, background-color 0.3s ease;

    &.active {
      width: 28px;
      background: #fff;
    }
  }

  @media ${({ theme }) => `screen and ${theme.mediaQuery.mobile}`} {
    bottom: 18px;
    left: 22px;
  }
`;
