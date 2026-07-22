import { NewsCard } from '@/app/(publicGroup)/_components/news/NewsCard';
import { IPost } from '@/lib/types';

const result = {
   success: true,
   data: [
      {
         id: '1',
         title: 'Breaking News: AI is Transforming the World',
         content: 'Artificial Intelligence continues to reshape industries.',
         thumbnail: '/images/news-1.jpg',
         category: 'Technology',
         isPremium: true,
         createdAt: new Date().toISOString(),
         updatedAt: new Date().toISOString(),
         authorId: 'author-1',
      },
      {
         id: '2',
         title: 'Global Economy Shows Signs of Recovery',
         content: 'Experts predict steady economic growth.',
         thumbnail: '/images/news-2.jpg',
         category: 'Business',
         isPremium: true,
         createdAt: new Date().toISOString(),
         updatedAt: new Date().toISOString(),
         authorId: 'author-2',
      },
   ] ,
};

export function PremiumNewsList() {
   if (!result.success || !result.data.length) {
      return (
         <p className="py-12 text-center text-muted-foreground">
            No premium news found.
         </p>
      );
   }

   return (
      <div className="space-y-8">
         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {result.data.map((post) => (
               <NewsCard key={post.id} post={post} />
            ))}
         </div>
      </div>
   );
}
