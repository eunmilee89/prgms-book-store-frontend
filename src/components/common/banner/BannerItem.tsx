import { Banner as IBanner } from '@/models/banner.model';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowRight } from 'react-icons/fa';

interface Props {
  banner: IBanner;
  index: number;
}

const EYEBROWS = ['NEW RELEASE', 'AUTHOR PICK', 'SPECIAL OFFER'];

export default function BannerItem({ banner, index }: Props) {
  return (
    <StyledBannerItem>
      <img src={banner.image} alt='' className='bg' />
      <div className='content'>
        <span className='eyebrow'>{EYEBROWS[index % EYEBROWS.length]}</span>
        <h2>{banner.title}</h2>
        <p>{banner.description}</p>
        <Link to='/books' className='cta'>
          둘러보기 <FaArrowRight />
        </Link>
      </div>
    </StyledBannerItem>
  );
}

const StyledBannerItem = styled.div`
  flex: 0 0 100%;
  position: relative;
  height: 400px;
  overflow: hidden;

  .bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: right center;
  }

  .content {
    position: relative;
    z-index: 1;
    height: 100%;
    max-width: 520px;
    padding: 0 56px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 14px;
    color: #fbf7f0;

    .eyebrow {
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.18em;
      opacity: 0.75;
    }

    h2 {
      font-family: ${({ theme }) => theme.font.serif};
      font-size: 2.4rem;
      font-weight: 700;
      line-height: 1.25;
      letter-spacing: -0.03em;
      word-break: keep-all;
      text-wrap: balance;
      color: #fbf7f0;
    }

    p {
      font-size: 1.0625rem;
      line-height: 1.6;
      color: rgba(251, 247, 240, 0.82);
      word-break: keep-all;
    }

    .cta {
      align-self: flex-start;
      margin-top: 10px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 11px 20px;
      border-radius: 999px;
      background: #fbf7f0;
      color: #1c1a17;
      font-size: 0.9rem;
      font-weight: 700;
      text-decoration: none;
      transition: gap 0.2s ease, transform 0.2s ease;

      svg {
        width: 12px;
        height: 12px;
      }

      &:hover {
        gap: 12px;
      }
    }
  }

  @media ${({ theme }) => `screen and ${theme.mediaQuery.mobile}`} {
    height: 320px;

    .bg {
      object-position: 78% center;
    }

    .content {
      justify-content: flex-end;
      padding: 0 22px 44px;
      gap: 8px;
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.78),
        rgba(0, 0, 0, 0.15) 100%
      );
      max-width: none;

      h2 {
        font-size: 1.5rem;
      }

      p {
        font-size: 0.875rem;
      }

      .cta {
        display: none;
      }
    }
  }
`;
