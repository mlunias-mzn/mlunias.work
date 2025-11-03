import { useRef, type ReactNode } from "react";
import clsx from "clsx";
import { Link } from "react-router";

import { TbCake, TbMapPin, TbTag } from "react-icons/tb";
import Layout from "../../features/Layout/Layout";
import { Modal } from "../../modules/Modal/Modal";
import Avatar from "../../modules/Avatar/Avatar";
import Typography from "../../modules/Typography/Typography";

export default function () {

    return (
        <Layout pageName="profile">
            <title>プロフィール | MILE</title>
            <div className="flex gap-4 w-full p-4 flex-col items-center">
                <div className="card card-border bg-base-100 w-full max-w-[700px] p-1 place-items-center shadow-md">
                    <div className="card-body">
                        <h2 className="card-title gap-4">
                            <UserIcon />
                            <Typography tag="h2" size="2xl">まいる</Typography>
                        </h2>
                        <div className="flex flex-col items-end justify-between w-full gap-1 pt-2">
                            <LabeledTextContainer>
                                <LabeledText icon={<TbCake />} label="7月28日" tooltip="誕生日" />
                                <LabeledText icon={<TbMapPin />} label="関西" tooltip="場所" />
                                <LabeledText icon={<TbTag />} label="コスプレイヤー" tooltip="内容" />
                            </LabeledTextContainer>
                        </div>
                        <Typography whitespace="pre-line">
                            {`関西在住の男性コスプレイヤー。
                            ゲームやeスポーツ関連のライターとしても活動。
                            イベントや大会によくコスプレ姿で出没する。
                            好きな食べ物はハンバーガーとコーラ。趣味は電子書籍を読みながら寝落ちすること。`}
                        </Typography>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

function UserIcon() {
    const dialogRef = useRef<HTMLDialogElement | null>(null)

    return (
        <>
            <Avatar
                src="assets/images/profile/001.jpg"
                aria-label="プロフィール"
                alt="プロフィール画像"
                tabIndex={0}
                role="button"
                className="cursor-pointer"
                size={15}
                onClick={() => {
                    dialogRef.current?.showModal()
                }}
            />
            <Modal ref={dialogRef}>
                <img alt="プロフィール画像" src="assets/images/profile/001.jpg" />
            </Modal>
        </>
    )
}

function LabeledTextContainer(props: { children?: ReactNode }) {
    return (
        <div className="flex items-center justify-start flex-wrap w-full gap-x-10 gap-y-1">
            {props.children}
        </div>
    )
}

function LabeledText(props: { icon?: ReactNode, label?: string, children?: ReactNode, href?: string, tooltip?: string }) {
    return (
        <>
            {
                props.href ?
                    <Link to={props.href} className="hover:underline">
                        <span className="flex items-center justify-center whitespace-nowrap">
                            {props.icon && <span className={clsx("pr-2 text-base-content/70", props.tooltip && "tooltip")} data-tip={props.tooltip}>{props.icon}</span>}
                            {props.label}
                            {props.children}
                        </span >
                    </Link>
                    :
                    <span className="flex items-center justify-center whitespace-nowrap">
                        {props.icon && <span className={clsx("pr-2 text-base-content/70", props.tooltip && "tooltip")} data-tip={props.tooltip}>{props.icon}</span>}
                        {props.label}
                        {props.children}
                    </span>
            }
        </>
    )
}