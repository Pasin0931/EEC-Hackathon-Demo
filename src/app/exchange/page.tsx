import Exchange from '@/components/exchange'

export default function EchangePage() {
    return (
        <div
            className="flex flex-cols justify-center items-center h-screen"
            style={{ backgroundImage: "url('/background.jpg')" }}
        >
            <Exchange />
        </div>
    )
}