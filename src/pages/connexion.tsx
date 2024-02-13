import { handleSignIn } from '@/auth/authFunctions'
import router from 'next/router'
import { ChangeEvent, FormEvent, useState } from 'react'
import { NextPage } from 'next'
import Button from '@/components/button'

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
            <h2>Connexion</h2>
            <form className='max-w-sm mx-auto' onSubmit={handleSubmit}>
                <div className='mb-5'>
                    <label
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        htmlFor='email'
                    >
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
                    <label
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        htmlFor='password'
                    >
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

                <div className='flex flex-col-reverse gap-y-3 justify-center gap-x-4'>
                    <Button
                        type='button'
                        className='text-white bg-gradient-to-r from-blue-400 to-red-500 hover:from-red-500 hover:to-blue-400 font-medium rounded-lg text-sm w-full text-center h-10 '
                        handleClick={() => router.push('/')}
                        label="Retour à l'accueil"
                    />

                    <Button
                        type='submit'
                        className=' text-white bg-gradient-to-r from-blue-400 to-purple-500 hover:from-purple-500 hover:to-blue-400 font-medium rounded-lg text-sm w-full h-10 text-center'
                        handleClick={() => {}}
                        label='Connexion'
                    />
                </div>
            </form>
        </>
    )
}

export default Connexion
