import Header from "@/components/Header";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-black text-white min-h-screen w-screen max-w-none block overflow-x-hidden">
      <Header />
      <div className="h-16" />
      {children}
    </div>
  );
};
export default PageLayout;
