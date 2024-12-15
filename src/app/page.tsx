import Button from "@/components/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* flexbox trick to align register button on the bottom */}
      <main className="md:hidden w-full flex flex-col justify-center items-center flex-grow">
        <section className=" w-full text-center flex flex-col items-center justify-center flex-grow">
          <div className="w-full">
            <Image
              src="/logo.png"
              alt="Angler Bank Logo"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto"
              priority
            />
          </div>
          <h1 className="text-h1 mt-[38px]">ANGLER BANK</h1>
          <div className="bg-default w-[54px] h-[3px] mt-[14px]"></div>
          <h2 className="text-h2 mt-[2px]">beim Brand in den Felsen</h2>
        </section>

        <section className="w-full pb-2 px-6">
          <Link href="/register">
            <Button>Los gehts!</Button>
          </Link>
        </section>
      </main>

      {/* Desktop view message */}
      <section className="hidden md:block">
        <p className="text-xl font-semibold text-center absolute top-[50%] w-full">
          This page is only optimized for mobile view.
        </p>
      </section>
    </div>
  );
}
