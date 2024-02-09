import { CategoryEnum } from '@/utils/interfaces'

interface Props {
    categorySelected: CategoryEnum | undefined
    handleSelectCategory: (category: CategoryEnum | undefined) => void
}

const HeaderMenu = ({ categorySelected, handleSelectCategory }: Props) => {
    const categories = [
        { label: 'Toutes', value: undefined },
        { label: 'Salé', value: CategoryEnum.plat },
        { label: 'Tartes', value: CategoryEnum.tarte },
        { label: 'Gâteaux', value: CategoryEnum.gateau },
        { label: 'Petit dej', value: CategoryEnum.petitDej },
    ]

    return (
        <>
            <h1>Les Recettes de Maëlis 🍪</h1>
            <nav className='h-12 text-white border border-pink-200 flex justify-center flex-row align-center space-x-4 rounded-xl mx-2'>
                {categories.map(({ label, value }) => (
                    <button
                        key={label}
                        className={`menu-item ${
                            categorySelected === value &&
                            'underline-offset-4 underline text-pink-500'
                        }`}
                        onClick={() => handleSelectCategory(value)}
                    >
                        {label}
                    </button>
                ))}
            </nav>
        </>
    )
}

export default HeaderMenu
