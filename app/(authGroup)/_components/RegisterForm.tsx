'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useActionState } from 'react';
import { createUserAction } from '../../_services/authActions';

const RegisterForm = () => {
   const [state, action, pending] = useActionState(createUserAction, false);

   return (
      <form action={action} className="">
         <Card className="p-5 space-y-1 ">
            <Input
               className="py-5"
               name="username"
               type="text"
               placeholder="Enter your name"
               required
            />
            <Input
               className="py-5"
               name="email"
               type="email"
               placeholder="Enter your email"
               required
            />
            <Input
               className="py-5"
               name="imgUrl"
               type="url"
               placeholder="Enter your profile URL"
            />
            <Input
               className="py-5"
               name="password"
               type="password"
               placeholder="Create a password"
               required
            />

            <Button type="submit">{pending ? 'Creating' : 'Signup'}</Button>
         </Card>
      </form>
   );
};

export default RegisterForm;
