import { FaBookOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Empty from '../common/Empty';

export default function BooksEmpty() {
  return (
    <Empty
      icon={<FaBookOpen />}
      title='조건에 맞는 책이 없어요'
      description={<Link to='/books'>전체 도서 보기</Link>}
    />
  );
}
