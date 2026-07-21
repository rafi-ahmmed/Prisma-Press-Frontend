'use server';

import { cookies } from 'next/headers';

export const getNewAccessToken = async () => {
   const getStored = cookies();

   const refreshToken = (await getStored).get('refreshToken');
   // console.log(accessToken.value);
   if (!refreshToken) {
      return {
         success: false,
         message: 'Refresh token not found',
      };
   }

   const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/auth/refresh-token`,
      {
         method: 'POST',
         headers: {
            Cookie: `accessToken=${refreshToken.value}`,
         },
         cache: 'no-store',
      }
   );

   const result = await res.json();
   console.log(result);
   return result;
};
