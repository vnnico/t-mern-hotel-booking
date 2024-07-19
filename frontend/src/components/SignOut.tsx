//import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";

const SignOutButton = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const mutation = useMutation(apiClient.logOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken"); // TANDAIN BIAR GA PERLU REFRESH PAGE
      showToast({ message: "Sign out Successful!", type: "SUCCESS" });
      //navigate("/sign-in");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      className="text-blue-600 px-3 font-bold hover:bg-gray-100 bg-white"
      onClick={handleClick}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
