export default function WaitingScreen() {
  return (
    <div className="flex gap-4">
      <svg
        className="animate-pulse delay-[0ms]"
        height="100"
        width="100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle r="45" cx="50" cy="50" fill="black" />
      </svg>

      <svg
        className="animate-pulse delay-[200ms]"
        height="100"
        width="100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle r="45" cx="50" cy="50" fill="black" />
      </svg>

      <svg
        className="animate-pulse delay-[400ms]"
        height="100"
        width="100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle r="45" cx="50" cy="50" fill="black" />
      </svg>
    </div>
  );
}
