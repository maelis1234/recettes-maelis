import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase.config'

function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
                className='rounded-sm pl-2 w-48'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                placeholder='Mot de passe'
                className='rounded-sm pl-2 w-36'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                onClick={handleSignIn}
                className='bg-gradient-to-r from-blue-400 to-purple-500 hover:from-purple-500 hover:to-blue-400 text-white rounded-lg w-28 h-8 text-sm'
            >
                Se connecter
            </button>
        </div>
    )
}

export default SignIn
