import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Home() {
const memeData =  await getApiData();

const allMemes = memeData.data.memes
// console.log(allMemes)

  return (
    <>
   <div>
    <h1 className="text-center m-10 font-bold text-2xl underline text-blue-700 ">Meme Generator App</h1>
   </div>
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 m-20">
   {allMemes.map((meme) => (
        <Link href={`/meme-maker/${meme.id}`} key={meme.id} className=" rounded-2xl  shadow-lg">
            <img className="w-full" src={meme.url} alt={meme.name} />
        </Link>
      ))}
   </div>
   </>
  );
}

async function getApiData(){
  const res = await fetch("https://api.imgflip.com/get_memes")
  if (!res.ok){
    throw new Error("failed to fetch API data");
  }
  return res.json();
}
