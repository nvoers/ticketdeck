import Image from "next/image";
import Navbar from "./components/navbar/Navbar.js";

export default function Home() {
  return (
    <main className="container mx-auto h-screen">
      <Navbar />
      <div className="w-full h-[70%] bg-gradient-to-b from-primary to-zinc-100 rounded-xl mt-8 p-8 flex justify-center">
        <div className="w-[40%] flex flex-col place-content-center h-full py-8">
          <p className="font-bold text-5xl pb-4">
            All your tickets in one place
          </p>
          <div className="pt-4">
            <div className="btn btn-secondary text-lg mr-6">Register</div>
            <div className="btn btn-secondary text-lg">Login</div>
          </div>
        </div>
        <div className="w-[40%] flex flex-col place-content-center h-full py-8">
          <div className="w-full h-[75%] relative">
            <Image
              fill
              src="/ticket-icon.svg"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
