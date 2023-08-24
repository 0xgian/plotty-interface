import _ from "lodash";
import { Metadata, ResolvingMetadata } from "next";
import SearchPage from "./_components/SearchPage";

export async function generateMetadata(
  { searchParams }: { searchParams?: { [key: string]: string | string[] } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const q = searchParams?.["q"] as string;
  return {
    title: q ? `${q} - Search` : "Search",
  };
}

export default function Page() {
  return <SearchPage />;
}
