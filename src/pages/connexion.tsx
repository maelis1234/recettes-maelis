import { handleSignIn } from '@/auth/authFunctions'
import router from 'next/router'
import { ChangeEvent, FormEvent, useState } from 'react'
import { NextPage } from 'next'

const Connexion: NextPage = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await handleSignIn(email, password)
        } catch (error) {
            console.error('Erreur de connexion', error)
        }
    }

    return (
        <>
            <h1>Connexion</h1>
            <form className='max-w-sm mx-auto' onSubmit={handleSubmit}>
                <div className='mb-5'>
                    <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                        Adresse email
                    </label>
                    <input
                        type='email'
                        id='email'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        placeholder='nom@mail.com'
                        required
                        value={email}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setEmail(event.target.value)
                        }
                    />
                </div>
                <div className='mb-5'>
                    <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                        Mot de passe
                    </label>
                    <input
                        type='password'
                        id='password'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        required
                        value={password}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setPassword(event.target.value)
                        }
                    />
                </div>

                <div className='flex flex-row justify-between'>
                    <button
                        type='button'
                        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                        onClick={() => router.push('/')}
                    >
                        Retour
                    </button>

                    <button
                        type='submit'
                        className='text-white bg-pink-500 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                        onClick={() => {}}
                    >
                        Se connecter
                    </button>
                </div>
            </form>
        </>
    )
}

export default Connexion
