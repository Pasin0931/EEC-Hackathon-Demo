"use client";
import Scan from "@/components/scan";
import Barcodereader from "@/components/ui/barcodeReader";

export default function ScanPage() {
  return (
    <div
      className="flex flex-cols justify-center items-center h-screen"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <Barcodereader />
    </div>
  );
}
