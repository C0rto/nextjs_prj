'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import Profile from '@components/Profile'

const UserProfile = ({ params }) => {
  const [userPost, setUserPost] = useState([])
  const searchParams = useSearchParams()
  const username = searchParams.get('name')

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`)
      const data = await response.json()

      setUserPost(data)
    }
    if (params?.id) {
      fetchPost()
    }
  }, [params.id])

  return (
    <Profile
      name={username}
      desc={`Welcome to ${username}'s personalized profile page. Explore ${username}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPost}
    />
  )
}

export default UserProfile
