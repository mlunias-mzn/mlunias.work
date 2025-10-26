import { useSearchParams } from "react-router";
import Layout from "../../features/Layout/Layout";
import Card, { CardContent, CardTitle } from "../../modules/Card/Card";
import Tab, { TabItem } from "../../modules/Tab/Tab";

import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm";

export default function () {
    const [searchParams, setSearchParams] = useSearchParams()

    const action = searchParams.get("action") === "signup" ? "signup" : "login"

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
                        {action == "login" && <>
                            <CardTitle align="center">ログイン</CardTitle>
                            <CardContent>
                                <LoginForm />
                            </CardContent>
                        </>}
                        {action == "signup" && <>
                            <CardTitle align="center">登録</CardTitle>
                            <CardContent>
                                <SignupForm />
                            </CardContent>
                        </>}

                    </Card>
                </div>
            </div>
        </Layout >
    )
}