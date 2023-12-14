import Image from "next/image";

export default function Footer() {
  return (
    <>
      <footer className="footer items-center p-4 bg-neutral text-neutral-content mt-12">
        <aside className="items-center grid-flow-col">
          <Image
            src="/ticket-icon.svg"
            alt="Vercel Logo"
            width={20}
            height={20}
            priority
          />
          <p>Copyright © 2023 - All right reserved</p>
        </aside>
      </footer>
    </>
  );
}
