"use client";

import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { HiOutlineSearch, HiOutlineX } from "react-icons/hi";
import { useSearch } from "hooks/useSearch";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import BrandLoading from "components/BrandLoading";
import AvatarCard from "components/AvatarCard";
import { useAuthStore } from "state/auth";
import clsx from "clsx";
import _ from "lodash";
import { isValidHashOrCashtag } from "lib/textProcessor";
import useWindowDimensions from "hooks/useWindowDimensions";

export default function Search() {
  const router = useRouter();
  const { account } = useAuthStore();

  const pathname = usePathname() as string;
  const searchParams = useSearchParams();
  const initSearch = pathname === "/search" ? searchParams?.get("q") : null;

  const [query, setQuery] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isInit, setIsInit] = useState(true);
  const [loading, setLoading] = useState(false);

  const alwaysShow = ["/search"].includes(pathname);
  const { sm } = useWindowDimensions();

  const { searchResults, searchWords } = useSearch(query);

  const filtered = useMemo(
    () =>
      query === ""
        ? { searchResults: [], searchWords: [] }
        : {
            searchResults: searchResults ?? [],
            searchWords: searchWords ?? [],
          },
    [query, searchResults, searchWords]
  );

  useEffect(() => {
    setIsInit(true);
    !!initSearch ? setSearchValue(initSearch) : setSearchValue("");
  }, [initSearch]);

  useEffect(() => {
    if (searchResults || searchWords) {
      setLoading(false);
    }
  }, [searchResults, searchWords]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setQuery(searchValue);
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  const inputChangeHandler = useCallback((event: any) => {
    const text = event.target.value;
    setIsInit(false);
    setSearchValue(text);

    if (text.length === 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, []);

  const onSelectionChange = useCallback(
    (selected: string) => {
      if (initSearch?.toLowerCase() === selected.toLowerCase()) {
        setIsInit(true);
        setSearchValue(selected);
      } else if (isValidHashOrCashtag(selected)) {
        router.push(`/search?q=${encodeURIComponent(selected)}`);
      } else if (selected[0] === "@") {
        router.push(`/${selected.substring(1)}`);
        setSearchValue("");
      } else {
        router.push(`/search?q=${selected}`);
      }
    },
    [router, initSearch]
  );

  return !!account ? (
    <Combobox onChange={onSelectionChange}>
      <>
        <div
          className={clsx(
            "w-full sm:w-screen sm:max-w-[348px]",
            alwaysShow || sm ? "flex" : "hidden"
          )}
        >
          <div className="relative w-full">
            <div className="flex items-center gap-3 bg-opacity-10 bg-secondary-text h-[42px] w-full px-4 rounded-full">
              <HiOutlineSearch size={20} className="text-secondary-text" />
              <Combobox.Input
                className="w-full bg-transparent outline-none text-ellipsis"
                placeholder="Search Plotty"
                autoComplete="off"
                value={searchValue}
                onChange={inputChangeHandler}
              />
            </div>

            <Transition
              show={!isInit}
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options
                className={clsx(
                  "absolute z-[1] overflow-x-hidden text-base rounded-lg shadow-lg bg-primary-white",
                  "max-h-60 w-full mt-1 sm:text-sm",
                  query !== "" && "ring-1 ring-secondary-text ring-opacity-5"
                )}
              >
                {loading ? (
                  <div className="relative flex items-center justify-center h-16 select-none">
                    <BrandLoading />
                  </div>
                ) : query !== "" &&
                  _.isEmpty(filtered.searchResults) &&
                  _.isEmpty(filtered.searchWords) ? (
                  <div className="relative flex justify-center px-3 py-3 select-none min-h-16">
                    Try searching for address, handle, or keywords
                  </div>
                ) : (
                  <>
                    {filtered.searchWords.map((word: string, i: number) => (
                      <Combobox.Option
                        key={i}
                        className={({ active }) =>
                          `relative select-none py-3 px-4 ${
                            active
                              ? "bg-secondary-text bg-opacity-5"
                              : "text-secondary-text"
                          }`
                        }
                        value={word}
                      >
                        {({ selected, active }) => (
                          <div className="flex items-center gap-3 cursor-pointer">
                            <div className="flex items-center justify-center w-10 h-10">
                              <HiOutlineSearch size={20} />
                            </div>
                            <div className="flex flex-col truncate">
                              <div className="truncate text-ellipsis">
                                {word}
                              </div>
                            </div>
                          </div>
                        )}
                      </Combobox.Option>
                    ))}
                    {filtered.searchResults.map((profile: any) => (
                      <Combobox.Option
                        key={profile?.uid}
                        className={({ active }) =>
                          `relative select-none py-3 px-4 ${
                            active
                              ? "bg-secondary-text bg-opacity-5"
                              : "text-secondary-text"
                          }`
                        }
                        value={"@".concat(
                          profile?.handle ?? profile?.public_address
                        )}
                      >
                        {({ selected, active }) => (
                          <AvatarCard profile={profile} />
                        )}
                      </Combobox.Option>
                    ))}
                  </>
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </div>
      </>
    </Combobox>
  ) : (
    <div />
  );
}
