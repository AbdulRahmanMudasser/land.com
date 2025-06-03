'use client';

   import { useAuth } from '../hooks/useAuth';
   import Link from 'next/link';

   export default function Navbar() {
     const { user, loading, signOut } = useAuth();

     return (
       <nav className="bg-gray-800 p-4">
         <div className="max-w-7xl mx-auto flex justify-between items-center">
           <Link href="/" className="text-white text-xl font-bold">
             Real Estate App
           </Link>
           <div className="flex space-x-4">
             <Link href="/" className="text-white hover:text-gray-300">
               Home
             </Link>
             {!loading && !user && (
               <>
                 <Link href="/signup" className="text-white hover:text-gray-300">
                   Sign Up
                 </Link>
                 <Link href="/login" className="text-white hover:text-gray-300">
                   Login
                 </Link>
               </>
             )}
             {!loading && user && (
               <>
                 <Link href="/dashboard" className="text-white hover:text-gray-300">
                   Dashboard
                 </Link>
                 <button
                   onClick={signOut}
                   className="text-white hover:text-gray-300"
                 >
                   Sign Out
                 </button>
               </>
             )}
           </div>
         </div>
       </nav>
     );
   }