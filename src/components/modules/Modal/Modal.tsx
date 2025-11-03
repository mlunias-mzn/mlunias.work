import clsx from "clsx";
import { TbX } from "react-icons/tb";

export function Modal(props: {
} & React.DetailedHTMLProps<React.DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>) {
    const { className, ...dialogProps } = props
    return (
        <dialog
            {...dialogProps}
            className={clsx(
                "modal",
                className
            )}
        >
            <div className="modal-box">
                {props.children}
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>閉じる</button>
            </form>
        </dialog>
    )
}