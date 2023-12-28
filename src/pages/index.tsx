import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { database, auth } from '../../firebase.config'
import HeaderMenu from '@/components/headerMenu'
import RecipeCard from '@/components/recipeCard'
import { CategoryEnum, Recette } from '@/utils/interfaces'
import Footer from '@/components/footer'
import SignIn from '@/components/signIn'

const Index: NextPage = () => {
    const [recettes, setRecettes] = useState<Recette[]>([])
    const [recettesByCategory, setRecettesByCategory] = useState<Recette[]>([])
    const [categorySelected, setCategorySelected] = useState<CategoryEnum>()
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [loginViewing, setLoginViewing] = useState(false)

    const recettesCollectionRef = collection(database, 'recettes')

    useEffect(() => {
        onSnapshot(recettesCollectionRef, (snapshot) => {
            setRecettes(
                snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        viewing: false,
                        titre: doc.data().titre,
                        category: doc.data().category,
                        description: doc.data().description,
                        ingredients: doc.data().ingredients,
                        instructions: doc.data().instructions,
                    }
                })
            )
        })
        // Vérifier si l'utilisateur est connecté
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUserLoggedIn(!!user)
        })

        // Cleanup de l'abonnement lors du démontage du composant
        return () => unsubscribe()
    }, [recettesCollectionRef])

    const handleView = (id: string) => {
        const recettesClone = [...recettes]

        recettesClone.forEach((recette: { id: string; viewing: boolean }) => {
            if (recette.id === id) {
                recette.viewing = !recette.viewing
            } else {
                recette.viewing = false
            }
        })

        setRecettes(recettesClone)
    }

    const handleSelectCategory = (category?: CategoryEnum) => {
        if (category) {
            setCategorySelected(category)
            setRecettesByCategory(
                recettes.filter((recette) => recette.category === category)
            )
        } else {
            setCategorySelected(undefined)
            setRecettesByCategory([])
        }
    }

    const handleSignOut = async () => {
        try {
            await auth.signOut()
            console.log("L'utilisateur est déconnecté avec succès")
            alert("L'utilisateur est déconnecté avec succès")
        } catch (error) {
            alert('Erreur de déconnexion')
            console.error('Erreur de déconnexion:', error)
        }
    }

    const connectedAdminOptions = () => {
        return (
            <div className='flex flex-row gap-x-4 m-2'>
                <button
                    onClick={handleSignOut}
                    className='bg-gradient-to-r from-red-400 to-yellow-500 hover:from-yellow-500 hover:to-red-400 text-white rounded-lg w-32 h-8 text-sm'
                >
                    Se déconnecter
                </button>
                <button
                    onClick={() => alert('redirection vers la page ajout')}
                    className='bg-gradient-to-r from-blue-400 to-purple-500 hover:from-purple-500 hover:to-blue-400 text-white rounded-lg h-8 w-48 text-sm'
                >
                    Ajouter une recette
                </button>
            </div>
        )
    }

    return (
        <div>
            <Head>
                <title>Recettes de Maëlis</title>
                <meta
                    name='description'
                    content='Mes recettes personnelles, sucrées et salées.'
                />
            </Head>

            <div className='flex flex-col'>
                <button
                    onClick={() => setLoginViewing(!loginViewing)}
                    className='bg-gradient-to-r from-green-400 to-orange-500 hover:from-orange-500 hover:to-green-400 text-white rounded-lg h-8 w-24 text-sm mx-auto'
                >
                    {loginViewing ? 'Fermer' : 'Admin'}
                </button>

                {loginViewing && !userLoggedIn && <SignIn />}
                {loginViewing && userLoggedIn && connectedAdminOptions()}

                <HeaderMenu
                    categorySelected={categorySelected}
                    handleSelectCategory={handleSelectCategory}
                />

                {/* Liste des recettes */}
                <div className='flex flex-row flex-wrap my-8 gap-x-8 gap-y-8 overflow-auto justify-center mx-10 lg:w-96'>
                    {recettesByCategory?.length > 0
                        ? recettesByCategory.map((recette: Recette) => (
                              <RecipeCard
                                  key={recette.id}
                                  recette={recette}
                                  handleView={handleView}
                              />
                          ))
                        : recettes.map((recette: Recette) => (
                              <RecipeCard
                                  key={recette.id}
                                  recette={recette}
                                  handleView={handleView}
                              />
                          ))}
                </div>

                <Footer />
            </div>
        </div>
    )
}

export default Index
