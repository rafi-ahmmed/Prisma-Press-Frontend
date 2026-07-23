import { cookies } from 'next/headers';

export const getPremiumNews = async () => {
   const getStored = cookies();

   const accessToken = (await getStored).get('accessToken');
   // console.log(accessToken.value);
   if (!accessToken) {
      return {
         success: false,
         message: 'User not logged In',
      };
   }

   const res = await fetch(`${process.env.BACKEND_API_URL}/api/premium`, {
      headers: {
         Authorization: `${accessToken.value}`,
      },
      cache: 'force-cache',
      next: {
         revalidate: 60 * 60 * 6,
         tags: ['premium-posts'],
      },
   });

   const result = await res.json();

   return result;
};
