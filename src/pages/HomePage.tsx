import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import UserForm from '../components/UserForm'
import UserCard from '../components/UserCard'
import type { userType } from '../types/GeneralTypes'
import axios from 'axios'
import { filterSharedFollowers } from '../utils/helpers'
const INITIAL_APP_STATE: Array<userType> = []
const URL = "https://api.github.com/users/{username}/followers"

export default function HomePage() {
  const [userList, setUserList] = useState(INITIAL_APP_STATE)
  const [userData, setUserDataState] = useState(Array<userType>)
  const [userCommonData, setUserCommonData] = useState(Array<any>)
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  async function fetchFollowers (username: string) {
    return await axios.get(URL.replace('{username}', username))
  }

  function handleUserSave (username: string) {
    const dupe = userList.findIndex(u => u.username === username)
    if (!~dupe) {
      setUserList([...userList, { username } as userType])
    }
    closeModal()
  }

  const handleUserDelete = (username: string) => {
    const tmpUserList = userList.reduce((acc: Array<userType>, itm: userType) => {
      if (itm.username !== username) {
        acc.push(itm)
      }
      return acc
    }, [])

    setUserList(tmpUserList)
  }
  // Todo separate data processing into standalone utils component
  useEffect(() => {
    const followersPromises = userList.map((user: userType) =>
      fetchFollowers(user.username as string)
        .then(data => ({ ...user, followers: data.data}))
    );
    Promise.all(followersPromises).then(data => {
      setUserDataState(data)
      setUserCommonData(filterSharedFollowers(data))
      //@Todo process pagination per user
    })
  }, [userList])

  return (
    <div>
      <h1 className="text-center text-5xl font-display m-4">Git followers test app</h1>
      <div>
        <h3 className="text-center my-4 font-medium">View GitHub profile followers</h3>
        <div className="inset-0 flex items-center justify-center mb-4">
          <button
            type="button"
            onClick={openModal}
            className="shadow rounded-md bg-black bg-opacity-20 px-4 py-2 mb-4 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            {userList.length > 0 ? 'Add user' : 'Search user'}
          </button>
        </div>

        <div className="flex my-4 justify-center gap-4 h-full">
          {userData.length > 0 && userData.map((user: userType) => (
            <UserCard user={user} key={user.username} commonUsers={userCommonData} onClose={handleUserDelete} />
          ))}
        </div>
      </div>

      {userList.length > 1 &&
        <div>
          <h3 className="text-center my-4 font-medium">Matching followers:</h3>
            <div className="flex my-4 justify-center gap-4 h-full">
              {userCommonData.length > 0 && <ul>{userCommonData.map((user: string) => (
                <li key={user}>{user}</li>
              ))}
              </ul>}
            {userCommonData.length <= 0 && <p>No matching followers</p>}
          </div>
        </div>}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Search user followers
                  </Dialog.Title>
                  <div className="mt-2">
                    <UserForm onSave={handleUserSave} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}