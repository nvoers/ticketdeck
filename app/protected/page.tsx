import SignOut from "@/components/sign-out";
import Navbar from "@/components/navbar";
import NextEvent from "@/components/next-event";

export default function Home() {

  return (
    <>
    {/* @ts-expect-error Server Component */}
      <Navbar />
      
    </>
  );
}
