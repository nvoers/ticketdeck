import SignOut from "@/components/sign-out";
import Navbar from "@/components/navbar";

export default function Home() {

  return (
    <>
    {/* @ts-expect-error Server Component */}
      <Navbar />
    </>
  );
}
