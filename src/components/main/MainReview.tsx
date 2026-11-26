import { BookReviewItem as IBookReviewItem } from '@/models/book.model';
import styled from 'styled-components';
import BookReviewItem from '../book/BookReviewItem';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Props {
  reviews: IBookReviewItem[];
}

// 화면 너비에 따라 슬라이더가 스스로 개수를 다시 계산하도록 responsive 사용
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2, slidesToScroll: 2 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false },
    },
  ],
};

export default function MainReview({ reviews }: Props) {
  return (
    <StyledMainReview>
      <Slider {...sliderSettings}>
        {reviews.map((review) => (
          <BookReviewItem key={review.id} review={review} />
        ))}
      </Slider>
    </StyledMainReview>
  );
}

const StyledMainReview = styled.div`
  padding: 0 0 24px 0;

  .slick-track {
    display: flex;
    padding: 4px 0 12px;
  }

  .slick-slide {
    height: auto;

    > div {
      height: 100%;
      margin: 0 10px;
    }
  }

  .slick-list {
    margin: 0 -10px;
  }

  .slick-prev,
  .slick-next {
    z-index: 2;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.surface};
    border: 1px solid ${({ theme }) => theme.color.border};
    box-shadow: ${({ theme }) => theme.shadow.small};

    &:hover,
    &:focus {
      background: ${({ theme }) => theme.color.surface};
    }
  }

  .slick-prev {
    left: -20px;
  }

  .slick-next {
    right: -20px;
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 0;
  }

  .slick-prev:after,
  .slick-next:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 8px;
    height: 8px;
    border-top: 2px solid ${({ theme }) => theme.color.text};
    border-right: 2px solid ${({ theme }) => theme.color.text};
  }

  .slick-prev:after {
    transform: translate(-30%, -50%) rotate(-135deg);
  }

  .slick-next:after {
    transform: translate(-70%, -50%) rotate(45deg);
  }

  .slick-dots {
    bottom: -28px;

    li {
      margin: 0 2px;

      button:before {
        font-size: 8px;
        color: ${({ theme }) => theme.color.text};
        opacity: 0.2;
      }

      &.slick-active button:before {
        color: ${({ theme }) => theme.color.accent};
        opacity: 1;
      }
    }
  }

  @media ${({ theme }) => `screen and ${theme.mediaQuery.mobile}`} {
    .slick-prev,
    .slick-next {
      display: none !important;
    }
  }
`;
