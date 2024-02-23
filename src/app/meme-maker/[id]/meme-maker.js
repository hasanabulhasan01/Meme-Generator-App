"use client";

import { useState } from "react";

export default function MemeMaker(response) {
  const [text1, setText1] = useState(null);
  const [text2, setText2] = useState(null);
  const [generatedMeme, setGeneratedMeme] = useState(null);

  console.log("response----", response);
  if (!response) {
    return <div>No meme found.</div>;
  }

  const generateMeme = async () => {
    if (!response || !text1 || !text2) {
      console.error("Meme ID and text fields are required");
      return;
    }

    const username = "Abul-Hasan";
    const password = "hasan1234";

    const url = `https://api.imgflip.com/caption_image?template_id=${response.response[0].id}&username=${username}&password=${password}&text0=${text1}&text1=${text2}`;

    try {
      const response = await fetch(url, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to generate meme");
      }

      const data = await response.json();
      console.log("Generated meme:", data);
      setGeneratedMeme(data);
      // You can update state or perform any other actions based on the response data
    } catch (error) {
      console.error("Error generating meme:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {!generatedMeme ? (
        <>
          <img className="mb-4 mt-6 md:w-1/3 sm:w-1/2" src={response.response[0].url} alt="Meme" />
          <input
            className="mb-4 px-4 py-2 border border-gray-300 rounded-md w-80"
            placeholder="input1"
            onChange={(e) => setText1(e.target.value)}
          />
          <input
            className="mb-4 px-4 py-2 border border-gray-300 rounded-md w-80"
            placeholder="input2"
            onChange={(e) => setText2(e.target.value)}
          />
          <button className="px-6 py-3 bg-blue-500 text-white rounded-md mb-4" onClick={() => generateMeme()}>
            Generate
          </button>
        </>
      ) : (
        <img className="mb-4 mt-6 md:w-1/3 sm:w-1/2" src={generatedMeme.data.url} />
      )}
    </div>
  );
}
