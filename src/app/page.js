import Filter from "@/components/filter/filter";
import Banner from "@/components/layout/Header/Banner";
import CardTours from "@/components/tours/card";
import { getTours } from "@/lib/data";

export default async function Home({ searchParams }) {
  const tours = await getTours(searchParams)
  const filterTours = await getTours({})
  return (
    <div className="bg-white">
      <Banner />
      <main className="flex flex-col rounded-md">
        <div className="flex p-4 flex-col justify-center  md:flex-row  gap-16">
          <Filter tours={filterTours} />
          {/* <ContainerCards params={searchParams} /> */}
          <div className="w-full h-auto flex flex-col gap-2">
            <div className="bg-red-200">Buscador</div>
            <div className="p-1 h-full gap-4 grid grid-cols-1  self-center lg:grid-cols-2">
              {tours.map((item, idx) => (
                <CardTours key={`card-${idx}`} item={item} idx={idx} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
