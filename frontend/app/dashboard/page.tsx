
'use client'

import React, { useEffect } from 'react'
import useSession from "@/hooks/useSession";
import { useRouter } from 'next/navigation';

const page = () => {

  const { isAuthenticated, loading, user, logout } = useSession();
  const router = useRouter();
console.log(user)
  
  return (
    <div>
      dashboarddd
      <div> 
        <h1>Welcome, {user}</h1>

      </div>
    </div>
  )
}

export default page
