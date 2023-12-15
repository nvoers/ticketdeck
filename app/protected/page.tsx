import Header from "@/components/header";

export default function Home() {

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Header />
      <div className="bg-gradient-to-b from-primary to-white to-[50%] h-screen p-8">
        <div className="card glass bg-secondary text-white font-bold text-center py-4">
          <p className="text-xl py-1">Next event</p>
          <p className="text-2xl py-1">Event name placeholder<br/>Sat 16 Dec 2023</p>
          <p className="text-lg py-1 text-zinc-100">View ticket</p>
        </div>

        <div className="text-neutral mt-8">
          <div className="text-2xl font-bold">Upcoming events</div>
          {/* <!-- Item --> */}
          <div className="flex gap-x-3">
            {/* <!-- Icon --> */}
            <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-neutral dark:after:bg-neutral">
              <div className="relative z-10 w-7 h-7 flex justify-center items-center">
                <div className="w-2 h-2 rounded-full bg-neutral dark:bg-neutral"></div>
              </div>
            </div>
            {/* <!-- End Icon --> */}

            {/* <!-- Right Content --> */}
            <div className="grow pt-0.5 pb-8">
              <p className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                Event name placeholder
              </p>
              <p className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                Sat 16 Dec 2023
              </p>
              <p className="flex gap-x-1.5 text-gray-800 dark:text-white">
                View ticket
              </p>
            </div>
            {/* <!-- End Right Content --> */}
          </div>
          {/* <!-- End Item --> */}

          {/* <!-- Item --> */}
          <div className="flex gap-x-3">
            {/* <!-- Icon --> */}
            <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-neutral dark:after:bg-neutral">
              <div className="relative z-10 w-7 h-7 flex justify-center items-center">
                <div className="w-2 h-2 rounded-full bg-neutral dark:bg-neutral"></div>
              </div>
            </div>
            {/* <!-- End Icon --> */}

            {/* <!-- Right Content --> */}
            <div className="grow pt-0.5 pb-8">
              <p className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                Event name placeholder
              </p>
              <p className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                Sun 31 Dec 2023
              </p>
              <p className="flex gap-x-1.5 text-gray-800 dark:text-white">
                View ticket
              </p>
            </div>
            {/* <!-- End Right Content --> */}
          </div>
          {/* <!-- End Item --> */}
        </div>
      </div>
    </>
  );
}
