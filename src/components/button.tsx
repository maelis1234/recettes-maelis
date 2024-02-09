interface Props {
    label: string
    className: string
    type: 'button' | 'submit'
    handleClick: () => void
}

const Button = ({ label, className, type, handleClick }: Props) => {
    return (
        <button className={className} type={type} onClick={() => handleClick()}>
            {label}
        </button>
    )
}

export default Button
