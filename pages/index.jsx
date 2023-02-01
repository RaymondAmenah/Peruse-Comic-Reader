import Head from "next/head";
import React, { useContext } from "react";
import { Context } from "./_app.jsx";


//components
import GridContainer from "../Components/Grid/GridContainer.jsx";
import Grid from "../Components/Grid/Grid.jsx";
import SearchBar from "../Components/SearchBar/searchBar.jsx";
import Favorites from "../Components/Header/Favorites.jsx";


const Home = (props) => {
  const { show } = useContext(Context);

  const data = props.manga.data;

  return (
    <>
      <Head>
        <title>Peruse Comic Reader</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SearchBar clickable />
        {show && <Favorites />}
        <GridContainer>
          {" "}
          {data?.series?.map((item) => (
            <Grid key={item._id} item={item} clickable={true} />
          ))}
          {/* <div className="flex justify-center p-2 w-full">
            <button className="text-base text-slate-900 font-bold text-center w-[100px] h-[40px] p-2 bg-slate-700 rounded-full transition hover:bg-slate-600 hover:scale-[1.1] active:scale-[0.9]">
              Load More
            </button>
          </div> */}
        </GridContainer>
      </main>
    </>
  );
};

export const getStaticProps = async () => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.API_KEY,
      "X-RapidAPI-Host": "manga-scrapper.p.rapidapi.com",
    },
  };
  const res = await fetch(
    "https://manga-scrapper.p.rapidapi.com/series/?provider=asura&page=1&limit=20",
    options
  );
  const manga = await res.json();

  return {
    props: {
      manga,
    },

  };
};

export default Home;
