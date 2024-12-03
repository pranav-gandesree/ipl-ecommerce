'use client';

import React from 'react';
import useSession from '@/hooks/useSession';

const Navbar = () => {
  const { user, logout } = useSession();

  return (
    <nav className="bg-[#011746] text-white py-4 px-6 flex justify-between items-center">
      {/* Left Section: Heading */}
      <div className="text-2xl font-bold">Fulltoss</div>

      {/* Right Section: User Email and Logout */}
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-sm">{user?.email}</span>
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
