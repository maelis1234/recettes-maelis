import { useEffect, useState } from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { auth } from '../../firebase.config'
import router from 'next/router'
import SignIn from './signIn'
import Button from './button'
import { toast } from 'react-toastify'

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
            toast.success('Déconnexion réussie !')
        } catch (error) {
            toast.error('Erreur de déconnexion, veuillez réessayer.')
            console.error('Erreur de déconnexion:', error)
        }
    }

    const connectedAdminOptions = () => {
        return (
            <div className='flex flex-row gap-x-4 mb-2'>
                <Button
                    handleClick={() => handleSignOut()}
                    label='Déconnexion'
                    type='button'
                    className='bg-gradient-to-r from-red-400 to-yellow-500 hover:from-yellow-500 hover:to-red-400 text-white rounded-lg w-24 h-6 text-xs'
                />

                <Button
                    label='Ajouter une recette'
                    type='button'
                    handleClick={() => router.push('/ajout-recette')}
                    className='bg-gradient-to-r from-blue-400 to-purple-500 hover:from-purple-500 hover:to-blue-400 text-white rounded-lg h-6 w-32 text-xs'
                />
            </div>
        )
    }
    return (
        <footer className='text-sm font-normal text-white p-3'>
            <Button
                label={loginViewing ? 'Fermer' : 'Admin'}
                type='button'
                handleClick={() => setLoginViewing(!loginViewing)}
                className='bg-gradient-to-r from-green-400 to-orange-500 hover:from-orange-500 hover:to-green-400 text-white rounded-lg h-6 w-20 text-xs mx-auto mb-2'
            />

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
