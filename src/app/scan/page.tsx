"use client";
import { centerText, Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";
import { CameraComponent } from "@/components/camera";
import { redirect, RedirectType } from "next/navigation";
import { motion } from "framer-motion"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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
    const postBody = {
      item: "Item",
      points: 0.1,
      createdAt: new Date()
    }

    const result = await fetch("/api//scanApi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postBody),
    });

    // redirect("/");
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.05 }}>
        <div className="flex flex-cols items-center justify-center">
          <Card className=" w-90 text-center p-5 bg-transparent border-4 border-black rounded-2xl shadow-2xl backdrop-blur-lg transition-all duration-500">
            <h1 className="text-3xl font-bold text-black">Product Scanner</h1>
            <p className="font-bold mt-1 text-sm text-black">
              Scan a barcode to get instant product details
            </p>
          </Card>
        </div>

        <div className="w-full max-w-xl mt-4">
          {!isVerified && (
            <div className="rounded-2xl overflow-hidden bg-black border-6 border-black">
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
              // style={{ width: "100%" }}
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
            <div className="bg-white border-4 border-black shadow-lg rounded-2xl p-6 mt-6">
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
                  onClick={() => {
                    uploadingData()
                    alert("Confirmed ! Please wait for us to verify your information.")
                    setIsVerified(false);
                    setShowConfirmSection(false);
                    setCategories([]);
                  }}
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

        <Link href={'/'} className="w-full">
          <Button variant={"outline"} className="cursor-pointer transition duration-300 w-full mt-4 border-4 border-black bg-white backdrop-blur-lg">
            Return to Menu
          </Button>
        </Link>

      </motion.div>
    </div >
  );
}
