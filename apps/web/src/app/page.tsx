'use client';

import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import { useEffect } from 'react';

export default function Home() {
  const user = useAppSelector((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (user.role.name === 'customer') {
      router.push('/');
    }
    if (user.role.name === 'promoter') {
      router.push('/promoters');
    }
  }, []);

  return <main className="container max-w-7xl px-4 mx-auto"></main>;
}
