import { Link } from "react-router"
import clsx from "clsx"
import ColorScheme from "../../modules/ColorScheme/ColorScheme"
import Logo from "../../modules/SVG/Logo"
import Avatar from "../../modules/Avatar/Avatar"

export default function () {
    return (
        <div className={clsx(
            "navbar shadow-lg",
            "bg-primary text-primary-content",
            "border-b-base-content/10 border-b-1",
            "sticky top-0 z-1 w-[100vw] px-10"
        )}
        >
            <div className="flex flex-1 items-center">
                <Link to="/" className="inline-block text-primary-content hover:text-primary-content/70">
                    <Logo />
                </Link>
            </div>
            <div className="flex gap-2 items-center">
                <ColorScheme />
                <div className="dropdown dropdown-end">
                    <Avatar
                        src="assets/images/profile/003.jpg"
                        aria-label="プロフィール"
                        alt="プロフィール画像"
                        tabIndex={0}
                        role="button"
                        className="cursor-pointer"
                    />
                    <ul tabIndex={-1} className="dropdown-content menu rounded-box bg-base-200 text-base-content z-1 w-52 p-2 shadow-lg border-base-content/10 border-1">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}