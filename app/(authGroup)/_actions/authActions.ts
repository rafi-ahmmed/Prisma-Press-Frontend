'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type LoginState = {
   success: boolean;
   statusCode: number;
   message: string;
   data: {
      accessToken: string;
      refreshToken: string;
   };
};

export const loginAction = async (
   prevState: LoginState,
   actionPayload: FormData
) => {
   console.log('Previous State===', prevState);
   const email = actionPayload.get('email');
   const password = actionPayload.get('password');

   const payload = {
      email,
      password,
   };

   const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
   });
   const result = await res.json();

   if (result.success) {
      const cookieStore = await cookies();

      cookieStore.set('accessToken', result.data.accessToken, {
         maxAge: 60 * 60 * 24,
         sameSite: 'lax',
      });
      cookieStore.set('refreshToken', result.data.refreshToken, {
         maxAge: 60 * 60 * 24 * 7,
         sameSite: 'lax',
      });

      redirect('/dashboard', 'replace');
   }

   return result;
};
