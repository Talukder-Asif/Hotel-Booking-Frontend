import UseAxiousSecure from "./UseAxiousSecure";
import { useQuery } from "@tanstack/react-query";

const useSingleRoom = (id) => {
  const axiosSecure = UseAxiousSecure();

  const {
    data: Room,
    isPending: isRoomLoading,
    refetch,
  } = useQuery({
    queryKey: ["Room", id],
    enabled: !!id, // Only run query if id is truthy
    queryFn: async () => {
      const res = await axiosSecure.get(`/rooms/${id}`);
      return res.data;
    },
  });

  return [Room, isRoomLoading, refetch];
};

export default useSingleRoom;
