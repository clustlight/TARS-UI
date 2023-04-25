import React from 'react'
import { User } from '../types/tars'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  user: User
}

const ProfileCard = ({ user }: Props) => {
  const profileUrl = `https://twitcasting.tv/${user.screen_id}`

  return (
    <div className='space-y-1 rounded-xl border-2 border-amber-500 bg-white py-6 shadow-2xl'>
      <div className='flex items-center justify-center space-x-2 py-3'>
        <Link href={profileUrl}>
          <Image
            src={user.profile_image}
            alt={`${user.screen_id}'s icon`}
            height={45}
            width={45}
            className='rounded-3xl border-2 border-gray-500'
          />
        </Link>

        <Link href={profileUrl}>
          <div className=''>
            <span className='block truncate text-base font-semibold'>{user.user_name}</span>
            <span className='block truncate text-sm text-gray-400'>@{user.screen_id}</span>
          </div>
        </Link>
      </div>

      <div className='flex justify-center space-x-4'>
        <span>
          レベル <span className='font-semibold'>{user.level}</span>
        </span>
        <span>
          サポーター <span className='font-semibold'>{user.supporter_count.toLocaleString()}</span>
        </span>
      </div>
    </div>
  )
}

export default ProfileCard
