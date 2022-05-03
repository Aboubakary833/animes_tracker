import Layout from "../../components/Layout";
import { possibleAnimesId } from "../../utlis";

export default function Anime() {
    return <Layout>
        <h1>Hello world</h1>
    </Layout>
}

export async function getStaticPaths() {
    const paths = possibleAnimesId()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({id}) {
    console.log(id);
}