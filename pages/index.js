import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import Container from '../components/container'
import styles from '../styles/Home.module.css'
import Logo from '../public/logo.png'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Anime Tracker | home</title>
      </Head>
      <div className={`w-screen h-screen relative overflow-hidden ${styles.home}`}>
        <div className={`h-full w-full absolute top-0 left-0 ${styles.layer}`}>
          <header className='bg-slate-900 flex justify-center items-center'>
            <Image src={Logo} />
          </header>
          <Container className="flex flex-col justify-center items-center h-5/6">
            <div className='w-5/6'>
              <h1 className='text-white text-6xl text-center font-bold'>A best place to track your favourites animes and mangas metadata.</h1>
            </div>
            <div className='text-center mt-11'>
              <Link href='/animes' passHref>
                <a className="px-7 py-4 decoration-transparent bg-orange-600 text-white text-xl rounded-xl shadow">Start browsing</a>
              </Link>
            </div>
          </Container>
        </div>
      </div>
    </Layout>
  )
}
