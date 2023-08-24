import _, { isEmpty } from "lodash";
import { getAPI } from "lib/getAPI";
import { getAddress, isAddress } from "viem";
import { useQuery } from "wagmi";
import { isValidHashOrCashtag } from "lib/textProcessor";

export const useSearch = (param: string | undefined) => {
  const { data: searchResults } = useQuery(
    ["searchProfile", param],
    async () => {
      if (param && !_.isEmpty(param) && !/^[#$](\w+).$/.test(param)) {
        const res = await fetch(
          getAPI(
            `/api/search?people=${
              isAddress(param) ? getAddress(param) : param.replace(/^[@]/g, "")
            }`
          )
        );
        const json = await res.json();
        const list = json?.data?.data;
        return isAddress(param) && isEmpty(list)
          ? [{ public_address: getAddress(param) }]
          : list;
      }
      return null;
    }
  );

  const { data: searchWords } = useQuery(["searchWords", param], async () => {
    if (param && !_.isEmpty(param) && !/^[@](\w+).$/.test(param)) {
      const res = await fetch(
        getAPI(
          `/api/search/autocomplete?word=${param
            .replace(/^#/g, "%23")
            .replace(/^\$/g, "%24")}`
        )
      );
      const json = await res.json();
      const list = json?.data?.filter(isValidHashOrCashtag);
      return isEmpty(list) ? [param] : list;
    }
    return null;
  });

  return { searchResults, searchWords };
};
