export default function LoginCard({ title, children }) {
  return (
    <div className="bg-white w-[400px] p-[20px] rounded-[10px]">
      <h2 className="text-center p-1.5">{title}</h2>
      {children}
    </div>
  );
}
