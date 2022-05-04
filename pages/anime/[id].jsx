import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Link from "next/link";
import Layout from "../../components/layout";
import Container from "../../components/container";
import { HiArrowLeft } from "react-icons/hi";
import {IoLogoYoutube} from 'react-icons/io5'
import { motion } from "framer-motion";
import { ThemeContext } from "../../utlis";

export default function Anime({ id }) {
    const {theme} = useContext(ThemeContext)
  const [data, setData] = useState(null);

  useEffect(
    function () {
      axios
        .get(`${process.env.NEXT_PUBLIC_JIKAN_API_URL}/${id}`)
        .then((response) => {
          const { data } = response;
          setData(data.data);
        });
    },
    [id]
  );

  return (
    <Layout>
      {data && (
        <div className={`${theme} w-full min-h-screen`}>
          <header className="py-6 backdrop-blur-sm bg-slate-200/90 dark:bg-slate-700/70 z-10">
            <Container>
              <Link href="/animes" passHref>
                <a className="decoration-transparent text-orange-500 flex items-center px-4 md:px-0">
                  <HiArrowLeft className="text-xl" />
                  <span className="font-semibold indent-1">
                    Go back to list
                  </span>
                </a>
              </Link>
            </Container>
          </header>
          <Container className="mt-8 pb-8 grid grid-rows-1 md:grid-flow-col md:grid-cols-2 lg:grid-cols-3 md:gap-4">
            <div className="px-4 md:px-2">
              <motion.div
                className="rounded-xl card w-11/12 md:w-full lg:w-4/5 md:min-h-fit lg:min-h-fit mx-auto md:mx-0"
                style={{
                    minHeight: "300px",
                  backgroundImage: `url(${data.images.jpg.image_url})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: 'center'
                }}

                layoutId={`anime_${id}`}
              ></motion.div>
              <p className="my-5 text-slate-900 dark:text-white font-semibold text-4xl md:hidden">
                {data.title}
              </p>
              <div className="text-slate-900 dark:text-slate-300 md:mt-3">
                <ul>
                  <li className="mt-1">
                    <span className="font-semibold">Duration : </span>
                    <span className="text-sm">{data.duration}</span>
                  </li>
                  <li className="mt-1">
                    <span className="font-semibold">Score : </span>
                    <span className="text-sm">{data.score}</span>
                  </li>
                  <li className="mt-1">
                    <span className="font-semibold">Scored by : </span>
                    <span className="text-sm">{data.scored_by} people</span>
                  </li>
                  <li className="mt-1">
                    <span className="font-semibold">Genres : </span>
                    <span className="text-sm">
                      {data.genres.map((genre, key, array) => {
                        if (key < array.length - 1) return `${genre.name}, `;
                        else return genre.name;
                      })}
                    </span>
                  </li>
                  <li className="mt-1">
                    <span className="font-semibold">Type : </span>
                    <span className="text-sm">{data.type}</span>
                  </li>
                  <li className="mt-1">
                    <span className="font-semibold">Producer(s) : </span>
                    <span className="text-sm">
                      {data.producers.map((producer, key, array) => {
                        if (key < array.length - 1) return `${producer.name}, `;
                        else return producer.name;
                      })}
                    </span>
                  </li>
                  <li className="mt-1">
                    <span className="font-semibold">Studio(s) : </span>
                    <span className="text-sm">
                      {data.studios.map((studio, key, array) => {
                        if (key < array.length - 1) return `${studio.name}, `;
                        else return studio.name;
                      })}
                    </span>
                  </li>
                  <li className="mt-1">
                    <span className="font-semibold">Year : </span>
                    <span className="text-sm">{data.year}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="px-4 md:px-0 lg:col-span-2">
              <p className="mt-2 text-slate-900 dark:text-white font-semibold text-6xl hidden md:block">
                {data.title}
              </p>
              <p className="text-orange-500 mt-2 text-xl">{data.rating}</p>
              <div className="mt-8 p-4 bg-slate-200 dark:bg-slate-800 rounded text-slate-900 dark:text-white">
                {data.synopsis}
              </div>
              <div className="mt-4 flex flex-col md:flex-row items-center">
                  {
                      data.trailer.url &&
                        <Link href={data.trailer.url} passHref>
                            <a target="_blank">
                                <div className="w-fit p-3 flex items-center outline-none border-2 border-red-600 rounded">
                                    <IoLogoYoutube className="text-4xl text-red-600" />
                                    <span className="indent-2 text-slate-900 dark:text-white">Watch the trailer on Youtube</span>
                                </div>
                            </a>
                        </Link>
                  }
                  <Link href={data.url} passHref>
                      <a target="_blank">
                          <div className="w-fit mt-4 md:mt-0 md:ml-4 p-3 flex items-center outline-none border-2 border-blue-600 rounded" style={{height: '64px'}}>
                            <span className="indent-2 text-slate-900 dark:text-white">Read more on MyAnimeList</span>
                          </div>
                      </a>
                  </Link>
              </div>
            </div>
          </Container>
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      id: context.params.id,
    },
  };
}
