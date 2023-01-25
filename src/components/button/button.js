

export default function Button({ children, ...props }) {
  return (
    <button className="px-8 py-4 bg-blue-800 text-white text-sm rounded-xl font-bold cursor-pointer border-0" {...props}>
      {" "}
      {children}
      
    </button>
  );
}
