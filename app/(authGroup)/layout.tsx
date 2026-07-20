import { Navbar } from '@/components/shared/navbar';
import { getMe } from '@/service/getme';
import React from 'react';

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
   const user = await getMe();
   return (
      <>
         <Navbar user={user} />
         <div className="max-w-7xl mx-auto">{children}</div>
      </>
   );
};

export default AuthLayout;
