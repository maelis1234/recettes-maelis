import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from '@firebase/auth'
import router from 'next/router'
import { toast } from 'react-toastify'
import { auth } from '../../firebase.config'

export const handleSignUp = async (email: string, password: string) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password)
        router.push('/')
        toast('🧁 Inscription réussie !')
    } catch (error) {
        console.error("Erreur lors de l'inscription:", error)
        toast.error('Erreur de connexion 😢 Veuillez réessayer ')
    }
}

export const handleSignIn = async (email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
        router.push('/')
        toast('🧁 Connexion réussie !')
    } catch (error) {
        console.error('Erreur de connexion:', error)
        toast.error('Erreur de connexion 😢 Veuillez réessayer ')
    }
}

export const handleSignOut = async () => {
    try {
        await auth.signOut()
        toast.success('Déconnexion réussie !')
    } catch (error) {
        toast.error('Erreur de déconnexion, veuillez réessayer.')
        console.error('Erreur de déconnexion:', error)
    }
}
