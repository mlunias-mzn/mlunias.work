import type { ReactNode } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

export default function (props: { pageName: string, children?: ReactNode }) {

    return (
        <div
            className="bg-base-200 text-base-content fixed top-0 h-full w-full overflow-y-auto overflow-x-hidden"
            style={{
                backgroundImage: "radial-gradient(circle, rgb(from var(--color-base-content) r g b / 0.3) 1px, transparent 1px)",
                backgroundPosition: "0 0",
                backgroundSize: "100px 100px",
            }}
        >
            <Header />
            <div className="min-h-[calc(100vh-112px)] box-border">
                {props.children ?? null}
            </div>
            <Footer selected={props.pageName} />
        </div >
    )
}