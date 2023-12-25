import { Recette } from '@/utils/interfaces'

interface Props {
    recette: Recette
    handleView: (id: string) => void
}

const RecipeCard = ({ recette, handleView }: Props) => {
    return (
        <div
            key={recette.id}
            className='flex flex-col gap-y-4 w-full bg-pink-100 shadow-xl p-3 rounded-lg'
        >
            <h2 className='text-center font-semibold'>{recette.titre}</h2>

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
                <button
                    onClick={() => handleView(recette.id)}
                    className='bg-gradient-to-r from-rose-400 to-fuchsia-500 hover:from-fuchsia-500 hover:to-rose-400 text-white rounded-lg w-24 h-8 text-sm'
                >
                    Voir {recette.viewing ? 'moins' : 'plus'}
                </button>
            </div>
        </div>
    )
}

export default RecipeCard
