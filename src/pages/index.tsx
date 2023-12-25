import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { collection, onSnapshot, or } from 'firebase/firestore'
import { database } from '../../firebase.config'
import HeaderMenu from '@/components/headerMenu'
import RecipeCard from '@/components/recipeCard'
import { CategoryEnum, Recette } from '@/utils/interfaces'
import Footer from '@/components/footer'

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
