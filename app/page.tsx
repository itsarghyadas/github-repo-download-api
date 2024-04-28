"use client";
import axios from "axios";
import { useState } from "react";
const webUrl = process.env.NEXT_PUBLIC_URL;

export default function Page() {
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    console.log("download");
    setLoading(true);
    axios
      .post(`${webUrl}/api/repo`)
      .then((response) => {
        const downloadUrl = response.data.downloadUrl;
        const status = response.data.status;
        window.location.href = downloadUrl;
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="bg-pattern relative isolate min-h-screen flex items-center justify-center">
      <div className="border rounded-xl bg-indigo-600 ring-2 ring-offset-2 ring-indigo-500/50 p-20 flex flex-col gap-y-7 items-center justify-center">
        <p className="font-bold text-3xl tracking-tighter text-white">
          Github Repo Download API
        </p>
        <button
          className="bg-white w-full flex items-center gap-x-3 justify-center h-12 text-neutral-900 text-lg font-bold rounded-md hover:bg-neutral-100"
          onClick={handleDownload}
          disabled={loading}
        >
          {loading ? "Downloading..." : "Download Repo"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-cloud-download"
          >
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
            <path d="M12 12v9" />
            <path d="m8 17 4 4 4-4" />
          </svg>
        </button>
      </div>
    </section>
  );
}
