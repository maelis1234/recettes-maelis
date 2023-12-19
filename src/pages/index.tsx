import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { database } from '../../firebase.config'
import Header from '@/components/header'

const Index: NextPage = () => {
    const [recettes, setRecettes] = useState<
        {
            id: string
            viewing: boolean
            titre: string
            description: []
            ingredients: []
            instructions: []
        }[]
    >([])

    const recettesCollectionRef = collection(database, 'recettes')

    useEffect(() => {
        onSnapshot(recettesCollectionRef, (snapshot) => {
            setRecettes(
                snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        viewing: false,
                        titre: doc.data().titre,
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

    return (
        <div>
            <Head>
                <title>Recettes de Maëlis</title>
                <meta
                    name='description'
                    content='Mes recettes personnelles, sucrées et salées.'
                />
            </Head>

            <div className='flex flex-col gap-y-8 py-10'>
                <Header />
                <div className='flex flex-row flex-wrap gap-x-8 gap-y-8 overflow-auto justify-center'>
                    {/* Card Recette */}
                    {recettes.map((recette) => (
                        <div
                            key={recette.id}
                            className='flex flex-col gap-y-4 w-96 bg-pink-100 shadow-xl p-3 rounded-lg'
                        >
                            <h2 className='text-center font-semibold'>
                                {recette.titre}
                            </h2>

                            <p
                                className='text-center'
                                dangerouslySetInnerHTML={{
                                    __html: recette.description,
                                }}
                            />

                            {recette.viewing && (
                                <div className='flex flex-col gap-y-4'>
                                    <div>
                                        <h4 className='font-semibold'>
                                            Ingrédients
                                        </h4>
                                        <ul className='list-disc pl-6'>
                                            {recette.ingredients?.map(
                                                (ingredient) => (
                                                    <li key={ingredient}>
                                                        {ingredient}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className='font-semibold'>
                                            Instructions
                                        </h4>
                                        <ol className='list-decimal pl-6'>
                                            {recette.instructions.map(
                                                (instruction) => (
                                                    <li key={instruction}>
                                                        {instruction}
                                                    </li>
                                                )
                                            )}
                                        </ol>
                                    </div>
                                </div>
                            )}

                            <div className='mt-auto pb-1 flex gap-x-6 mx-auto'>
                                <button
                                    onClick={() => handleView(recette.id)}
                                    className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white rounded-lg w-24 h-8 text-sm'
                                >
                                    Voir {recette.viewing ? 'moins' : 'plus'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Index
