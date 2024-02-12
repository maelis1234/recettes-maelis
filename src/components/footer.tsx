import { FaGithub, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className='text-sm font-normal text-white p-3'>
            <div className='flex flex-row space-x-3'>
                <div>
                    <a
                        href='https://github.com/maelis1234/recettes-maelis'
                        rel='noopener noreferrer'
                        target='_blank'
                    >
                        <FaGithub className='text-white text-xl cursor-pointer hover:text-pink-500' />
                    </a>
                </div>
                <div>
                    <a
                        href='https://www.linkedin.com/in/maelis-hammouche'
                        rel='noopener noreferrer'
                        target='_blank'
                    >
                        <FaLinkedin className='text-white text-xl cursor-pointer hover:text-pink-500' />
                    </a>
                </div>
            </div>
            <div className='flex pt-2'>
                <p>Made with ❤️ by Maëlis Hammouche</p>
            </div>
        </footer>
    )
}

export default Footer
