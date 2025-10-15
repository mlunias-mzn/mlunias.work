import ContentsList from "../features/Contents/ContentsList";
import Layout from "../features/Layout/Layout";

export default function () {
    return (
        <Layout pageName="home">
            <title>MILE</title>
            <div className="flex gap-4 w-full p-4 flex-col items-center">
                <ContentsList />
            </div>
        </Layout>
    )
}