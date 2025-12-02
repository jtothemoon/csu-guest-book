'use client';

import Image from 'next/image';
import KakaoLoginButton from './KakaoLoginButton';
import { signOut } from '@/lib/auth';

interface NavbarProps {
  isLoggedIn?: boolean;
  userName?: string;
  profileImage?: string;
}

export default function Navbar({
  isLoggedIn = false,
  userName = '',
  profileImage = '/profile-default.svg',
}: NavbarProps) {
  return (
    <nav
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 0,
        height: '52px',
        width: '100%',
      }}
    >
      {/* 로고 */}
      <div className="logo">
        <Image
          src="/logo.png"
          alt="조선대학교"
          width={36}
          height={36}
          className="logo-image"
        />
        <span className="logo-text">오늘, 한 줄</span>
      </div>

      {/* 로그인 상태에 따른 우측 영역 */}
      {isLoggedIn ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          {/* 유저 정보 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Image
              src={profileImage}
              alt="프로필"
              width={20}
              height={20}
              style={{
                borderRadius: '100px',
                width: '20px',
                height: '20px',
                objectFit: 'cover',
              }}
            />
            <span className="title1">{userName}</span>
          </div>

          {/* 로그아웃 버튼 */}
          <form action={signOut}>
            <button
              type="submit"
              className="title2"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--gray-02)',
                cursor: 'pointer',
              }}
            >
              로그아웃
            </button>
          </form>
        </div>
      ) : (
        <KakaoLoginButton />
      )}
    </nav>
  );
}
