import { Navbar } from "./_components/navbar";

interface protectedLayoutProps {
  children: React.ReactNode;
}
const ProtectedLayout = ({ children }: protectedLayoutProps) => {
  return (
    <div className="flex h-screen w-full items-center justify-center flex-col gap-y-10 bg-gradient-to-tl from-blue-600 to-sky-400 ">
      <Navbar/>
      {children}
    </div>
  );
};

export default ProtectedLayout;
