import { useEffect, useState } from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { auth } from '../../firebase.config'
import router from 'next/router'
import SignIn from './signIn'

const Footer = () => {
    const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false)
    const [loginViewing, setLoginViewing] = useState<boolean>(false)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUserLoggedIn(!!user)
        })

        return () => unsubscribe()
    }, [])

    const handleSignOut = async () => {
        try {
            await auth.signOut()
            alert("L'utilisateur a été déconnecté avec succès")
        } catch (error) {
            alert('Erreur de déconnexion')
            console.error('Erreur de déconnexion:', error)
        }
    }

    const connectedAdminOptions = () => {
        return (
            <div className='flex flex-row gap-x-4 mb-2'>
                <button
                    onClick={handleSignOut}
                    className='bg-gradient-to-r from-red-400 to-yellow-500 hover:from-yellow-500 hover:to-red-400 text-white rounded-lg w-24 h-6 text-xs'
                >
                    Déconnexion
                </button>
                <button
                    onClick={() => router.push('/ajout-recette')}
                    className='bg-gradient-to-r from-blue-400 to-purple-500 hover:from-purple-500 hover:to-blue-400 text-white rounded-lg h-6 w-24 text-xs'
                >
                    Ajouter
                </button>
            </div>
        )
    }
    return (
        <footer className='text-sm font-normal text-white p-3'>
            <button
                onClick={() => setLoginViewing(!loginViewing)}
                className='bg-gradient-to-r from-green-400 to-orange-500 hover:from-orange-500 hover:to-green-400 text-white rounded-lg h-6 w-20 text-xs mx-auto mb-2'
            >
                {loginViewing ? 'Fermer' : 'Admin'}
            </button>

            {loginViewing &&
                (userLoggedIn ? connectedAdminOptions() : <SignIn />)}

            <div className='flex flex-row space-x-3'>
                <div>
                    <a
                        href='https://github.com/maelis1234/recettes-maelis'
                        rel='noopener noreferrer'
                        target='_blank'
                    >
                        <FaGithub className='text-white text-xl cursor-pointer hover:text-pink-500' />
                    </a>
                </div>
                <div>
                    <a
                        href='https://www.linkedin.com/in/maelis-hammouche'
                        rel='noopener noreferrer'
                        target='_blank'
                    >
                        <FaLinkedin className='text-white text-xl cursor-pointer hover:text-pink-500' />
                    </a>
                </div>
            </div>
            <div className='flex pt-2'>
                <p>Made with ❤️ by Maëlis Hammouche</p>
            </div>
        </footer>
    )
}

export default Footer
