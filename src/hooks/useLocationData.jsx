import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useLocationData = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  // districts
  const { data: districts, isLoading: isDistrictsLoading } = useQuery({
    queryKey: ["districts"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/districts");
      return data;
    },
  });
  // upazila get

  const { data: upazilas, isLoading: isUpazilasLoading } = useQuery({
    queryKey: ["upazilas"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/upazilas");
      return data;
    },
  });
  // single user Data get
  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/${user?.email}`);
      return data;
    },
  });

  return {
    districts,
    upazilas,
    userData,
    isLoading: isDistrictsLoading || isUpazilasLoading || isUserLoading, // Combined loading state
  };
};

export default useLocationData;
