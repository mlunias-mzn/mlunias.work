
import { useState, useRef, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { TbUser, TbLogin2, TbCancel } from "react-icons/tb";
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { login } from "../../../utils/auth/login";
import TextInput from "../../modules/TextInput/TextInput";
import Button from "../../modules/Button/Button";
import clsx from "clsx";
import PasswordInput from "./PasswordInput";

export default function LoginForm() {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")
    const usernameRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    useEffect(() => {
        focusUsername()
    }, [])

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["all-challenges", "user-challenges"] });
            navigate(`/`);
        },
        onError: (error: any) => {
            console.error("Mutation error:", error);
            setErrorMessage("ログインに失敗しました。")
            focusUsername()
        },
    })

    async function SubmitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setErrorMessage("")
        loginMutation.mutate({
            username: username,
            password: password,
        })
    }

    function focusUsername() {
        if (usernameRef) {
            usernameRef.current?.focus()
        }
    }

    function focusPassword() {
        if (passwordRef) {
            passwordRef.current?.focus()
        }
    }

    return (
        <form
            className="flex flex-col gap-4"
            method="post"
            onSubmit={SubmitHandler}
        >
            <div className="flex flex-col gap-3">
                <TextInput
                    name="username"
                    id="input-username"
                    type="text"
                    placeholder="ユーザーID"
                    onChange={(e) => {
                        setUsername(e.target.value)
                        setErrorMessage("")
                    }}
                    value={username}
                    startAdornment={<TbUser />}
                    aria-label="ユーザーID"
                    ref={usernameRef}
                    maxLength={32}
                />
                <PasswordInput
                    id="input-password"
                    label="パスワード"
                    onChange={(e) => {
                        setPassword(e.target.value)
                        setErrorMessage("")
                    }}
                    value={password}
                    ref={passwordRef}
                    maxLength={128}
                />
            </div>
            {errorMessage.length > 0 && <ErrorMessage><TbCancel />{errorMessage}</ErrorMessage>}
            <Button
                type="submit"
                startAdornment={<TbLogin2 />}
                className="flex justify-center"
                label="ログイン"
            />
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