import { useQuery } from "@tanstack/react-query";
import statusService from "../../services/status/status.service";
function useStatus() {
  return useQuery({
    queryKey: ["consults"],
    queryFn: () => statusService.get(),
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
  });
}

export default useStatus;
