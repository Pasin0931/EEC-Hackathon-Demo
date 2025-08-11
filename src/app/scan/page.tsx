"use client";
import { centerText, Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";

export default function ScanPage() {
  const [isDoneFetching, setisDoneFetching] = useState(false);
  const [data, setData] = useState<string[]>([]);

  const fetchingData = async (id: string) => {
    try {
      const response = await fetch(
        `https://world.openfoodfacts.net/api/v2/product/${id}/?fields=categories_tags`,
      );

      if (!response.ok) {
        return console.log("empty response");
      }

      const result = await response.json();
      setData(Object.values(result.product.categories_tags));
      setisDoneFetching(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="relative flex flex-col justify-center-safe items-center bg-[#191D26] w-screen h-screen px-4 sm:px-8 md:px-16 pb-[10vh]">
      <h1 className="text-2xl sm:text-3xl md:text-5xl text-white -mb-1">
        START SCANNING
      </h1>
      <h3 className="text-xs sm:text-sm md:text-lg text-white my-2 text-center max-w-xs sm:max-w-md md:max-w-lg">
        Reward depend on item you scan
      </h3>
      <div className="border-4 border-solid border-white w-[322px] h-[319px]">
        <Scanner
          formats={[
            "aztec",
            "code_128",
            "code_39",
            "code_93",
            "codabar",
            "databar",
            "databar_expanded",
            "data_matrix",
            "dx_film_edge",
            "ean_13",
            "ean_8",
            "itf",
            "maxi_code",
            "micro_qr_code",
            "pdf417",
            "qr_code",
            "rm_qr_code",
            "upc_a",
            "upc_e",
            "linear_codes",
            "matrix_codes",
            "unknown",
          ]}
          onScan={(result) => {
            fetchingData(result[0].rawValue);
          }}
          onError={(error: unknown) => {
            alert({ error });
          }}
          components={{ tracker: centerText }}
          paused={isDoneFetching}
        />
      </div>
      {isDoneFetching && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => {
                setisDoneFetching(false);
              }}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Scan Result</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-80">
              {data[0]}
            </pre>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 w-full h-[10vh] bg-white"></div>
    </div>
  );
}
