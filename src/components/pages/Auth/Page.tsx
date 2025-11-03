import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useMutation } from "@tanstack/react-query";
import Layout from "../../features/Layout/Layout";
import Card from "../../modules/Card/Card";
import Tab, { TabItem } from "../../modules/Tab/Tab";

import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm";
import LogoutForm from "./LogoutForm";
import { user } from "../../../utils/auth/user";

export default function () {
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()

    const [username, setUsername] = useState<string | void>()
    const [displayName, setDisplayName] = useState<string | void>()
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

    const userMutation = useMutation({
        mutationFn: user,
        onSuccess: (data) => {
            if (data.displayName || data.username) {
                setUsername(data.username)
                setDisplayName(data.displayName)
                setIsLoggedIn(true)
            } else {
                setIsLoggedIn(false)
            }
        },
        onError: (error: any) => {
            setIsLoggedIn(false)
            console.error("Mutation error:", error);
        },
    })

    useEffect(() => {
        userMutation.mutate()
    }, [])

    let action = searchParams.get("action")
    if (action == "logout") {
        if (isLoggedIn === false) {
            navigate(`/auth?action=login`, { replace: true })
        }
    } else if (action == "signup") {
        if (isLoggedIn) {
            if (username)
                navigate(`/@${username}`, { replace: true })
            else
                navigate(`/profile`, { replace: true })
        }
    } else {
        action = "login"
        if (isLoggedIn) {
            if (username)
                navigate(`/@${username}`, { replace: true })
            else
                navigate(`/profile`, { replace: true })
        }
    }

    return (
        <Layout pageName="home">
            <title>MILE</title>
            <div className="flex gap-4 w-full p-4 flex-col items-center justify-center">
                <div className="flex gap-4 w-full p-4 flex-col items-center">
                    <Card data-action-type={action}>
                        <Tab variant="box" className="mb-4" data-action-type={action}>
                            <TabItem active={action == "login"} onClick={() => { setSearchParams({ action: "login" }) }}>ログイン</TabItem>
                            <TabItem active={action == "signup"} onClick={() => { setSearchParams({ action: "signup" }) }}>登録</TabItem>
                        </Tab>
                        {isLoggedIn === null && <>
                            <Card.Title align="center"></Card.Title>
                            <Card.Body>
                                <div className="h-5 w-full">
                                    <span className="loading loading-spinner loading-md" />
                                </div>
                            </Card.Body>
                        </>}
                        {(isLoggedIn === false && action == "login") && <>
                            <Card.Title align="center">ログイン</Card.Title>
                            <Card.Body>
                                <LoginForm />
                            </Card.Body>
                        </>}
                        {(isLoggedIn === false && action == "signup") && <>
                            <Card.Title align="center">登録</Card.Title>
                            <Card.Body>
                                <SignupForm />
                            </Card.Body>
                        </>}
                        {(isLoggedIn && action == "logout") && <>
                            <Card.Title align="center">ログアウト</Card.Title>
                            <Card.Body>
                                <LogoutForm />
                            </Card.Body>
                        </>}

                    </Card>
                </div>
            </div>
        </Layout >
    )
}