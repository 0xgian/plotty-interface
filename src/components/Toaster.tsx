import { Toaster as RhtToaster } from "react-hot-toast";

export default function Toaster() {
  return (
    <RhtToaster
      position="bottom-center"
      toastOptions={{
        style: {
          borderRadius: "0.5rem",
          color: "#fff",
          background: "#5B6BDF",
        },
      }}
    />
  );
}
