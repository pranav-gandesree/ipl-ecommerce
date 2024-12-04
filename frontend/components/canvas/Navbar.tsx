'use client';

import React from 'react';
import useSession from '@/hooks/useSession';

interface NavbarProps {
  primary: string;
  secondary: string;
}


const Navbar: React.FC<NavbarProps> = ({ primary, secondary }) => {
  const { user, logout } = useSession();

  return (
    // <nav className={`bg-[${primary}] text-white py-4 px-6 flex justify-between items-center`}>
    <nav
    className="py-4 px-6 flex justify-between items-center"
    style={{
      backgroundColor: secondary,
      opacity: 7,
      color: secondary,
    }}
  >
 
      <div className="text-2xl font-bold text-white">IKART</div>


      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-sm text-white">{user?.email}</span>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <span className="text-sm">Guest</span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
