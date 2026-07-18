'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const LoginForm = () => {
   return (
      <form
         className="space-y-4
      "
      >
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

            <Button type="submit">Login</Button>
         </Card>
      </form>
   );
};

export default LoginForm;
