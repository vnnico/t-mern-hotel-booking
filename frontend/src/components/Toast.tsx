import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void; // doesn't accept any parameter and return nothing
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // dalam 5 detik, akan trigger function onClose() yaitu setToast(undefined)
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const styles =
    type === "SUCCESS"
      ? "fixed top-4 right-4 z-5 p-4 rounded-md bg-green-600 text-white max-w-md"
      : "fixed top-4 right-4 z-5 p-4 rounded-md bg-red-600 text-white max-w-md";

  return (
    <div className={styles}>
      <div className="flex justify-center items-center">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
