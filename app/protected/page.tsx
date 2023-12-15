import SignOut from "@/components/sign-out";
import Header from "@/components/header";
import NextEvent from "@/components/next-event";

export default function Home() {

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Header />
      
    </>
  );
}
