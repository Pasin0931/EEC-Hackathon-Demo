import Menu from "@/components/menu"

export default function MenuPage() {
    return (
        <div
            className="flex flex-cols justify-center items-center h-screen"
            style={{ backgroundImage: "url('/background.jpg')" }}
        >
            <Menu />
        </div>
    )
}