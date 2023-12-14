import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Navbar />
      <div className="container mx-auto">
        <div className="w-full bg-gradient-to-b from-primary to-white flex justify-between px-8 py-32">
          <div className="flex flex-col place-content-center">
            <p className="font-bold text-4xl text-white w-fit">
              All your tickets in one place
            </p>
            <div className="pt-4">
              <Link
                href="/register"
                prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
                className="btn btn-secondary text-lg mr-6"
              >
                Register
              </Link>
              <Link
                href="/login"
                prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
                className="btn btn-secondary text-lg"
              >
                Login
              </Link>
            </div>
          </div>
          {/* <div className="w-1/2 flex flex-col place-content-center py-8">
            <div className="flex justify-center">
              <Image
                src="/ticket-icon.png"
                alt= "Ticketdeck"
                objectFit="contain"
                width={300}
                height={300}
              />
            </div>
          </div> */}
        </div>
      </div>
      <div className="container mx-auto pt-16 px-8">
        <p className="text-5xl font-bold">
          Ticketdeck: Your personal digital ticket wallet
        </p>
        <p className="pt-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim
          lobortis scelerisque fermentum dui faucibus in. Tortor condimentum
          lacinia quis vel eros donec. Pellentesque dignissim enim sit amet
          venenatis. Lacus sed viverra tellus in hac habitasse platea dictumst
          vestibulum.
        </p>
        <div className="flex w-full items-center justify-start space-x-4">
          <div className="relative h-8 w-8 flex-none overflow-hidden rounded-full">
            <Image
              alt="Nick van Oers"
              loading="lazy"
              width="100"
              height="100"
              decoding="async"
              data-nimg="1"
              className="h-full w-full object-cover duration-700 ease-in-out scale-100 blur-0"
              src="/nick.jpg"
            />
          </div>
          <p className="ml-3 inline-block whitespace-nowrap align-middle text-sm font-semibold dark:text-white md:text-base">
            Nick van Oers
          </p>
          <div className="h-6 border-l border-stone-600 dark:border-stone-400"></div>
          <p className="m-auto my-5 w-10/12 text-sm font-light text-stone-500 dark:text-stone-400 md:text-base">
            Dec 06, 2023
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
