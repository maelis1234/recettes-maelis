/**
 * La méthode "removeAccents" permet de supprimer les accents d'un texte.
 * Utile pour "normaliser" deux textes pour pouvoir les comparer en ignorant les accents.
 * Par exemple avec une barre de recherche comme utilisé actuellement.
 */

const accentsMap = new Map([
    ['A', 'Á|À|Ã|Â|Ä'],
    ['a', 'á|à|ã|â|ä'],
    ['E', 'É|È|Ê|Ë'],
    ['e', 'é|è|ê|ë'],
    ['I', 'Í|Ì|Î|Ï'],
    ['i', 'í|ì|î|ï'],
    ['O', 'Ó|Ò|Ô|Õ|Ö'],
    ['o', 'ó|ò|ô|õ|ö'],
    ['U', 'Ú|Ù|Û|Ü'],
    ['u', 'ú|ù|û|ü'],
    ['C', 'Ç'],
    ['c', 'ç'],
    ['N', 'Ñ'],
    ['n', 'ñ'],
])

export const removeAccents = (text: string) => {
    const replacements = Array.from(accentsMap.entries())

    for (const [key, value] of replacements) {
        const regex = new RegExp(value, 'g')
        text = text.replace(regex, key)
    }

    return text
}
