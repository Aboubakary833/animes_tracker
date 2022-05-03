import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Container from "../../components/container";
import Layout from "../../components/Layout";
import Logo from "../../public/logo.png";
import Card from "../../components/card";
import { IoSearchOutline } from "react-icons/io5";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import AnimatedCard from "../../components/animated_card";
import NoAnimeFound from "../../components/no_anime_found";
import { useRouter } from "next/router";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

export default function AnimesList({ data, paginationData }) {
  const router = useRouter();
  const { page } = router.query;
  const [title, setTitle] = useState(`Page ${page === undefined ? 1 : page} animes list`);
  const loadingContainer = new Array(10).fill(AnimatedCard);
  const [isloading, setIsloading] = useState(false);
  let [animes, setAnimes] = useState(data);
  let [pagination, setPagination] = useState(paginationData)
  const [searchedAnime, setSearchedAnime] = useState(null);

  const searchInput = useRef();

  
  useEffect(function() {
    if(page) {
      axios.get(`${process.env.NEXT_PUBLIC_JIKAN_API_URL}?page=${page}`)
      .then(response => {
        const {data, pagination} = response.data
        setAnimes(data)
        setPagination(pagination)
        setIsloading(false)
      })
    }
  }, [page])

  return (
    <Layout>
      <Head>
        <title>Animes list</title>
      </Head>
      <div className="dark pt-12">
        <header className="pb-2 md:pb-0 backdrop-blur-sm bg-slate-200/90 dark:bg-slate-700/70 fixed top-0 left-0 right-0 z-10">
          <Container className="flex flex-col md:flex-row justify-between items-center">
            <Image
              src={Logo}
              className="cursor-pointer"
              id="logo"
              onClick={() => router.push("/")}
            />
            <form
              className="search relative mr-0 md:mr-3 lg:mr-0"
              onSubmit={handleSearch}
            >
              <input
                type="text"
                placeholder="Type a name and enter to search"
                className="px-3 py-2 rounded-md dark:bg-slate-900 dark:text-white outline-none"
                style={{ width: 300 }}
                ref={searchInput}
                onChange={handleChange}
                spellCheck="false"
              />
              <IoSearchOutline />
            </form>
          </Container>
        </header>
        <main className="pt-12 min-h-screen">
          <h1 className="dark:text-white text-4xl text-center font-semibold mt-12 md:mt-0">
            {title}
          </h1>
          <div className="mt-8">
            {isloading ? (
              <Container className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 grid-flow-cols gap-3 lg:gap-4 p-2">
                {loadingContainer.map((LoadingCard, key) => (
                  <LoadingCard key={key} />
                ))}
              </Container>
            ) : animes.length === 0 ? (
              <NoAnimeFound
                name={searchedAnime}
                searchbar={searchInput}
                fill={() => goBack()}
              />
            ) : (
              <Container className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 grid-flow-cols gap-3 lg:gap-4 p-2">
                {animes.map((anime, key) => {
                  return (
                    <Card
                      title={anime.title}
                      image={anime.images.jpg.image_url}
                      id={anime.mal_id}
                      key={key}
                    />
                  );
                })}
              </Container>
            )}
          </div>
        </main>
        <footer className="w-full mt-12 pb-4 grid grid-cols-3 gap-x-5">
          <div className="flex justify-center items-center">
            <Link
              href={
                pagination.current_page <= 1
                  ? "#"
                  : `/animes?page=${
                      pagination.current_page - 1
                    }`
              }
              passHref
            >
              <a className="p-2 decoration-transparent outline-none text-2xl border-2 border-orange-500 bg-transparent text-orange-500 rounded-full" onClick={paginationAnimation}>
                <HiChevronDoubleLeft />
              </a>
            </Link>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-white">
              {pagination.items.count} / {pagination.items.total} animes
            </p>
            <p className="text-white">
              {pagination.current_page} / {pagination.last_visible_page} pages
            </p>
          </div>
          <div className="flex justify-center items-center">
            <Link href={
                pagination.current_page < 958
                  ? `/animes?page=${
                    pagination.current_page + 1
                  }` : '#'
              } passHref>
              <a className="p-2 decoration-transparent outline-none text-2xl border-2 border-orange-500 bg-transparent text-orange-500 rounded-full" onClick={paginationAnimation}>
                <HiChevronDoubleRight />
              </a>
            </Link>
          </div>
        </footer>
      </div>
    </Layout>
  );

  function paginationAnimation() {
    setIsloading(true)
  }

  function goBack() {
    setAnimes(data);
    setTitle(`Page ${page === undefined ? 1 : page} animes list`);
  }

  function handleSearch(e) {
    e.preventDefault();
    setIsloading(true);
    const query = searchInput.current.value;
    axios
      .get(`${process.env.NEXT_PUBLIC_JIKAN_API_URL}?q=${query}&sfw`)
      .then((response) => {
        const { data } = response;
        setAnimes(data.data);
        setTitle("");
        if (data.data.length != 0) setTitle(`Search results for "${query}"`);
        setIsloading(false);
        setSearchedAnime(query);
      });
  }

  function handleChange(e) {
    if (e.target.value == "") {
      setAnimes(data);
      setTitle(`Page ${page === undefined ? 1 : page} animes list`);
    }
  }
}

export async function getStaticProps() {
  const response = await axios.get(process.env.NEXT_PUBLIC_JIKAN_API_URL);
  const { data, pagination } = response.data;

  return {
    props: {
      data,
      paginationData: pagination,
    },
  };
}
