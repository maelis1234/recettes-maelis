import { Recette } from '@/utils/interfaces'
import Button from './button'
import { useAuth } from '@/auth/AuthContext'
import { CiEdit, CiTrash } from 'react-icons/ci'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

interface Props {
    recette: Recette
    handleView: (id: string) => void
}

const RecipeCard = ({ recette, handleView }: Props) => {
    const connectedUser = useAuth()
    const [isViewing, setIsViewing] = useState<boolean>(false)

    const imagePath = `/images_recettes/${recette.id}.jpg`

    return (
        <div
            key={recette.id}
            className={`flex flex-col gap-y-4 w-full bg-pink-100 shadow-xl p-3.5 rounded-lg lg:w-[350px] ${
                recette.viewing ? 'h-auto' : 'h-[min-content]'
            }`}
        >
            <AnimatePresence mode='wait'>
                {isViewing && (
                    <motion.div
                        key='expanded-view'
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50'
                    >
                        <div className='text-black bg-pink-100 w-[60%] h-3/4 rounded-3xl p-6 overflow-y-auto'>
                            {recette.viewing && (
                                <div className='flex flex-col items-center gap-y-8 h-full'>
                                    <div className='flex flex-row gap-x-8 w-full'>
                                        <div className='flex flex-col gap-y-6 w-1/3'>
                                            <Button
                                                className='border bg-pink-500 text-white hover:bg-pink-400 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-300 w-6 h-6 rounded-full'
                                                label='x'
                                                handleClick={() => {
                                                    setIsViewing(false)
                                                    handleView(recette.id)
                                                }}
                                                type='button'
                                            />
                                            <h3 className='text-center text-2xl font-semibold'>
                                                {recette.titre}
                                            </h3>
                                            <p className='text-center'>
                                                {recette.description}
                                            </p>
                                            <div>
                                                <Image
                                                    src={imagePath}
                                                    alt={`${recette.titre}_image`}
                                                    width={230}
                                                    height={230}
                                                    className='rounded-lg mx-auto'
                                                />
                                            </div>
                                        </div>

                                        <div className='w-2/3 flex flex-col gap-y-6 justify-center max-h-full text-sm'>
                                            <div>
                                                <h4 className='font-semibold'>
                                                    Ingrédients
                                                </h4>
                                                <ul className='list-disc pl-6 text-sm'>
                                                    {recette.ingredients?.map(
                                                        (ingredient: any) => (
                                                            <li
                                                                key={ingredient}
                                                            >
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
                                                        (instruction: any) => (
                                                            <li
                                                                key={
                                                                    instruction
                                                                }
                                                            >
                                                                {instruction}
                                                            </li>
                                                        )
                                                    )}
                                                </ol>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {connectedUser.currentUser !== null && (
                <div className='flex flex-row justify-between -mb-8'>
                    <CiEdit
                        className='text-pink-800 text-2xl cursor-pointer hover:text-pink-500'
                        onClick={() => console.log('modifier')}
                    />
                    <CiTrash
                        className='text-pink-800 text-2xl cursor-pointer hover:text-pink-500'
                        onClick={() => console.log('supprimer')}
                    />
                </div>
            )}
            <h3 className='text-center font-semibold'>{recette.titre}</h3>

            <div>
                <Image
                    src={imagePath}
                    alt={`${recette.titre}_image`}
                    width={150}
                    height={150}
                    className='rounded-lg mx-auto'
                />
            </div>

            <div className='mt-auto pb-1 flex gap-x-6 mx-auto'>
                <Button
                    label={recette.viewing ? 'Voir moins' : 'Voir plus'}
                    type='button'
                    className='bg-gradient-to-r from-rose-400 to-fuchsia-500 hover:from-fuchsia-500 hover:to-rose-400 text-white rounded-lg w-24 h-8 text-sm'
                    handleClick={() => {
                        handleView(recette.id)
                        setIsViewing(true)
                    }}
                />
            </div>
        </div>
    )
}

export default RecipeCard
