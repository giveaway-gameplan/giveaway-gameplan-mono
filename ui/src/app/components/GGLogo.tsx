import Image from "next/image";

export default function GGLogo() {
  return (
    <Image
      src="/also_good.svg"
      width={1000}
      height={1000}
      alt="Logo"
      className="w-50 h-auto mx-auto my-5"
    />
  );
}
