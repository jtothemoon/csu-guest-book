'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import Navbar from './components/Navbar';
import GuestbookCard from './components/GuestbookCard';
import GuestbookForm from './components/GuestbookForm';

interface GuestbookEntry {
  id: string;
  user_name: string;
  profile_image: string | null;
  content: string;
  created_at: string;
}

export default function Home() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // 세션 상태 감지
  useEffect(() => {
    const supabase = createClient();

    // 현재 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // 세션 변화 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // 방명록 목록 조회
  const fetchEntries = useCallback(async () => {
    const res = await fetch('/api/guestbook');
    const data = await res.json();
    setEntries(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const loadEntries = async () => {
      const res = await fetch('/api/guestbook');
      const data = await res.json();
      setEntries(data);
      setIsLoading(false);
    };
    loadEntries();
  }, []);

  // 방명록 작성
  const handleSubmit = async (content: string) => {
    const userName = user?.user_metadata?.name || user?.user_metadata?.full_name || '익명';
    const profileImage = user?.user_metadata?.avatar_url || user?.user_metadata?.picture || null;
    await fetch('/api/guestbook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_name: userName,
        profile_image: profileImage,
        content,
      }),
    });
    fetchEntries();
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100dvh',
        maxWidth: '375px',
        margin: '0 auto',
        background: 'var(--gray-00)',
        position: 'relative',
      }}
    >
      {/* 노트 배경 라인 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 39px, #ECECEC 39px, #ECECEC 40px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* 헤더 영역 (네비게이션 + 타이틀) */}
      <header
        style={{
          width: '100%',
          height: '175px',
          background: 'var(--gray-00)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* 네비게이션 바 */}
        <div
          style={{
            position: 'absolute',
            width: '335px',
            left: '20px',
            top: '8px',
          }}
        >
          <Navbar
            isLoggedIn={!!user}
            userName={user?.user_metadata?.name || user?.user_metadata?.full_name || ''}
            profileImage={user?.user_metadata?.avatar_url || user?.user_metadata?.picture || '/profile-default.svg'}
          />
        </div>

        {/* 제목 */}
        <h1
          className="title1"
          style={{
            position: 'absolute',
            left: '20px',
            top: '76px',
          }}
        >
          현진의 작은 공책
        </h1>

        {/* 설명 */}
        <p
          className="body"
          style={{
            position: 'absolute',
            left: '20px',
            top: '111px',
            width: '335px',
          }}
        >
          안녕, 나는 현진이야 👋
          <br />
          찾아와줘서 고마워. 편하게 한 줄 남겨줘 🌱
        </p>
      </header>

      {/* 구분선 */}
      <div
        style={{
          width: '100%',
          height: '6px',
          background: 'var(--gray-01)',
          position: 'relative',
          zIndex: 1,
        }}
      />

      {/* 방명록 목록 */}
      <main
        style={{
          flex: 1,
          padding: 'var(--page-padding)',
          paddingBottom: '100px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {isLoading ? (
          <p className="body" style={{ textAlign: 'center', color: 'var(--gray-02)' }}>
            로딩 중...
          </p>
        ) : entries.length === 0 ? (
          /* Empty 상태 */
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop: '24px',
              gap: '30px',
            }}
          >
            <Image src="/empty.svg" alt="빈 방명록" width={64} height={60} />
            <p
              className="body"
              style={{
                textAlign: 'center',
                color: 'var(--gray-02)',
              }}
            >
              방명록이 아직 없어요.
              <br />
              첫번째 방명록을 남겨보세요!
            </p>
          </div>
        ) : (
          /* 방명록 목록 */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {entries.map((entry) => (
              <GuestbookCard
                key={entry.id}
                content={entry.content}
                userName={entry.user_name}
                profileImage={entry.profile_image || undefined}
              />
            ))}
          </div>
        )}
      </main>

      {/* 하단 인풋 필드 (고정) */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '375px',
          padding: 'var(--page-padding)',
          background: 'var(--gray-00)',
          zIndex: 2,
        }}
      >
        {user ? (
          <GuestbookForm onSubmit={handleSubmit} />
        ) : (
          <p
            className="body"
            style={{
              textAlign: 'center',
              color: 'var(--gray-02)',
              padding: '12px 0',
            }}
          >
            로그인 후 방명록을 작성할 수 있어요
          </p>
        )}
      </div>
    </div>
  );
}
