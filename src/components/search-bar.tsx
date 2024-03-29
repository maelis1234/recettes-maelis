import { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import Button from './button'
import { CiSearch } from 'react-icons/ci'

interface Props {
    reset: boolean
    onSearch: (text: string) => void
    onClearSearch: () => void
    resetSearch: (bool: boolean) => void
}

const SearchBar = ({ reset, onSearch, onClearSearch, resetSearch }: Props) => {
    const [searchedValue, setSearchedValue] = useState<string>('')

    useEffect(() => {
        if (searchedValue.trim() === '') {
            onClearSearch()
        }
        onSearch(searchedValue)
    }, [searchedValue])

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setSearchedValue(value)
    }

    useEffect(() => {
        setSearchedValue('')
        resetSearch(false)
    }, [reset])

    return (
        <div className='mx-auto lg:w-96 w-72'>
            <div className='relative inline-block w-full mt-4'>
                <span className='absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-700'>
                    <CiSearch className='text-gray-400 text-xl' />
                </span>
                <input
                    type='text'
                    placeholder={'Rechercher une recette'}
                    onChange={handleSearch}
                    value={searchedValue}
                    className='w-full pl-10 pb-3 pt-3 bg-pink-100 focus:outline-primary focus:ring rounded-lg '
                />
                {searchedValue.length > 0 && (
                    <Button
                        label='Effacer'
                        type='button'
                        className='rounded-lg w-20 h-8 bg-purple-500 text-white absolute right-4 top-1/2 transform -translate-y-1/2 hover:bg-purple-600'
                        handleClick={() => {
                            setSearchedValue('')
                        }}
                    />
                )}
            </div>
        </div>
    )
}

export default SearchBar
