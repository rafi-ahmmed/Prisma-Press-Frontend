'use server';

import { cookies } from 'next/headers';

export const getMe = async () => {
   const getStored = cookies();

   const accessToken = (await getStored).get('accessToken');
   // console.log(accessToken.value);
   if (!accessToken) {
      return {
         success: false,
         message: 'User not logged In',
      };
   }

   const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/me`, {
      headers: {
         // Authorization: accessToken as unknown as string,
         Authorization: `${accessToken.value}`,
         // Authorization: `Bearer ${accessToken}`,
         // Cookie: `accessToken=${accessToken}`,
      },
      cache: 'force-cache',
      next: {
         revalidate: 60 * 60 * 24,
         tags: ['my-profile'],
      },
   });

   const result = await res.json();
   console.log(result);
   return result;
};
