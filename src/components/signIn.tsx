import { ChangeEventHandler, ReactEventHandler, useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase.config'

function SignIn() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleSignIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            console.log("L'utilisateur est connecté avec succès")
            alert("L'utilisateur est connecté avec succès")
        } catch (error) {
            alert('Erreur de connexion')
            console.error('Erreur de connexion:', error)
        }
    }

    return (
        <div className='flex flex-row gap-x-4 my-2 justify-center'>
            <input
                placeholder='Email'
                className='rounded-sm pl-2 w-24 text-xs'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                placeholder='Password'
                className='rounded-sm pl-2 w-24 text-xs'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                onClick={handleSignIn}
                className='text-xs bg-gradient-to-r from-blue-400 to-purple-500 hover:from-purple-500 hover:to-blue-400 text-white rounded-lg w-24 h-8 '
            >
                Connexion
            </button>
        </div>
    )
}

export default SignIn
