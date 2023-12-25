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
    category: CategoryEnum
    ingredients: []
    instructions: []
}
