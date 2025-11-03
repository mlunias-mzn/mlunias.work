import { useEffect, useRef, useState, type ReactNode } from "react"
import { useNavigate } from "react-router"
import clsx from "clsx";
import { TbUser, TbLogin2, TbCheck, TbCancel } from "react-icons/tb";
import { checkIsUsernameConflict, passwordStrength, signup, validatePassword, validateUsername } from "../../../utils/auth/signup"
import TextInput from "../../modules/TextInput/TextInput"
import Button from "../../modules/Button/Button";
import Progress from "../../modules/Progress/Progress";
import PasswordInput from "./PasswordInput";

export default function SignupForm() {
    const navigate = useNavigate()

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [password2, setPassword2] = useState<string>("")
    const usernameRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)
    const password2Ref = useRef<HTMLInputElement | null>(null)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [isConflict, setIsConflict] = useState<"conflict" | "available" | "checking" | void>()
    const { errorUsername, errorPassword, errorPassword2 } = errorMessages(username, password, password2)
    const isButtonDisabled = (errorUsername.length > 0) ||
        (errorPassword.length > 0) ||
        (errorPassword2.length > 0) ||
        (username.length == 0) ||
        (password.length == 0) ||
        (password2.length == 0) ||
        (isConflict != "available" && isConflict != undefined)

    useEffect(() => {
        focusUsername()
    }, [])

    useEffect(() => {
        const details = validateUsername(username)
        if (Array.isArray(details) && details.length == 0) {
            setIsConflict("checking")
            checkIsUsernameConflict(username).then((c) => {
                if (c === true) {
                    setIsConflict("conflict")
                } else if (c === false) {
                    setIsConflict("available")
                }
            })
        } else {
            setIsConflict()
        }
    }, [username])

    async function SubmitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (isButtonDisabled) {
            return false
        }

        setErrorMessage("")
        return signup(username, password).then(() => {
            navigate("/")
            return true
        }, (m) => {
            if (m) {
                setErrorMessage(m)
            } else {
                setErrorMessage("不明なエラーが発生しました。")
            }
            setPassword("")
            focusUsername()
            return false
        }).catch((e) => {
            console.warn(e)
            setErrorMessage("不明なエラーが発生しました。")
            setPassword("")
            focusUsername()
            return false
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

    function focusPassword2() {
        if (password2Ref) {
            password2Ref.current?.focus()
        }
    }

    return (
        <form
            className="flex flex-col gap-4 "
            method="post"
            onSubmit={SubmitHandler}
        >
            <fieldset className="fieldset">
                <legend className="fieldset-legend">ユーザーID</legend>
                <TextInput
                    name="username"
                    type="text"
                    required
                    placeholder="ユーザーID"
                    onChange={(e) => {
                        setUsername(e.target.value)
                        setErrorMessage("")
                    }}
                    value={username}
                    startAdornment={<TbUser />}
                    aria-label="ユーザーID"
                    ref={usernameRef}
                    color={(errorUsername.length > 0 || isConflict === "conflict") ? "error" : undefined}
                    maxLength={32}
                />
                {
                    errorUsername.length > 0 ? errorUsername.map(p => <ErrorMessage><TbCancel />{p}</ErrorMessage>)
                        : isConflict === "checking" ? <span className="loading loading-spinner loading-xs"></span>
                            : isConflict === "available" ? <ErrorMessage><TbCheck />このユーザーIDは使用可能です</ErrorMessage>
                                : isConflict === "conflict" ? <ErrorMessage><TbCancel />このユーザーIDは使えません</ErrorMessage>
                                    : null
                }
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">パスワード</legend>
                <div className="flex flex-col gap-1">
                    <PasswordInput
                        required
                        label="パスワード"
                        onChange={(e) => {
                            setPassword(e.target.value)
                            setErrorMessage("")
                        }}
                        value={password}
                        ref={passwordRef}
                        color={errorPassword.length > 0 ? "error" : undefined}
                        maxLength={128}
                    />
                    <PasswordStrength password={password} />
                    {errorPassword.length > 0 && errorPassword.map(p => <ErrorMessage><TbCancel />{p}</ErrorMessage>)}
                </div>
                <div className="flex flex-col gap-1 mt-3">
                    <PasswordInput
                        required
                        label="パスワード (再入力)"
                        onChange={(e) => {
                            setPassword2(e.target.value)
                            setErrorMessage("")
                        }}
                        value={password2}
                        ref={password2Ref}
                        color={errorPassword2.length > 0 ? "error" : undefined}
                        maxLength={128}
                    />
                    {errorPassword2.length > 0 && errorPassword2.map(p => <ErrorMessage><TbCancel />{p}</ErrorMessage>)}
                </div>
            </fieldset>
            {errorMessage.length > 0 && <ErrorMessage><TbCancel />{errorMessage}</ErrorMessage>}
            <Button
                type="submit"
                startAdornment={<TbLogin2 />}
                className="flex justify-center mt-4"
                aria-label="登録"
                disabled={isButtonDisabled}
                aria-disabled={isButtonDisabled}
            >
                登録
            </Button>
        </form>
    )
}

function PasswordStrength(props: {
    password: string
    children?: ReactNode
}) {
    const { password } = props

    let value: number = 0
    if (password.length == 0) {
        value = 0
    } else {
        value = passwordStrength(password)
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-center items-center gap-2 flex-nowrap">
                <Progress
                    className="[&::-webkit-progress-value]:transition-all [&::-moz-progress-bar]:transition-all"
                    value={Math.floor(value / 10) * 10}
                    max={100}
                    color={
                        value == 0 ? undefined :
                            value <= 25 ? "error" :
                                value <= 50 ? "error" :
                                    value <= 75 ? "warning" : "success"
                    }
                />
                <p
                    className={clsx("text-nowrap font-semibold")}
                >
                    {
                        value <= 50 ? "弱い" :
                            value <= 75 ? "普通" : "強い"
                    }
                </p>
            </div>
            {props.children}
        </div>
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

function errorMessages(
    username: string,
    password: string,
    password2: string
): {
    errorUsername: Array<string>
    errorPassword: Array<string>
    errorPassword2: Array<string>
} {
    let errorUsername: Array<string> = []
    let errorPassword: Array<string> = []
    let errorPassword2: Array<string> = []

    if (username.length > 0) {
        const detailsUsername = validateUsername(username)
        if (Array.isArray(detailsUsername)) {
            errorUsername = detailsUsername.map((p) => p?.message).filter((p) => typeof p == "string")
        }
    }

    if (password.length > 0) {
        const detailsPassword = validatePassword(password)
        if (Array.isArray(detailsPassword)) {
            errorPassword = detailsPassword.map((p) => p?.message).filter((p) => typeof p == "string")
        }
    }

    if (password2.length > 0) {
        if (password !== password2) {
            errorPassword2 = ["パスワードが一致しません"]
        }
    }

    return { errorUsername, errorPassword, errorPassword2 }
}