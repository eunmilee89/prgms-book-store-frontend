import Button from '../common/Button';
import { useEffect } from 'react';

interface Props {
  onCompleted: (address: string) => void;
}

const SCRIPT_URL =
  '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

export default function FindAddressButton({ onCompleted }: Props) {
  const handleOpen = () => {
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        const address =
          data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;
        onCompleted(address);
      },
    }).open();
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    script.async = true;

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Button type='button' size='medium' scheme='normal' onClick={handleOpen}>
      주소 찾기
    </Button>
  );
}
