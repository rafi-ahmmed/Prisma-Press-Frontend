'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export const logout = async () => {
   const storedCookies = await cookies();

   storedCookies.delete('accessToken');
   storedCookies.delete('refreshToken');

   revalidateTag('my-profile', 'max');
};
