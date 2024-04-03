import Filter from "@/components/filter/filter";
import Banner from "@/components/layout/Header/Banner";
import ContainerCards from "@/components/tours/ContainerCards";
import { getTours } from "@/lib/data";
import { Suspense } from "react";

export default async function Home({ searchParams }) {
  const tours = await getTours({})
  return (
    <div className="bg-white">
      <Banner />
      <main className="flex flex-col rounded-md">
        <div className="flex p-4 flex-col justify-center  md:flex-row  gap-16">
          <Filter tours={tours} />
          <Suspense fallback={<h1>Cargando</h1>}>
            <ContainerCards params={searchParams} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
