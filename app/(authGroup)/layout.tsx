import { Navbar } from '@/components/shared/navbar';
import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <>
         <Navbar />
         <div className="max-w-7xl mx-auto">{children}</div>
      </>
   );
};

export default AuthLayout;
