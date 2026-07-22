'user server';

import { cookies } from 'next/headers';
import { json } from 'stream/consumers';

export const getRefreshToken = async () => {
   const storedCookie = await cookies();

   const refreshToken = storedCookie.get('refreshToken')?.value as string;

   if (!refreshToken) {
      return {
         success: false,
         message: 'Refresh token not found',
      };
   }

   const accessToken = await fetch(
      `${process.env.BACKEND_API_URL}/api/auth/refresh-token`,
      {
         method: 'POST',
         headers: {
            Cookie: `refreshToken=${refreshToken}`,
         },
         cache: 'no-cache',
      }
   );

   const result = await accessToken.json();
   console.log('New-accessToken', result);
   return result;
};
