import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-purple-700 text-white p-4">
      <main className="flex flex-col items-center gap-8 w-full max-w-2xl">
        {/* Hero/Logo */}
        <Image
          src="/d4c-logo.png" // Replace with your actual logo or hero image
          alt="Dash 4 Cash Logo"
          width={140}
          height={140}
          className="rounded-full shadow-lg mb-2"
          priority
        />
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center drop-shadow-lg">
          Dash 4 Cash
        </h1>
        {/* Description */}
        <p className="text-lg sm:text-xl text-center max-w-xl text-white/90">
          Run with purpose. Compete with friends. Raise money for charity.
          <br />
          Track your runs, join group challenges, and support causes you care about—all in one app.
        </p>
        {/* CTA */}
        <div className="flex gap-4 mt-4">
          <Link href="/auth">
            <span className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded shadow transition">
              Get Started
            </span>
          </Link>
          <Link href="/groups">
            <span className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded border border-white/30 shadow transition">
              View Groups
            </span>
          </Link>
        </div>
        {/* Optional: Hero Image or App Screenshot */}
        {/* <Image src="/d4c-example.gif" alt="App Example" width={320} height={180} className="rounded-lg mt-6 shadow-xl" /> */}
      </main>
      <footer className="mt-16 text-center text-white/70 text-sm">
        &copy; {new Date().getFullYear()} Dash 4 Cash &mdash; Built with Next.js & Supabase
      </footer>
    </div>
  );
}
