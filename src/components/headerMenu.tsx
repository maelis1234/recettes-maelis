import { CategoryEnum } from '@/utils/interfaces'

interface Props {
    categorySelected: CategoryEnum | undefined
    handleSelectCategory: (category: CategoryEnum | undefined) => void
}

const HeaderMenu = ({ categorySelected, handleSelectCategory }: Props) => {
    return (
        <>
            <h1 className=''>Les Recettes de Maëlis 🍪</h1>
            <nav className='h-12 text-white border border-pink-200 flex justify-center flex-row align-center space-x-4 rounded-xl mx-2'>
                <button
                    className={`menu-item ${
                        categorySelected === undefined &&
                        'underline-offset-4 underline text-pink-500'
                    }`}
                    onClick={() => handleSelectCategory(undefined)}
                >
                    Toutes
                </button>
                <button
                    className={`menu-item ${
                        categorySelected === CategoryEnum.plat &&
                        'underline-offset-4 underline text-pink-00'
                    }`}
                    onClick={() => handleSelectCategory(CategoryEnum.plat)}
                >
                    Salé
                </button>
                <button
                    className={`menu-item ${
                        categorySelected === CategoryEnum.tarte &&
                        'underline-offset-4 underline text-pink-500'
                    }`}
                    onClick={() => handleSelectCategory(CategoryEnum.tarte)}
                >
                    Tartes
                </button>
                <button
                    className={`menu-item ${
                        categorySelected === CategoryEnum.gateau &&
                        'underline-offset-4 underline text-pink-500'
                    }`}
                    onClick={() => handleSelectCategory(CategoryEnum.gateau)}
                >
                    Gâteaux
                </button>
                <button
                    className={`menu-item ${
                        categorySelected === CategoryEnum.petitDej &&
                        'underline-offset-4 underline text-pink-500'
                    }`}
                    onClick={() => handleSelectCategory(CategoryEnum.petitDej)}
                >
                    Petit dej
                </button>
            </nav>
        </>
    )
}

export default HeaderMenu
