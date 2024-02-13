import Image from 'next/image'
import { useAuth } from '@/auth/AuthContext'
import { useEffect, useRef, useState } from 'react'
import Button from './button'
import { handleSignOut } from '@/auth/authFunctions'
import router from 'next/router'
import granolaImage from '../../public/granola.jpg'

const profilePicture = granolaImage

const Header = () => {
    const connectedUser = useAuth()

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const handleClickOutside = (event: any) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    return (
        <nav>
            <div className='flex flex-row items-center justify-between p-1 px-2'>
                <a href='/'>
                    <h1>🧁 Les recettes de Maëlis</h1>
                </a>
                {connectedUser.currentUser !== null ? (
                    <div ref={menuRef}>
                        <button
                            type='button'
                            className='flex text-sm rounded-full'
                            onClick={handleMenuToggle}
                        >
                            <Image
                                className='w-14 h-14 rounded-full'
                                src={profilePicture}
                                alt='user photo'
                                width={500}
                                height={500}
                            />
                        </button>
                        {isMenuOpen && (
                            <div className='absolute top-16 right-4 bg-white rounded-md shadow-md flex flex-col z-10 text-sm'>
                                <div className='p-4 flex flex-col gap-y-4'>
                                    <div>
                                        Bienvenue{' '}
                                        {connectedUser.currentUser.email}
                                    </div>
                                    <div className='flex flex-row justify-center'>
                                        <Button
                                            label='+ Ajouter une recette'
                                            type='button'
                                            handleClick={() =>
                                                router.push('/ajout-recette')
                                            }
                                            className='bg-gradient-to-r from-blue-400 to-purple-500 hover:from-purple-500 hover:to-blue-400 text-white rounded-lg h-6 w-36 text-xs'
                                        />
                                    </div>
                                </div>
                                <div className=''>
                                    <Button
                                        handleClick={() => handleSignOut()}
                                        label='Déconnexion'
                                        type='button'
                                        className='bg-gradient-to-r from-red-400 to-yellow-500 hover:from-yellow-500 hover:to-red-400 text-white w-full h-6 text-xs'
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className='flex flex-col lg:flex-row lg:gap-x-4 gap-y-1'>
                        <Button
                            label='Connexion'
                            className='text-xs lg:text-sm bg-gradient-to-r from-blue-400 to-purple-500 hover:from-purple-500 hover:to-blue-400 text-white rounded-lg w-20 lg:w-24 h-6 lg:h-8 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-300'
                            type='button'
                            handleClick={() => router.push('/connexion')}
                        />
                        <Button
                            label='Inscription'
                            className='text-xs lg:text-sm bg-gradient-to-r from-blue-400 to-green-500 hover:from-green-500 hover:to-blue-400 text-white rounded-lg w-20 h-6 lg:w-24 lg:h-8 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-300'
                            type='button'
                            handleClick={() => router.push('/inscription')}
                        />
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Header
