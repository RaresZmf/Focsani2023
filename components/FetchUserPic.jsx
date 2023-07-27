import React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Image from 'next/image';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

export default function ProfileComponent() {
    const { user, isLoading } = useUser();
    console.log("User:")
    console.log(user.picture)
    return (
      <div>
        {
            user && (
                <div>
                    <Link href={"/account"}>
                        <img
                            src={user.picture}
                            alt="Profile"
                            decode="async"
                            data-testid="profile-picture"
                            className='w-[60px] h-[60px] rounded-full'
                        />
                    </Link>
                </div>
            )
        }
      </div>)
  }