import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase.config'
import Button from './button'
import { toast } from 'react-toastify'

function SignIn() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleSignIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            toast('Connexion réussie')
        } catch (error) {
            toast.error('Erreur de connexion, veuillez réessayer.')
            console.error('Erreur de connexion:', error)
        }
    }

    return (
        <div className='flex flex-row gap-x-4 my-2 justify-center text-black'>
            <input
                placeholder='Email'
                className='rounded-sm pl-2 w-48 text-x '
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                placeholder='Password'
                className='rounded-sm pl-2 w-48 text-xs'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                handleClick={() => handleSignIn()}
                label='Connexion'
                type='button'
                className='text-xs bg-gradient-to-r from-blue-400 to-purple-500 hover:from-purple-500 hover:to-blue-400 text-white rounded-lg w-24 h-8 '
            />
        </div>
    )
}

export default SignIn
