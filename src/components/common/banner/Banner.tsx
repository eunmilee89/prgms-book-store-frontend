import { Banner as IBanner } from '@/models/banner.model';
import styled from 'styled-components';
import BannerItem from './BannerItem';
import { useMemo, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Theme } from '@/style/theme';

interface Props {
  banners: IBanner[];
}

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

  return (
    <StyledBanner>
      <StyledBannerContainer $transFormValue={transFormValue}>
        {banners.map((item, index) => (
          <BannerItem banner={item} />
        ))}
      </StyledBannerContainer>

      <StyledBannerButton>
        <button className='prev' onClick={handlePrev}>
          <FaAngleLeft />
        </button>
        <button className='next' onClick={handleNext}>
          <FaAngleRight />
        </button>
      </StyledBannerButton>
      <StyledBannerIndicator>
        {banners.map((banner, index) => (
          <span
            className={index === currentIndex ? 'active' : ''}
            onClick={() => handleIndicatorClick(index)}
          ></span>
        ))}
      </StyledBannerIndicator>
    </StyledBanner>
  );
}

const StyledBanner = styled.div`
  overflow: hidden;
  position: relative;
`;

interface StyledBannerContainerProps {
  $transFormValue: number;
}

const StyledBannerContainer = styled.div<StyledBannerContainerProps>`
  display: flex;
  transform: translateX(${(props) => props.$transFormValue}%);
  transition: transform 0.5s ease-in-out;
`;

const StyledBannerButton = styled.div`
  button {
    border: 0;
    width: 40px;
    height: 40px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 500px;
    font-size: 2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    svg {
      fill: #fff;
    }

    &.prev {
      left: 10px;
    }

    &.next {
      right: 10px;
    }

    @media ${({ theme }) => `screen and ${theme.mediaQuery.mobile}`} {
      width: 28px;
      height: 28px;
      font-size: 1.5rem;

      &.prev {
        left: 0px;
      }

      &.next {
        right: 0px;
      }
    }
  }
`;

const StyledBannerIndicator = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  span {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 100px;
    background: #fff;
    margin: 0 4px;
    cursor: pointer;

    &.active {
      background: ${({ theme }) => (theme as Theme).color.primary};
    }
  }

  @media ${({ theme }) => `screen and ${theme.mediaQuery.mobile}`} {
    bottom: 0;
    span {
      width: 12px;
      height: 12px;

      &.active {
        width: 24px;
      }
    }
  }
`;
