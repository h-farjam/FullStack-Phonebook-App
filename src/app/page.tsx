import Link from "next/link";

export default function Home() {
  return (
    <>
<div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl text-center my-10">Contact</h1>
      <p>please Login and Create your first Contact</p>
      <Link className="border px-4 py-1 rounded-2xl my-10" href={'/auth/register'}>register</Link>
</div>
    </>
  );
}
