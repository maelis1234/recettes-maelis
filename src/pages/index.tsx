import { NextPage } from 'next'
import Head from 'next/head'
import { ChangeEvent, useEffect, useState } from 'react'
import { collection, onSnapshot, addDoc } from 'firebase/firestore'
import { database } from '../../firebase.config'

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
    const [form, setForm] = useState({
        titre: '',
        description: '',
        ingredients: [''] as string[],
        instructions: [''] as string[],
    })

    const [popupActive, setPopupActive] = useState(false)

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

        recettesClone.forEach((recette) => {
            if (recette.id === id) {
                recette.viewing = !recette.viewing
            } else {
                recette.viewing = false
            }
        })

        setRecettes(recettesClone)
    }

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (
            !form.titre ||
            form.description.length === 0 ||
            form.ingredients.length === 0 ||
            form.instructions.length === 0
        ) {
            alert('Please fill out all fields')
            return
        }

        addDoc(recettesCollectionRef, form)

        setForm({
            titre: '',
            description: '',
            ingredients: [''],
            instructions: [''],
        })

        setPopupActive(false)
    }

    const handleIngredient = (e: ChangeEvent<HTMLInputElement>, i: number) => {
        const ingredientsClone = [...form.ingredients]
        ingredientsClone[i] = e.target.value
        setForm({ ...form, ingredients: ingredientsClone })
    }

    const handleInstruction = (e: ChangeEvent<HTMLInputElement>, i: number) => {
        const instructionsClone = [...form.instructions]
        instructionsClone[i] = e.target.value
        setForm({ ...form, instructions: instructionsClone })
    }

    const handleAddIngredient = () => {
        setForm({
            ...form,
            ingredients: [...form.ingredients, ''],
        })
    }

    const handleAddInstruction = () => {
        setForm({
            ...form,
            instructions: [...form.instructions, ''],
        })
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
                <h1 className='text-center text-pink-50 text-3xl'>
                    Les Recettes de Maëlis
                </h1>

                <button
                    className='bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-yellow-500 hover:to-pink-500 text-white py-2 px-4 rounded-lg w-64 h-12 text-2xl flex justify-center mx-auto'
                    onClick={() => setPopupActive(!popupActive)}
                >
                    Ajouter une recette
                </button>

                <div className='flex flex-row flex-wrap gap-x-8 gap-y-8 overflow-auto justify-center'>
                    {/*Card Recette*/}
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
                                    className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white rounded-lg w-20 h-8 text-sm'
                                >
                                    Voir {recette.viewing ? 'moins' : 'plus'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Modale ajouter une nouvelle recette */}
            {popupActive && (
                <div className='fixed inset-0 flex items-center justify-center z-50'>
                    <div className='fixed inset-0 z-0 bg-black opacity-70'></div>{' '}
                    {/* Fond d'écran flou pour l'arrière-plan */}
                    <div className='bg-gray-50 rounded-md p-8 shadow-lg border-gray-400 max-w-[60vh] max-h-[80vh] overflow-y-auto relative z-10'>
                        <h2 className='text-center text-xl'>
                            Ajouter une recette
                        </h2>

                        <form
                            onSubmit={handleSubmit}
                            className='flex gap-y-4 flex-col'
                        >
                            <div>
                                <div className='sm:col-span-4'>
                                    <label
                                        htmlFor='titre'
                                        className='block text-sm font-medium leading-6 text-gray-900'
                                    >
                                        Titre
                                    </label>
                                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                                        <input
                                            type='text'
                                            name='titre'
                                            id='titre'
                                            className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                                            placeholder='Moelleux au chocolat'
                                            value={form.titre}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    titre: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className='sm:col-span-4'>
                                    <label
                                        htmlFor='titre'
                                        className='block text-sm font-medium leading-6 text-gray-900'
                                    >
                                        Description
                                    </label>
                                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                                        <span className='flex select-none items-center pl-3 text-gray-500 sm:text-sm'></span>
                                        <textarea
                                            name='description'
                                            id='description'
                                            className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                                            placeholder='Une merveilleuse recette rapide et gourmande ! '
                                            value={form.description}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    description: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor='ingredient'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                >
                                    Ingrédients
                                </label>{' '}
                                {form.ingredients.map((ingredient, index) => (
                                    <div
                                        key={ingredient}
                                        className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md mt-2'
                                    >
                                        <input
                                            type='text'
                                            name='ingredient'
                                            id='ingredient'
                                            className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                                            placeholder='100g de farine'
                                            value={ingredient}
                                            onChange={(event) =>
                                                handleIngredient(event, index)
                                            }
                                        />
                                    </div>
                                ))}
                                <button
                                    className='bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-2 px-4 rounded-lg mt-2'
                                    onClick={handleAddIngredient}
                                    type='button'
                                >
                                    Ajouter un ingrédient
                                </button>
                            </div>

                            <div>
                                <label
                                    htmlFor='instruction'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                >
                                    Instructions
                                </label>{' '}
                                {form.instructions.map((instruction, index) => (
                                    <div
                                        key={instruction}
                                        className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md mt-2'
                                    >
                                        <input
                                            type='text'
                                            name='instruction'
                                            id='instruction'
                                            className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                                            placeholder='Mélanger la farine et le sucre.'
                                            value={instruction}
                                            onChange={(event) =>
                                                handleInstruction(event, index)
                                            }
                                        />
                                    </div>
                                ))}
                                <button
                                    className='bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-2 px-4 rounded-lg mt-2 '
                                    onClick={handleAddInstruction}
                                    type='button'
                                >
                                    Ajouter une instruction
                                </button>
                            </div>

                            <div className='flex flex-row space-x-44 mt-4 '>
                                <button
                                    className='bg-gradient-to-r from-green-300 via-green-400 to-green-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg'
                                    type='submit'
                                >
                                    Valider
                                </button>
                                <button
                                    className='bg-gradient-to-r from-yellow-600 to-red-600 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg'
                                    onClick={() => setPopupActive(false)}
                                    type='button'
                                >
                                    Fermer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Index
