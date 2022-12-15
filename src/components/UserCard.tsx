//@Todo sort matching followers first, highlight them in different color
import { useEffect, useState } from 'react'
import type { userType } from '../types/GeneralTypes'
import { XCircleIcon } from '@heroicons/react/24/solid'

export default function UserCard({
  onClose,
  user,
  commonUsers
}: {
  onClose: (username: string) => void,
  user: userType,
  commonUsers: Array<string>
}) {
  const { username, followers } = user
  let followersList = null

  if (followers) {
    followersList = <ul className="h-44 overflow-x-hidden">{followers.map(f => <li key={f.login}>{f.login}</li>)}</ul>;
  }

  function handleCloseCard () {
    onClose(username as string)
  }
  return (
    <div className="flex flex-col relative w-auto h-42 gap-2 border-1 p-2 rounded shadow-md bg-gradient-to-r from-slate-300 to-slate-200 text-slate-600">
      <XCircleIcon className="absolute -translate-y-2/4 cursor-pointer translate-x-2/4 top-0 right-0 w-8 h-8 fill-slate-400 hover:fill-slate-500" onClick={handleCloseCard}/>
      <h3 className="text-center font-medium uppercase border-b-2 border-slate-400">{username}</h3>
      <div id="followers-list">
        {followersList}
      </div>
    </div>
  )
}