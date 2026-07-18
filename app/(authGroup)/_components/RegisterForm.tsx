'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const RegisterForm = () => {
   return (
      <form
         className=""
      >
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
               name="password"
               type="password"
               placeholder="Create a password password"
               required
            />

            <Button type="submit">Signup</Button>
         </Card>
      </form>
   );
};

export default RegisterForm;
