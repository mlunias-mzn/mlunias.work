import { useNavigate } from "react-router";
import Layout from "../features/Layout/Layout";

export default function () {
    const navigate = useNavigate()

    return (
        <Layout pageName="404">
            <title>404 | MILE</title>
            <div className="flex fixed top-0 gap-4 w-full h-[100vh] min-w-[200px] px-4 py-[64px] flex-col items-center justify-center">
                <div className="flex flex-col gap-4 w-full items-center justify-center">
                    このページは存在しません。
                    <button
                        role="link"
                        className="btn btn-primary"
                        aria-label="検索"
                        onClick={() => { navigate("/search") }}
                    >
                        検索
                    </button>
                </div>
            </div>
        </Layout>
    )
}