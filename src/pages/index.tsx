import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { database } from '../../firebase.config'
import Header from '@/components/header'
import RecipeCard from '@/components/recipeCard'
import { CategoryEnum, Recette } from '@/utils/interfaces'

const Index: NextPage = () => {
    const [recettes, setRecettes] = useState<Recette[]>([])
    const [recettesByCategory, setRecettesByCategory] = useState<Recette[]>([])
    const [categorySelected, setCategorySelected] = useState<CategoryEnum>()
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

    const handleSelectCategory = (category: CategoryEnum) => {
        setCategorySelected(category)
        setRecettesByCategory(
            recettes.filter((recette) => recette.category === category)
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
                <Header />
                <nav className='h-12 text-white border flex justify-center flex-row align-center space-x-4'>
                    <button
                        className={`hover:underline-offset-4 hover:underline focus:underline-offset-4 focus:underline focus:text-pink-800 ${
                            categorySelected === CategoryEnum.plat &&
                            'underline-offset-4 underline text-pink-800'
                        }`}
                        onClick={() => handleSelectCategory(CategoryEnum.plat)}
                    >
                        Plats salés
                    </button>
                    <button
                        className={`hover:underline-offset-4 hover:underline focus:underline-offset-4 focus:underline focus:text-pink-800 ${
                            categorySelected === CategoryEnum.tarte &&
                            'underline-offset-4 underline text-pink-800'
                        }`}
                        onClick={() => handleSelectCategory(CategoryEnum.tarte)}
                    >
                        Tartes
                    </button>
                    <button
                        className={`hover:underline-offset-4 hover:underline focus:underline-offset-4 focus:underline focus:text-pink-800 ${
                            categorySelected === CategoryEnum.gateau &&
                            'underline-offset-4 underline text-pink-800'
                        }`}
                        onClick={() =>
                            handleSelectCategory(CategoryEnum.gateau)
                        }
                    >
                        Gâteaux
                    </button>
                    <button
                        className={`hover:underline-offset-4 hover:underline focus:underline-offset-4 focus:underline focus:text-pink-800 ${
                            categorySelected === CategoryEnum.petitDej &&
                            'underline-offset-4 underline text-pink-800'
                        }`}
                        onClick={() =>
                            handleSelectCategory(CategoryEnum.petitDej)
                        }
                    >
                        Petit dej
                    </button>
                </nav>
                {/* Liste des recettes */}
                <div className='flex flex-row flex-wrap my-8 gap-x-8 gap-y-8 overflow-auto justify-center mx-16 lg:mx-24'>
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
            </div>
        </div>
    )
}

export default Index
