interface CenterProps {
    children: React.ReactNode;
}

export default function Center({ children }: CenterProps) {
    return (
        <div className="absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4">
            {children}
        </div>
    );
}
