import { ReactNode } from "react";
import ProfilePageHeader from "./_components/ProfilePageHeader";
import { Metadata, ResolvingMetadata } from "next";
import { formatAddress } from "lib/formatAddress";

export async function generateMetadata(
  { params: { u } }: { params: { u: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: {
      template: `%s | ${formatAddress(u, {
        leading: 6,
        trailing: 0,
      })} | Plotty`,
      default: formatAddress(u, { leading: 6, trailing: 0 }),
    },
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <ProfilePageHeader />
      {children}
    </>
  );
}
