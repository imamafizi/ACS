'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';

const PromoterDashboard = () => {
  const user = useAppSelector((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (!user.id || user.role.name === 'customer') {
      router.push('/');
    } else {
      router.push('/promoters');
    }
  }, []);

  return <div>PromoterDashboard</div>;
};

export default PromoterDashboard;
