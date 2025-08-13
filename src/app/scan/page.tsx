"use client";
import { centerText, Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";
import { CameraComponent } from "@/components/camera";
import { redirect, RedirectType } from "next/navigation";

type BarcodeFormat =
  | "aztec"
  | "code_128"
  | "code_39"
  | "code_93"
  | "codabar"
  | "databar"
  | "databar_expanded"
  | "data_matrix"
  | "dx_film_edge"
  | "ean_13"
  | "ean_8"
  | "itf"
  | "maxi_code"
  | "micro_qr_code"
  | "pdf417"
  | "qr_code"
  | "rm_qr_code"
  | "upc_a"
  | "upc_e"
  | "linear_codes"
  | "matrix_codes"
  | "unknown"
  | "any";

const SCANNER_FORMATS: BarcodeFormat[] = [
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
];

export default function ScanPage() {
  const [isVerified, setIsVerified] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [packaging, setPackaging] = useState<string[]>([]);
  const [showConfirmSection, setShowConfirmSection] = useState(false);
  const [responseBody, setResponseBody] = useState<object>({});

  const fetchingData = async (id: string) => {
    try {
      setIsVerified(true);

      const response = await fetch(
        `https://world.openfoodfacts.net/api/v2/product/${id}?fields=packaging,packaging_materials_tags,category_properties`,
      );

      if (!response.ok) {
        return console.log("empty response");
      }

      const result = await response.json();
      setCategories(
        Object.values(
          result.product.category_properties?.["ciqual_food_name:en"] || {},
        ),
      );
      setPackaging(
        Object.values(
          result.product.packaging_materials_tags ||
            result.product.packaging ||
            {},
        ),
      );

      const now = new Date();
      const currentTime = now.toLocaleTimeString();

      const body = {
        item: id,
        points: 0.1,
        createdAt: currentTime,
      };

      setResponseBody(body);
    } catch (e) {
      console.log(e);
    }
  };

  const uploadingData = async () => {
    if (packaging == null && categories == null) {
      return;
    }

    const result = await fetch("api//scanApi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(responseBody),
    });

    redirect("/");
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 px-4 sm:px-8 md:px-16 pb-[10vh]">
      <div className="absolute top-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Product Scanner</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Scan a barcode to get instant product details
        </p>
      </div>

      <div className="w-full max-w-xl mt-20">
        {!isVerified && (
          <div className="rounded-2xl overflow-hidden shadow-lg bg-white p-4">
            <Scanner
              formats={SCANNER_FORMATS}
              onScan={(result) => {
                fetchingData(result[0].rawValue);
              }}
              onError={(error: unknown) => {
                alert({ error });
              }}
              components={{ tracker: centerText }}
              paused={isVerified}
              style={{ width: "100%" }}
            />
          </div>
        )}

        {isVerified && !showConfirmSection && (
          <div className="rounded-2xl overflow-hidden shadow-lg bg-white p-4">
            <CameraComponent
              onCapture={() => {
                setShowConfirmSection(true);
              }}
            />
          </div>
        )}

        {showConfirmSection && (
          <div className="bg-white shadow-lg rounded-2xl p-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Detected Categories
            </h2>
            <div className="max-h-40 overflow-auto border border-gray-200 rounded-lg p-3 text-sm text-gray-700">
              {packaging.length > 0 ? (
                <ul className="list-disc list-inside space-y-1">
                  {packaging.map((cat, idx) => (
                    <li key={idx}>{cat}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">No packaging info found</p>
              )}

              {categories.length > 0 ? (
                categories
              ) : (
                <p className="text-gray-500 italic">No categories found</p>
              )}
            </div>
            <div className="flex gap-3 mt-4">
              <button
                className="flex-1 bg-green-500 text-white rounded-lg px-4 py-2 font-medium hover:bg-green-600 transition"
                onClick={() => uploadingData()}
              >
                Confirm
              </button>
              <button
                className="flex-1 bg-gray-200 text-gray-800 rounded-lg px-4 py-2 font-medium hover:bg-gray-300 transition"
                onClick={() => {
                  setIsVerified(false);
                  setShowConfirmSection(false);
                  setCategories([]);
                }}
              >
                Retake
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
