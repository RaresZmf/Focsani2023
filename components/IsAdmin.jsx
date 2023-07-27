import React from 'react'
import supabase from '@/utils/supabase'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useState } from 'react';

export default function isAdmin() {
    const { user, isLoading } = useUser();
    const [isadmin, setisadmin] = useState(false)

    console.log(isadmin)

  return isadmin;
}
