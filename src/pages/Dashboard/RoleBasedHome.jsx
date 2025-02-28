import React from "react";
import SharedHome from "./SharedHome";
import DonorHome from "./Donor/DonorHome";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function RoleBasedHome() {
  // const { role } = useAuth(); // Assume `role` is fetched from the auth context
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userRole, isLoading } = useQuery({
    queryKey: ["userRole", user.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/role/${user?.email}`);
      return data;
    },
  });
  if (userRole?.role === "donor") {
    return <DonorHome />;
  } else if (userRole?.role === "admin" || userRole?.role === "volunteer") {
    return <SharedHome />;
  }
  if (loading || isLoading) return <LoadingSpinner></LoadingSpinner>;
}
