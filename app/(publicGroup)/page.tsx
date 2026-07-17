import Link from 'next/link';
import LikeBtn from '../ui/LikeBtn';
import { Button } from '@/components/ui/button';

export default function HomePage() {
   console.log(process.env.BACKEND_API_URL);
   return (
      <div>
         <h2>Welcome to the Home Page</h2>
         <Button variant={'destructive'}>Home</Button>
      </div>
   );
}
