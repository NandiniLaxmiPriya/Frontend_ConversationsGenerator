import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-conversation bg-cover bg-no-repeat bg-center animate-scroll-bg opacity-10" />
      {/* Background layer */}
      {/* Content layer */}
      <div className="relative z-10 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <li>Welcome!!!!!!</li>
          </ol>
        </main>

        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org/learn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/file.svg" alt="File icon" width={16} height={16} />
            Learn
          </a>
        </footer>
      </div>
    </div>
  );
}
