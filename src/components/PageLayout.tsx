import Header from "./Header";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <div className="h-16" />
      {children}
    </div>
  );
}
export default PageLayout;
