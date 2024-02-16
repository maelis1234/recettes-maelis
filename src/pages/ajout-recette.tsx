import { NextPage } from 'next'
import { ChangeEvent, FormEvent, useState } from 'react'
import { collection, setDoc, doc } from 'firebase/firestore'
import { database } from '../../firebase.config'
import Head from 'next/head'
import router from 'next/router'
import Select from 'react-select'
import { toast } from 'react-toastify'
import Button from '@/components/button'
import { CategoryEnum, RecetteForm } from '@/utils/interfaces'
import { uploadImage } from '@/firebase/imageFunctions'
import UploadImage from '@/components/uploadImage'

const AjoutRecette: NextPage = () => {
    const recettesCollectionRef = collection(database, 'recettes')

    const categories = [
        { label: 'Salé', value: CategoryEnum.plat },
        { label: 'Tartes', value: CategoryEnum.tarte },
        { label: 'Gâteaux', value: CategoryEnum.gateau },
        { label: 'Petit dej', value: CategoryEnum.petitDej },
    ]

    const [form, setForm] = useState<RecetteForm>({
        titre: '',
        description: '',
        category: undefined,
        ingredients: [''],
        instructions: [''],
        image: null,
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

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file) {
            const isJpg =
                file.type === 'image/jpeg' || file.type === 'image/jpg'

            if (!isJpg) {
                toast.error('Veuillez sélectionner un fichier JPG.')
            } else {
                setForm({ ...form, image: file })
            }
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (
            !form.titre ||
            !form.description ||
            !form.category ||
            form.ingredients.length === 0 ||
            form.instructions.length === 0 ||
            form.image === null
        ) {
            toast.error(
                "Merci de remplir tous les champs et/ou d'ajouter une image."
            )
            return
        }

        const recetteId = form.titre.toLowerCase().split(' ').join('-')
        const recetteDocRef = doc(recettesCollectionRef, recetteId)

        await setDoc(recetteDocRef, {
            titre: form.titre,
            description: form.description,
            category: form.category,
            ingredients: form.ingredients,
            instructions: form.instructions,
        })
        await uploadImage(form.image, recetteId)
        toast('🧁 Recette ajoutée avec succès !')
        setForm({
            titre: '',
            description: '',
            category: undefined,
            ingredients: [''],
            instructions: [''],
            image: null,
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
            <div className='flex flex-col items-center'>
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
                            id='category'
                            options={categories}
                            onChange={(selectedOption) =>
                                setForm({
                                    ...form,
                                    category:
                                        selectedOption?.value ?? undefined,
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

                    <UploadImage onChange={handleFileChange} />

                    {form.image && (
                        <img
                            src={URL.createObjectURL(form.image)}
                            alt='image'
                            className='w-32 h-32 rounded-lg mt-2 mx-auto'
                        />
                    )}

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
