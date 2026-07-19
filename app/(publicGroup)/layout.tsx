import { Navbar } from '@/components/shared/navbar';
import { getMe } from '@/service/getme';
import React from 'react';

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
   const user = await getMe();
   return (
      <div className="">
         <Navbar user={user.data} />
         {children}
      </div>
   );
};

export default PublicLayout;
