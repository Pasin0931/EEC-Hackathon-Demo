import Scan from "@/components/scan"

export default function ScanPage() {
    return (
        <div
            className="flex flex-cols justify-center items-center h-screen"
            style={{ backgroundImage: "url('/background.jpg')" }}
        >
            <Scan />
        </div>
    )
}