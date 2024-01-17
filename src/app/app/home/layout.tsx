import FeedTabs from "./_components/FeedTabs";

export const metadata = {
  title: "Home",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FeedTabs />
      {children}
    </>
  );
}
