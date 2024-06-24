'use client';

import { useUser } from '@/context/UserContext';
import ProfileSetUp from '@/components/Pages/ProfileSetUp';
import HomePage from '@/components/Pages/HomePage';

function MainPage() {
  const { user } = useUser();
  console.log('user', user);
  return (
    <>
      {' '}
      {user && !user.name && <ProfileSetUp user={user} />}
      {user && user.name && <HomePage user={user} />}
    </>
  );
}

export default MainPage;
