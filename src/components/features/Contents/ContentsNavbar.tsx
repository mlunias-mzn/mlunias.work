import { useState } from "react";
import { TbHeart } from "react-icons/tb";
import { TbHeartFilled } from "react-icons/tb";
import { TbShare } from "react-icons/tb";

export default function (props: { uuid: string }) {
    return (
        <div className="flex flex-nowrap justify-center items-center gap-3">
            <ButtonLike uuid={props.uuid} />
            <ButtonShare uuid={props.uuid} />
        </div>
    )
}

function ButtonLike(props: { uuid: string }) {
    const [liked, setLiked] = useState(typeof localStorage.getItem(props.uuid) == "string")

    function ClickHandler() {
        setLiked((prev) => {
            if (prev) {
                localStorage.removeItem(props.uuid)
                return false
            } else {
                navigator.vibrate(100)
                localStorage.setItem(props.uuid, Date.now().toString())
                return true
            }
        })
    }

    return (
        <label
            className="swap swap-flip tooltip"
            data-uuid={props.uuid}
            aria-checked={liked}
            aria-label={liked ? "いいね解除" : "いいね"}
            data-tip={"いいね"}
        >
            <input type="checkbox" checked={liked} onChange={ClickHandler} onClick={() => { }} />
            <TbHeart className="swap-off size-[1.3em]" />
            <TbHeartFilled className="swap-on size-[1.3em]" />
        </label>
    )
}

function ButtonShare(props: { uuid: string }) {

    function ClickHandler() {
        navigator.share({
            url: "/" + props.uuid
        })
    }

    return (
        <label
            className="swap tooltip"
            data-uuid={props.uuid}
            aria-label="共有"
            data-tip="共有"
        >
            <input type="checkbox" onChange={ClickHandler} />
            <TbShare className="size-[1.3em]" />
        </label>
    )
}