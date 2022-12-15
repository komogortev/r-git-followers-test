import { FormEventHandler, useState } from 'react'
import type { userType } from '../types/GeneralTypes'
import { useForm } from 'react-hook-form'

export default function UserForm({ onSave }: { onSave: (username: string) => void }) {
  const [userName, setUserName] = useState<string>("")
  const [error, setError] = useState<string|null>(null)

  const validateInput: () => string|null = () => {
    let errorMessage = null
    if (userName.length <= 0) {
      errorMessage = "Username is required!"
    }

    return errorMessage
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = validateInput()
    setError(error)

    if (error != null) {
      return
    }

    setError(null)
    onSave(userName)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-sm text-gray-500">
        <div>
          <input type="text" name="username" placeholder="Github username" value={userName} onChange={e => setUserName(e.target.value)} className="border m-2 p-2 rounded" />
          {error && <div className="text-red-500">{error}</div>}
        </div>
        <input
          type="submit"
          id="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        />
      </div>
    </form>
  )
}