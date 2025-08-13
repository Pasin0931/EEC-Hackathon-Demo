import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";

import { Button } from "@/components/ui/button";
import { outline } from "@yudiel/react-qr-scanner";

const videoConstraints = {
  width: 720,
  height: 360,
  facingMode: { exact: "environment" },
};

type CameraComponentProps = {
  onCapture: () => void;
};

export const CameraComponent = ({ onCapture }: CameraComponentProps) => {
  const [url, setUrl] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
    }
  }, [webcamRef]);

  return (
    <div className="bg-white flex flex-col items-center justify-center p-3">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-black flex flex-cols items-center justify-center">Camera</h1>
        <p className="mt-3">Submit a picture and wait for admin verification !</p>
      </header>

      <div className="flex flex-col items-center gap-4">
        <div className="border-5 border-gray-300 rounded-xl overflow-hidden shadow-lg">
          <Webcam
            audio={false}
            width={540}
            height={360}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="rounded-lg w-100 h-90"
          />
        </div>
        <div className="flex gap-3 mt-2">
          <Button
            variant={"outline"} className="px-4 py-2 rounded-lg bg-green"
            onClick={() => {
              onCapture();
            }}
          >
            Capture
          </Button>
          <Button variant={"destructive"} className="px-4 py-2 rounded-lg">
            Return
          </Button>
        </div>
      </div>
    </div>
  );
};
