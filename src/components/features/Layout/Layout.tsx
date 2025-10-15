import type { ReactNode } from "react";
import Dock from "../Navigation/Dock";
import Header from "../Navigation/Header";

export default function (props: { pageName: string, children?: ReactNode }) {

    return (
        <div
            className="bg-base-200 text-base-content fixed top-0 h-full w-full"
            style={{
                backgroundImage: "radial-gradient(circle, rgb(from var(--color-base-content) r g b / 0.3) 1px, transparent 1px)",
                backgroundPosition: "0 0",
                backgroundSize: "100px 100px",
            }}
        >
            <div className="min-h-[100vh] py-[64px] box-border">
                {props.children ?? null}
            </div>
            <Header />
            <Dock selected={props.pageName} />
        </div >
    )
}