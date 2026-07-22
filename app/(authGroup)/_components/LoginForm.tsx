'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { loginAction } from '../_actions/authActions';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
   const [state, action, pending] = useActionState(loginAction, false);
   const router = useRouter();

   useEffect(() => {
      if (!state) return;

      if (state.success) {
         toast.success(state.message);
         // router.replace('/dashboard');
      }
      if (!state.success) {
         toast.error(state.message || 'Login Failed!');
      }
   }, [state]);

   return (
      <form action={action} className="space-y-4">
         <Card className="p-5 space-y-1">
            <Input
               className="py-5"
               name="email"
               type="email"
               placeholder="Enter your email"
               required
            />
            <Input
               className="py-5"
               name="password"
               type="password"
               placeholder="Enter your password"
               required
            />

            <Button type="submit">{pending ? 'Loading...' : 'Login'}</Button>
         </Card>
      </form>
   );
};

export default LoginForm;
