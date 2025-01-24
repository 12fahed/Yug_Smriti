import dynamic from 'next/dynamic';

const AvatarCanvas = dynamic(() => import('../components/AvatarCanvas'), {
  ssr: false
});

export default function AvatarPage() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <AvatarCanvas />
    </div>
  );
}