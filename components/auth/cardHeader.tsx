interface headerProps {
  label: string;
}

export const Header = ({ label }:headerProps) => {
  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center font-sans">
      <h1 className="text-3xl font-sans font-bold">🔐 Authentication</h1>
      <p className="text-slate-400 text-sm">{label}</p>
    </div>
  );
};
