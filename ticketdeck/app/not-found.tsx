import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="w-screen h-screen bg-primary flex justify-center items-center p-4">
      <div className="p-10 h-fit bg-white rounded-md flex flex-col items-center">
        <Image src={"/ticket-icon.svg"} alt="LOGO" width={150} height={150} className="mb-4"/>
        <p className="font-bold text-4xl text-center">Page not found</p>
        <p className="text-lg text-center">The page you were trying to reach was not found or removed.</p>
        <Link href="/" className="w-full mt-10 text-md text-primary">Back to TicketDeck</Link>
      </div>
    </div>
  );
}