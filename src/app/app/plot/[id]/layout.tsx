import { ReactNode } from "react";
import { Metadata, ResolvingMetadata } from "next";
import { getAPI } from "lib/getAPI";
import { formatAddress } from "lib/formatAddress";

export async function generateMetadata(
  { params: { id } }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const res = await fetch(getAPI(`/api/post/${id}`));
  const json = await res.json();
  const plotDetails = json?.data?.data?.post;

  const content = plotDetails?.content;
  const username =
    plotDetails?.profile?.handle ??
    formatAddress(plotDetails?.profile?.public_address, { trailing: 0 });
  const parentMeta = await parent;

  return {
    title: plotDetails ? `${username}: ${content}` : `Plot - ${id}`,
    description: plotDetails ? content : parentMeta.description,
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
