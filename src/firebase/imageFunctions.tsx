import { getDownloadURL, getStorage, ref, uploadBytes } from '@firebase/storage'

export const getImageUrl = async (recetteId: string) => {
    const storage = getStorage()
    const storageRef = ref(
        storage,
        `gs://${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${recetteId}.jpg`
    )
    const downloadURL = await getDownloadURL(storageRef)
    return downloadURL
}

export const uploadImage = async (file: File, recetteId: string) => {
    const storage = getStorage()
    const storageRef = ref(
        storage,
        `gs://${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${recetteId}.jpg`
    )
    await uploadBytes(storageRef, file)
}
