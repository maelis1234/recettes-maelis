import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { database } from '../../firebase.config'
import HeaderMenu from '@/components/headerMenu'
import RecipeCard from '@/components/recipeCard'
import { CategoryEnum, Recette } from '@/utils/interfaces'
import Footer from '@/components/footer'
import SearchBar from '@/components/search-bar'
import { removeAccents } from '@/utils/remove-accents.utils'

const Index: NextPage = () => {
    const [recettes, setRecettes] = useState<Recette[]>([])
    const [recettesByCategory, setRecettesByCategory] = useState<Recette[]>([])
    const [categorySelected, setCategorySelected] = useState<CategoryEnum>()
    const [filteredRecettes, setFilteredRecettes] = useState<Recette[]>([])
    const [isSearching, setIsSearching] = useState<boolean>(false)

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

            setIsSearching(false)
            setFilteredRecettes([])
        } else {
            setCategorySelected(undefined)
            setRecettesByCategory([])
        }
    }

    const handleSearch = (searchTerm: string) => {
        setIsSearching(true)
        // On enlève les accents pour la recherche et on divise en mots
        const searchWords = removeAccents(searchTerm).toLowerCase().split(' ')

        const recettesToFilter = categorySelected
            ? recettesByCategory
            : recettes

        const filtered = recettesToFilter.filter((recette) => {
            // Vérifier si au moins un mot est présent dans le titre ou la description
            return searchWords.some((word) => {
                return (
                    removeAccents(recette.titre).toLowerCase().includes(word) ||
                    removeAccents(recette.description)
                        .toLowerCase()
                        .includes(word)
                )
            })
        })
        setFilteredRecettes(filtered)
    }

    const handleDisplayRecettes = () => {
        if (isSearching) {
            return filteredRecettes
        } else {
            return categorySelected ? recettesByCategory : recettes
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
                <SearchBar
                    onSearch={(text) => {
                        handleSearch(text)
                    }}
                />

                {/* Liste des recettes */}
                <div className='flex flex-row flex-wrap my-8 gap-x-8 gap-y-8 overflow-auto justify-center mx-10 lg:mx-96'>
                    {handleDisplayRecettes().map((recette: Recette) => (
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
