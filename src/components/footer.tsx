import Link from 'next/link'

const Footer = () => {
    return (
        <footer className='text-sm text-white p-3'>
            <div className='space-x-4'>
                <Link
                    href='https://www.linkedin.com/in/maelis-hammouche/'
                    rel='noopener noreferrer'
                    target='_blank'
                    className='text-white'
                >
                    <i className='ri-linkedin-fill text-white text-xl hover:text-primary-violet' />
                </Link>
                <Link
                    href='https://github.com/maelis1234'
                    rel='noopener noreferrer'
                    target='_blank'
                >
                    <i className='ri-github-fill text-white text-xl hover:text-primary-violet' />
                </Link>
            </div>
            <div className='flex pt-2'>
                <i className='ri-copyright-fill pr-1' />
                <p>2023 par Maëlis Hammouche</p>
            </div>
        </footer>
    )
}

export default Footer
