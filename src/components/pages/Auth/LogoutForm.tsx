import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState, type ReactNode } from "react"
import { useNavigate } from "react-router"
import { logout } from "../../../utils/auth/logout"
import Button from "../../modules/Button/Button"
import { TbCancel, TbLogout } from "react-icons/tb"
import clsx from "clsx"

export default function LogoutForm() {
    const [errorMessage, setErrorMessage] = useState<string>("")
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const logoutMutation = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["all-challenges", "user-challenges"] });
            navigate(`/`);
        },
        onError: (error: any) => {
            console.error("Mutation error:", error);
            setErrorMessage("ログアウトに失敗しました。")
        },
    })

    async function SubmitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setErrorMessage("")
        logoutMutation.mutate()
    }

    return (
        <form
            className="flex flex-col gap-4"
            method="post"
            onSubmit={SubmitHandler}
        >
            <Button
                type="submit"
                startAdornment={<TbLogout />}
                className="flex justify-center"
                aria-label="ログアウト"
            >
                ログアウト
            </Button>
            {errorMessage.length > 0 && <ErrorMessage><TbCancel />{errorMessage}</ErrorMessage>}
        </form>
    )
}

function ErrorMessage(props: {
    className?: string
    children?: ReactNode
}) {
    return (
        <div className={clsx("flex flex-row flex-nowrap items-center gap-1", props.className)}>
            {props.children}
        </div>
    )
}