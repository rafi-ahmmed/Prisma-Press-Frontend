import { getMe } from '@/service/getme';

export default async function HomePage() {
   console.log(process.env.BACKEND_API_URL);

   // const user = await getMe();
   // console.log(user);

   return <>Home Page</>;
}
