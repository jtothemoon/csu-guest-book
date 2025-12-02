import Image from 'next/image';

interface GuestbookCardProps {
  content: string;
  userName: string;
  profileImage?: string;
}

export default function GuestbookCard({
  content,
  userName,
  profileImage = '/profile-default.svg',
}: GuestbookCardProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '16px',
        gap: '12px',
        width: '100%',
        background: 'var(--gray-01)',
        borderRadius: '8px',
      }}
    >
      {/* 방명록 내용 */}
      <p
        className="body"
        style={{
          margin: 0,
          color: 'var(--gray-03)',
        }}
      >
        {content}
      </p>

      {/* 유저 정보 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        <Image
          src={profileImage}
          alt="프로필"
          width={16}
          height={16}
          style={{
            borderRadius: '100px',
            width: '16px',
            height: '16px',
            objectFit: 'cover',
          }}
        />
        <span
          className="caption"
          style={{ color: 'var(--gray-02)' }}
        >
          {userName}
        </span>
      </div>
    </div>
  );
}
