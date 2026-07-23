'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const subscribePremium = async () => {
   const getStored = cookies();

   const accessToken = (await getStored).get('accessToken');
   // console.log(accessToken.value);
   if (!accessToken) {
      return {
         success: false,
         message: 'User not logged In',
      };
   }

   const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/subscription/checkout`,
      {
         method: 'POST',
         headers: {
            Authorization: `${accessToken.value}`,
         },
      }
   );

   const result = await res.json();
   console.log(result);

   if (result.success && result.data.paymentUrl) {
      redirect(result.data.paymentUrl);
   }
};
