

export default function Input({type,placeholder,name,register,required}) {
  return (
    <input
      className="bg-white	border-0 py-3.5 px-7 text-black rounded-lg"
      type={type}
      placeholder={placeholder}
      required= {required}
      {...register(name)}
    />
  );


}
