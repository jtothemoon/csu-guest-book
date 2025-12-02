'use client';

import Image from 'next/image';
import { signInWithKakao } from '@/lib/auth';

export default function KakaoLoginButton() {
  return (
    <form action={signInWithKakao}>
      <button
        type="submit"
        style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '0 12px',
        gap: '6px',
        height: '40px',
        background: '#FEE500',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      <Image
        src="/kakao.svg"
        alt="카카오"
        width={18}
        height={18}
        style={{ width: '18px', height: '18px' }}
      />
      <span
        className="title2"
        style={{ color: 'var(--gray-03)' }}
      >
        로그인
      </span>
      </button>
    </form>
  );
}
