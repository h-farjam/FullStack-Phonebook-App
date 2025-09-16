import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl text-center my-10">Contact</h1>
        <p>please Login and Create your first Contact</p>
        <Link
          className="border px-4 py-1 rounded-2xl my-10"
          href={"/auth/register"}
        >
          register
        </Link>
      </div>
      <footer className="w-full text-center py-4 border-t border-gray-200 text-gray-500 text-sm">
        Full-Stack project built with Next.js, TypeScript, Tailwind CSS, Next.js
        API Routes, and MongoDB
      </footer>
    </>
  );
}
