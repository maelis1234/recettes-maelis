import { NextPage } from 'next'
import { ChangeEvent, FormEvent, useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { database } from '../../firebase.config'
import Head from 'next/head'
import router from 'next/router'
import Select from 'react-select'
import { toast } from 'react-toastify'
import Button from '@/components/button'
import { CategoryEnum } from '@/utils/interfaces'

const AjoutRecette: NextPage = () => {
    const recettesCollectionRef = collection(database, 'recettes')

    const categories = [
        { label: 'Salé', value: CategoryEnum.plat },
        { label: 'Tartes', value: CategoryEnum.tarte },
        { label: 'Gâteaux', value: CategoryEnum.gateau },
        { label: 'Petit dej', value: CategoryEnum.petitDej },
    ]

    const [form, setForm] = useState({
        titre: '',
        description: '',
        category: '',
        ingredients: [''],
        instructions: [''],
    })

    const handleChangeField = (
        index: number,
        value: string,
        type: 'ingredients' | 'instructions'
    ) => {
        const updatedFields = [...form[type]]
        updatedFields[index] = value
        setForm({ ...form, [type]: updatedFields })
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
            toast.error('Merci de remplir tous les champs.')
            return
        }

        await addDoc(recettesCollectionRef, form)
        toast('🧁 Recette ajoutée avec succès !')
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
            <h1>Ajouter une recette</h1>
            <div className='flex flex-col items-center h-screen'>
                <Button
                    label="Retour à l'accueil"
                    className='bg-gradient-to-r from-blue-300 to-pink-400 hover:from-pink-400 hover:to-blue-300 text-white rounded-lg h-8 w-36 text-sm mb-4'
                    type='button'
                    handleClick={() => {
                        router.push('/')
                    }}
                />
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-y-4 bg-pink-100 p-4 rounded-lg w-96 mb-12'
                >
                    <div className='flex flex-col w-72'>
                        <label htmlFor='titre'>Titre de la recette</label>
                        <input
                            className='rounded-md border border-gray-300 h-8'
                            type='text'
                            id='titre'
                            name='titre'
                            value={form.titre}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setForm({ ...form, titre: e.target.value })
                            }
                        />
                    </div>

                    <div className='flex flex-col w-72'>
                        <label htmlFor='description'>Description</label>
                        <textarea
                            id='description'
                            className='rounded-md h-16 border border-gray-300'
                            name='description'
                            value={form.description}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                setForm({
                                    ...form,
                                    description: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className='flex flex-col w-72'>
                        <label htmlFor='category'>Catégorie</label>
                        <Select
                            options={categories}
                            onChange={(selectedOption) =>
                                setForm({
                                    ...form,
                                    category: selectedOption?.value ?? '',
                                })
                            }
                            inputValue={''}
                            placeholder='Choisir une catégorie'
                            value={categories.find(
                                (option) => option.value === form.category
                            )}
                        />
                    </div>

                    <label>
                        Ingrédients
                        {form.ingredients.map((ingredient, index) => (
                            <div key={index} className='flex items-center'>
                                <input
                                    className='mt-2 rounded-md h-8'
                                    name={`ingredients-${index}`}
                                    value={ingredient}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) =>
                                        handleChangeField(
                                            index,
                                            e.target.value,
                                            'ingredients'
                                        )
                                    }
                                />
                                {index !== 0 && (
                                    <Button
                                        label='x'
                                        className='remove-field-btn'
                                        type='button'
                                        handleClick={() =>
                                            handleRemoveField(
                                                index,
                                                'ingredients'
                                            )
                                        }
                                    />
                                )}
                            </div>
                        ))}
                        <Button
                            label='+ Ingrédient'
                            className='add-field-btn'
                            type='button'
                            handleClick={() => handleAddField('ingredients')}
                        />
                    </label>
                    <label>
                        Instructions
                        {form.instructions.map((instruction, index) => (
                            <div key={index}>
                                <input
                                    className='mt-2 rounded-md h-8'
                                    name={`instructions-${index}`}
                                    value={instruction}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) =>
                                        handleChangeField(
                                            index,
                                            e.target.value,
                                            'instructions'
                                        )
                                    }
                                />
                                {index !== 0 && (
                                    <Button
                                        label='x'
                                        className='remove-field-btn'
                                        type='button'
                                        handleClick={() =>
                                            handleRemoveField(
                                                index,
                                                'instructions'
                                            )
                                        }
                                    />
                                )}
                            </div>
                        ))}
                        <Button
                            label='+ Instruction'
                            className='add-field-btn'
                            type='button'
                            handleClick={() => handleAddField('instructions')}
                        />
                    </label>
                    <br />
                    <Button
                        label='Ajouter la recette'
                        type='submit'
                        className='bg-gradient-to-r from-blue-400 to-purple-500 hover:from-purple-500 hover:to-blue-400 text-white rounded-lg h-8 w-36 text-sm'
                        handleClick={() => {}}
                    />
                </form>
            </div>
        </>
    )
}

export default AjoutRecette
