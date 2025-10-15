import { Link } from "react-router"
import ColorScheme from "../../modules/ColorScheme/ColorScheme"
import Logo from "../../modules/SVG/Logo"

export default function () {
    return (
        <div className="navbar bg-primary text-primary-content fixed top-0 z-1 w-[100vw] border-b-base-content/10 border-b-1 shadow-lg px-10">
            <div className="flex flex-1 items-center">
                <Link to="/" className="inline-block text-primary-content hover:text-primary-content/70">
                    <Logo />
                </Link>
            </div>
            <div className="flex gap-2 items-center">
                <ColorScheme />
                <Link to="/profile">
                    <div
                        className="avatar hover:opacity-80 transition-all duration-300"
                        aria-label="プロフィール"
                    >
                        <div className="w-10 rounded-full">
                            <img alt="プロフィール画像" src="assets/images/profile/003.jpg" />
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}