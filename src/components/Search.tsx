"use client";

import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { HiOutlineSearch, HiOutlineX } from "react-icons/hi";
import { useSearch } from "hooks/useSearch";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import BrandLoading from "components/BrandLoading";
import IconButton from "components/IconButton";
import AvatarCard from "components/AvatarCard";
import { useAuthStatusStore } from "state/authStatus";
import clsx from "clsx";
import _ from "lodash";
import { isValidHashOrCashtag } from "lib/textProcessor";
import { popOverDownAnimate } from "config/transitions";

export default function Search() {
  const router = useRouter();
  const { account } = useAuthStatusStore();

  const pathname = usePathname() as string;
  const searchParams = useSearchParams();
  const initSearch = pathname === "/search" ? searchParams?.get("q") : null;

  const [query, setQuery] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

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
    setSearchValue(text);

    if (text.length === 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, []);

  const onSelectionChange = useCallback(
    (selected: string) => {
      if (isValidHashOrCashtag(selected)) {
        router.push(`/search?q=${encodeURIComponent(selected)}`);
      } else if (selected[0] === "@") {
        router.push(`/${selected.substring(1)}`);
        setSearchValue("");
      } else {
        router.push(`/search?q=${selected}`);
      }
    },
    [router]
  );

  return !!account ? (
    <Combobox onChange={onSelectionChange}>
      <>
        <div
          className={clsx(
            "w-full justify-end",
            show ? "hidden" : "flex sm:hidden"
          )}
        >
          <IconButton
            icon={<HiOutlineSearch size={20} className="text-secondary-text" />}
            activeColor="black"
            onClick={() => setShow(!show)}
          />
        </div>

        <div
          className={clsx(
            "fixed top-0 left-0 z-[1] bg-white sm:relative sm:z-auto w-full sm:max-w-[348px]",
            "px-4 sm:px-0 py-[9px] sm:py-0",
            show ? "flex" : "hidden sm:flex"
          )}
        >
          <div className="relative w-full">
            <div className="flex items-center gap-3 bg-opacity-10 bg-secondary-text h-[42px] w-full px-4 rounded-full">
              <HiOutlineSearch size={20} className="text-secondary-text" />
              <Combobox.Input
                className="w-full bg-transparent outline-none text-ellipsis"
                placeholder="Search address / handle"
                autoComplete="off"
                value={searchValue}
                onChange={inputChangeHandler}
              />
            </div>

            <Transition
              as={Fragment}
              {...popOverDownAnimate}
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options
                className={clsx(
                  "absolute z-[1]  overflow-x-hidden text-base rounded-lg shadow-lg bg-primary-white",
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

          <div className={clsx("ml-3", !show ? "hidden" : "flex sm:hidden")}>
            <IconButton
              icon={<HiOutlineX size={20} className="text-secondary-text" />}
              activeColor="black"
              onClick={() => setShow(!show)}
            />
          </div>
        </div>
      </>
    </Combobox>
  ) : (
    <div />
  );
}
