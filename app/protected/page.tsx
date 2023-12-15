import Header from "@/components/header";
import NextEvent from "@/components/nextevent";

export default function Home() {

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Header />
      <div className="bg-gradient-to-b from-primary to-white to-[50%] h-screen p-8">
        <NextEvent/>

        <div className="text-neutral mt-8">
          <div className="text-2xl font-bold">Upcoming events</div>
          <div className="flex flex-col pl-2 pt-2">
            <div className="pt-2 pb-1 flex items-center">
              <div className="w-2 h-2 rounded-full bg-neutral dark:bg-neutral translate-x-[15%]"></div>
              <p className="text-neutral font-bold pl-2">
                Event name placeholder
              </p>
            </div>
            <div>
              <div className="flex items-center">
                <p className="justify-center border-l-2 border-neutral font-semibold text-neutral pl-2 ml-1">
                  Sat 16 Dec 2023
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col pl-2 pt-2">
            <div className="pt-2 pb-1 flex items-center">
              <div className="w-2 h-2 z-0 rounded-full bg-neutral translate-x-[15%]"></div>
              <p className="text-neutral font-bold pl-2">
                Event name placeholder
              </p>
            </div>
            <div>
              <div className="flex items-center">
                <p className="justify-center border-l-2 border-neutral font-semibold text-neutral pl-2 ml-1">
                  Sun 31 Dec 2023
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
