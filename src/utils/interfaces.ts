export enum CategoryEnum {
    plat = 'plat',
    tarte = 'tarte',
    gateau = 'gateau',
    petitDej = 'petitDej',
}

export interface Recette {
    id: string
    viewing: boolean
    titre: string
    description: string
    category: CategoryEnum | undefined
    ingredients: string[]
    instructions: string[]
}

export interface RecetteForm {
    titre: string
    description: string
    category: CategoryEnum | undefined
    ingredients: string[]
    instructions: string[]
    image: File | null
}
