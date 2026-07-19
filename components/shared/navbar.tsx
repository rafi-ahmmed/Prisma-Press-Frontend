'use client';

import Link from 'next/link';
import {
   CircleUserIcon,
   LogOutIcon,
   SettingsIcon,
   User,
   UserIcon,
} from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navItems = [
   { label: 'Home', href: '/' },
   { label: 'Dashboard', href: '/dashboard' },
   { label: 'Projects', href: '/projects' },
   { label: 'Team', href: '/team' },
];

const userMenuItems = [
   {
      label: 'Profile',
      href: '/profile',
      icon: UserIcon,
   },
   {
      label: 'Account',
      href: '/account',
      icon: CircleUserIcon,
   },
   {
      label: 'Settings',
      href: '/settings',
      icon: SettingsIcon,
   },
];

// {
//     "success": true,
//     "statusCode": 200,
//     "message": "User Profile Fached successfully!",
//     "data": {
//         "id": "15993314-bf3d-425b-bd40-83d06f09bc24",
//         "name": "test",
//         "email": "test@gmail.com",
//         "activeStatus": "ACTIVE",
//         "role": "USER",
//         "createdAt": "2026-07-18T08:55:23.453Z",
//         "updatedAt": "2026-07-18T08:55:23.453Z",
//         "profile": {
//             "id": "97bd4907-e4b6-4c6a-97ee-d78527a7d04a",
//             "profilePhoto": "https/google.com",
//             "bio": "If u are bad so i am ur dad",
//             "userId": "15993314-bf3d-425b-bd40-83d06f09bc24",
//             "createdAt": "2026-07-18T08:55:23.453Z",
//             "updatedAt": "2026-07-18T08:55:23.453Z"
//         }
//     }
// }

// type navBarProps = {
//    // user:
// }


export function Navbar({ user }:navBarProps) {
   const handleLogout = () => {
      console.log('Logout...');
      // এখানে logout logic লিখবে
   };

   return (
      <header className="border-b bg-background">
         <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
               <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
                  PP
               </span>
               <span className="text-lg font-semibold tracking-tight">
                  Prisma Press
               </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden items-center gap-1 md:flex">
               {navItems.map((item) => (
                  <Link
                     key={item.href}
                     href={item.href}
                     className={cn(
                        buttonVariants({
                           variant: 'ghost',
                           size: 'sm',
                        })
                     )}
                  >
                     {item.label}
                  </Link>
               ))}
            </nav>

            {/* User Dropdown */}
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button
                     variant="ghost"
                     size="icon"
                     className="rounded-full p-0 hover:bg-transparent"
                     aria-label="Open user menu"
                  >
                     <Avatar className="size-10 cursor-pointer bg-green-100">
                        <AvatarFallback className="bg-green-100">
                           <User
                              className="size-5 text-green-600"
                              strokeWidth={2.5}
                           />
                        </AvatarFallback>
                     </Avatar>
                  </Button>
               </DropdownMenuTrigger>

               <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                     <div className="flex flex-col gap-0.5">
                        {/* <span className="text-sm font-medium">{}</span> */}
                        <span className="text-xs font-normal text-muted-foreground">
                           jane@acme.com
                        </span>
                     </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                     {userMenuItems.map((item) => {
                        const Icon = item.icon;

                        return (
                           <DropdownMenuItem key={item.href} asChild>
                              <Link href={item.href}>
                                 <Icon className="mr-2 h-4 w-4" />
                                 <span>{item.label}</span>
                              </Link>
                           </DropdownMenuItem>
                        );
                     })}
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={handleLogout}>
                     <LogOutIcon className="mr-2 h-4 w-4" />
                     <span>Log out</span>
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
      </header>
   );
}
