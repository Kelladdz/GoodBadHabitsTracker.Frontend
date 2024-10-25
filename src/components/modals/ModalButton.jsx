export default function ModalButton({className, onClick, label}) {
    return (
        <button className={className} onClick={onClick}>{label}</button>
    )
}