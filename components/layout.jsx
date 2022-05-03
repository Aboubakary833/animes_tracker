import Head from "next/head";

export default function Layout({children}) {
    return  <>
                <Head>
                    <meta name="description" content="Animes and mangas tracker website." />
                    <link rel="shortcut icon" href="/favicon.png"  type='image/png' />
                </Head>
                {children}
            </>
}