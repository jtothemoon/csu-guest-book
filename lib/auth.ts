'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

/**
 * 카카오 OAuth 로그인
 */
export async function signInWithKakao(): Promise<void> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
      queryParams: {
        scope: 'profile_nickname profile_image',
      },
    },
  });

  if (error) {
    console.error('카카오 로그인 에러:', error);
    return;
  }

  if (data.url) {
    redirect(data.url);
  }
}

/**
 * 로그아웃
 */
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/');
}

/**
 * 현재 세션 가져오기
 */
export async function getSession() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

/**
 * 현재 사용자 가져오기
 */
export async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
