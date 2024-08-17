"use client";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

export default function Avatar({ userId }: { userId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("passenger_profile")
        .select("*")
        .eq("account_id", userId)
        .single();

      if (error) {
        return null;
      }

      return data;
    },
  });

  if (isLoading) {
    return <p>cargando...</p>;
  }

  return (
    <>
      <span>{data.name}</span>
      <img src={data.avatar_url} alt={data.name} />
      <p>{data.email}</p>
    </>
  );
}
