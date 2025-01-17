import React from "react";
import SharedHome from "./SharedHome";
import DonorHome from "./Donor/DonorHome";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

export default function RoleBasedHome() {
  // const { role } = useAuth(); // Assume `role` is fetched from the auth context
  const { user } = useAuth();
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
  } else if (userRole?.role === "admin") {
    return <SharedHome />;
  } else {
    // Redirect or show an error page if the role is invalid
    return <Navigate to="/" replace />;
  }
}
