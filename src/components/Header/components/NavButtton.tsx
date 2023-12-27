interface NavButtonProps {
    children: React.ReactNode,
    onPressed: () => void,
    highlight: boolean
}

export default function NavButtton({ children, onPressed, highlight }: NavButtonProps) {
    return (
        <button onClick={onPressed} className={`${highlight && "bg-violet-200 px-2 py-1 rounded-md text-violet-600 font-semibold  "}`}>
            {children}
        </button>
    )
}
