'use server';

import { Login } from '@/service/login';
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

// type CreateUserState = {

// }

export const loginAction = async (
   prevState: LoginState,
   actionPayload: FormData
) => {
   // console.log('Previous State===', prevState);
   const email = actionPayload.get('email');
   const password = actionPayload.get('password');

   const result = await Login(email as string, password as string);

   if (result.success) {
      redirect('/dashboard');
   }

   return result;
};

export const createUserAction = async (prevState, actionPayload: FormData) => {
   console.log(actionPayload);

   const name = actionPayload.get('username');
   const email = actionPayload.get('email');
   const imgUrl = actionPayload.get('imgUrl');
   const password = actionPayload.get('password');

   const payload = {
      name,
      email,
      password,
      bio: 'If u are bad so i am ur dad',
      profilePhoto: imgUrl,
   };

   const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/users/register`,
      {
         method: 'POST',
         headers: {
            'Content-type': 'application/json',
         },
         body: JSON.stringify(payload),
      }
   );

   const result = await res.json();

   const loginResult = await Login(email as string, password as string);

   if (result.success && loginResult.success) {
      redirect('/');
   }

   return loginResult;
};
