import { Recette } from '@/utils/interfaces'
import Button from './button'
import { useAuth } from '@/auth/AuthContext'
import { CiEdit, CiTrash } from 'react-icons/ci'

interface Props {
    recette: Recette
    handleView: (id: string) => void
}

const RecipeCard = ({ recette, handleView }: Props) => {
    const connectedUser = useAuth()

    return (
        <div
            key={recette.id}
            className='flex flex-col gap-y-4 w-full bg-pink-100 shadow-xl p-3 rounded-lg'
        >
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

            {recette.viewing && (
                <div className='flex flex-col gap-y-6'>
                    <p className='text-center'>{recette.description}</p>

                    <div>
                        <h4 className='font-semibold'>Ingrédients</h4>
                        <ul className='list-disc pl-6'>
                            {recette.ingredients?.map((ingredient: any) => (
                                <li key={ingredient}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className='font-semibold'>Instructions</h4>
                        <ol className='list-decimal pl-6'>
                            {recette.instructions.map((instruction: any) => (
                                <li key={instruction}>{instruction}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            )}
            <div className='mt-auto pb-1 flex gap-x-6 mx-auto'>
                <Button
                    label={recette.viewing ? 'Voir moins' : 'Voir plus'}
                    type='button'
                    className='bg-gradient-to-r from-rose-400 to-fuchsia-500 hover:from-fuchsia-500 hover:to-rose-400 text-white rounded-lg w-24 h-8 text-sm transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-300'
                    handleClick={() => handleView(recette.id)}
                />
            </div>
        </div>
    )
}

export default RecipeCard
