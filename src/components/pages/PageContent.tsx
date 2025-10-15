import { useLocation, useNavigate } from "react-router";
import Layout from "../features/Layout/Layout";
import ItemList from "../../cogs/items/data";
import { useEffect } from "react";

export default function () {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const pathname = location.pathname
        let uuid: string | undefined

        const m = pathname.match(/^\/(.*)\/*$/)
        if (m !== null) {
            if (ItemList[m[1]] !== undefined) {
                uuid = m[1]
            } else {
                navigate("/error")
            }
        } else {
            navigate("/error")
        }
    }, [])

    return (
        <Layout pageName="content">
            <title>投稿 | MILE</title>

        </Layout>
    )
}