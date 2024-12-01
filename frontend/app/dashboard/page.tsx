
'use client'

import React, { useEffect } from 'react'
import useSession from "@/hooks/useSession";
import { useRouter } from 'next/navigation';

const page = () => {
  const { user, isAuthenticated, loading }= useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/signin"); 
    }
  }, [isAuthenticated, loading, router]);

    if (loading) {
      return <div>Loading...</div>;
    }

  
  return (
    <div>
      dashboarddd
      <div> 
        <h1>Welcome, {user?.email}</h1>

      </div>
    </div>
  )
}

export default page
