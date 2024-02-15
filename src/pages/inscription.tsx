import { handleSignUp } from '@/auth/authFunctions'
import Button from '@/components/button'
import { NextPage } from 'next'
import router from 'next/router'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

const Inscription: NextPage = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmationPassword: '',
    })

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (form.password !== form.confirmationPassword) {
            toast.error(
                'Les mots de passe ne correspondent pas, veuillez réessayer.'
            )
        } else {
            try {
                await handleSignUp(form.email, form.password)
            } catch (error) {
                console.error("Erreur lors de l'inscription:", error)
            }
        }
    }

    return (
        <>
            <h2>Inscription</h2>
            <form className='max-w-sm mx-auto' onSubmit={handleSubmit}>
                <div className='mb-5'>
                    <label
                        className='block mb-2 text-sm font-medium text-gray-900'
                        htmlFor='email'
                    >
                        Adresse email
                    </label>
                    <input
                        type='email'
                        id='email'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                        placeholder='nom@mail.com'
                        required
                        value={form.email}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setForm({ ...form, email: event.target.value })
                        }
                    />
                </div>
                <div className='mb-5'>
                    <label
                        className='block mb-2 text-sm font-medium text-gray-900'
                        htmlFor='password'
                    >
                        Mot de passe
                    </label>
                    <input
                        type='password'
                        id='password'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                        required
                        value={form.password}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setForm({ ...form, password: event.target.value })
                        }
                    />
                </div>
                <div className='mb-5'>
                    <label
                        htmlFor='confirmationPassword'
                        className='block mb-2 text-sm font-medium text-gray-900'
                    >
                        Confirmation du mot de passe
                    </label>
                    <input
                        type='password'
                        id='confirmationPassword'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                        required
                        value={form.confirmationPassword}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setForm({
                                ...form,
                                confirmationPassword: event.target.value,
                            })
                        }
                    />
                </div>

                <div className='flex flex-col-reverse gap-y-4'>
                    <Button
                        type='button'
                        className='text-white bg-gradient-to-r from-blue-400 to-red-500 hover:from-red-500 hover:to-blue-400 font-medium rounded-lg text-sm w-full text-center h-10 '
                        handleClick={() => router.push('/')}
                        label="Retour à l'accueil"
                    />

                    <Button
                        type='submit'
                        className=' text-white bg-gradient-to-r from-blue-400 to-green-500 hover:from-green-500 hover:to-blue-400 font-medium rounded-lg text-sm w-full h-10 text-center'
                        handleClick={() => {}}
                        label='Inscription'
                    />
                </div>
            </form>
        </>
    )
}
export default Inscription
