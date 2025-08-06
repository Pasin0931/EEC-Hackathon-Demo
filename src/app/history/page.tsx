import History from '@/components/history'

export default function HistoryPage() {
    return (
        <div
            className="flex flex-cols justify-center items-center h-screen"
            style={{ backgroundImage: "url('/background.jpg')" }}
        >
            <History />
        </div>
    )
}