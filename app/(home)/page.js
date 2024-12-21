import Search from "@/components/search/Search";
import { getTrendingHotels } from "@/database/queries";
export default async function Home() {
  const trendingHotels = await getTrendingHotels();
  return (
    <section className="bg-[#F6F3E9] h-screen max-h-screen relative grid place-items-center bg-[url('/hero-bg.jpg')] bg-cover bg-no-repeat bg-center">
      <div className="container items-center mt-16 ">
        {/* <h2 className="text-3xl text-primary uppercase tracking-widest text-start">
          Trending
        </h2> */}
        {/* <Trending trendingHotels={trendingHotels} /> */}
        <Search />
      </div>
    </section>
  );
}
