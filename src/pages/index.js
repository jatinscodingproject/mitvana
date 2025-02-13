import Head from "next/head";
import IndexPage from "@pages/main-index/index";
import HomeCosmetics from "./home-cosmetics";
export default function Home({ title }) {
  return (
    <>
      <Head>
        <title>The Science of Herbs</title>
        <meta name="description" content="Generated by Kalles" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
      </Head>
      <main>
        <HomeCosmetics />
      </main>
    </>
  );
}