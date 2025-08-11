import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";

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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Camera App</h1>
      </header>

      <div className="flex flex-col items-center gap-4">
        <div className="border-4 border-gray-300 rounded-xl overflow-hidden shadow-lg">
          <Webcam
            audio={false}
            width={540}
            height={360}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="rounded-lg"
          />
        </div>
        <button
          className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
          onClick={() => {
            onCapture();
          }}
        >
          Capture
        </button>
        <div>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
            End
          </button>
        </div>
      </div>
    </div>
  );
};
