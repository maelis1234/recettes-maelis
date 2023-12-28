import { NextPage } from 'next'
import { ChangeEvent, FormEvent, useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { database } from '../../firebase.config'
import Head from 'next/head'
import router from 'next/router'

const AjoutRecette: NextPage = () => {
    const recettesCollectionRef = collection(database, 'recettes')

    const [form, setForm] = useState({
        titre: '',
        description: '',
        category: '',
        ingredients: [''],
        instructions: [''],
    })

    const handleChangeIngredients = (index: number, value: string) => {
        const updatedIngredients = [...form.ingredients]
        updatedIngredients[index] = value
        setForm({ ...form, ingredients: updatedIngredients })
    }

    const handleChangeInstructions = (index: number, value: string) => {
        const updatedInstructions = [...form.instructions]
        updatedInstructions[index] = value
        setForm({ ...form, instructions: updatedInstructions })
    }

    const handleAddField = (type: 'ingredients' | 'instructions') => {
        const updatedArray = [...form[type], '']
        setForm({ ...form, [type]: updatedArray })
    }

    const handleRemoveField = (
        index: number,
        type: 'ingredients' | 'instructions'
    ) => {
        const updatedArray = [...form[type]]
        updatedArray.splice(index, 1)
        setForm({ ...form, [type]: updatedArray })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (
            !form.titre ||
            form.description.length === 0 ||
            form.category.length === 0 ||
            form.ingredients.length === 0 ||
            form.instructions.length === 0
        ) {
            alert('Merci de remplir tous les champs')
            return
        }

        await addDoc(recettesCollectionRef, form)

        alert('Recette ajoutée avec succès')
        setForm({
            titre: '',
            description: '',
            category: '',
            ingredients: [''],
            instructions: [''],
        })
    }

    return (
        <>
            <Head>
                <title>Recettes de Maëlis</title>
                <meta
                    name='description'
                    content='Mes recettes personnelles, sucrées et salées.'
                />
            </Head>
            <div className='m-4'>
                <h1>Ajouter une recette</h1>
                <button
                    onClick={() => {
                        router.push('/')
                    }}
                    className='bg-gradient-to-r from-blue-300 to-pink-400 hover:from-pink-400 hover:to-blue-300 text-white rounded-lg h-8 w-36 text-sm mb-4'
                >
                    Retour à l'accueil
                </button>
                <form onSubmit={handleSubmit} className='flex flex-col gap-y-4'>
                    <div className='flex flex-col w-72'>
                        <label>Titre de la recette</label>
                        <input
                            className='rounded-md'
                            type='text'
                            name='titre'
                            value={form.titre}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setForm({ ...form, titre: e.target.value })
                            }
                        />
                    </div>

                    <div className='flex flex-col w-72'>
                        <label>Description</label>
                        <input
                            className='rounded-md'
                            type='text'
                            name='description'
                            value={form.description}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setForm({
                                    ...form,
                                    description: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className='flex flex-col w-72'>
                        <label>Catégorie</label>
                        <select
                            className='rounded-md'
                            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                setForm({
                                    ...form,
                                    category: e.target.value,
                                })
                            }
                        >
                            <option value='tarte'>Tarte</option>
                            <option value='plat'>Salé</option>
                            <option value='gateau'>Gâteau</option>
                            <option value='petitDej'>Petit dej</option>
                        </select>
                    </div>

                    <label>
                        Ingrédients
                        {form.ingredients.map((ingredient, index) => (
                            <div key={index} className='flex items-center'>
                                <input
                                    className='ml-4 mt-2 rounded-md'
                                    name={`ingredients-${index}`}
                                    value={ingredient}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) =>
                                        handleChangeIngredients(
                                            index,
                                            e.target.value
                                        )
                                    }
                                />
                                <button
                                    className='bg-gradient-to-r from-red-400 to-yellow-500 hover:from-yellow-500 hover:to-red-400 text-white rounded-lg h-6 w-20 text-xs ml-4'
                                    type='button'
                                    onClick={() =>
                                        handleRemoveField(index, 'ingredients')
                                    }
                                >
                                    Supprimer
                                </button>
                            </div>
                        ))}
                        <button
                            className='bg-gradient-to-r from-blue-400 to-green-500 hover:from-green-500 hover:to-blue-400 text-white rounded-lg h-6 w-36 text-xs ml-4 mt-2'
                            type='button'
                            onClick={() => handleAddField('ingredients')}
                        >
                            Ajouter ingrédient
                        </button>
                    </label>
                    <label>
                        Instructions
                        {form.instructions.map((instruction, index) => (
                            <div
                                key={index}
                                className='flex flex-row gap-y-2 w-96'
                            >
                                <input
                                    className='ml-4 mt-2 rounded-md'
                                    name={`instructions-${index}`}
                                    value={instruction}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) =>
                                        handleChangeInstructions(
                                            index,
                                            e.target.value
                                        )
                                    }
                                />
                                <button
                                    className='bg-gradient-to-r from-red-400 to-yellow-500 hover:from-yellow-500 hover:to-red-400 text-white rounded-lg h-6 w-20 text-xs ml-4
                                
                                xs'
                                    type='button'
                                    onClick={() =>
                                        handleRemoveField(index, 'instructions')
                                    }
                                >
                                    Supprimer
                                </button>
                            </div>
                        ))}
                        <button
                            className='bg-gradient-to-r from-blue-400 to-pink-500 hover:from-pink-500 hover:to-blue-400 text-white rounded-lg h-6 w-36 text-xs ml-4 mt-2'
                            type='button'
                            onClick={() => handleAddField('instructions')}
                        >
                            Ajouter instruction
                        </button>
                    </label>
                    <br />
                    <button
                        type='submit'
                        className='bg-gradient-to-r from-blue-400 to-purple-500 hover:from-purple-500 hover:to-blue-400 text-white rounded-lg h-8 w-36 text-sm'
                    >
                        Ajouter la recette
                    </button>
                </form>
            </div>
        </>
    )
}

export default AjoutRecette
