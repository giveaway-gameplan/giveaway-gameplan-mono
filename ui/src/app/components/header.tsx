import Link from "next/link";
import GGLogo from "./GGLogo";

const Header = () => {
  return (
    <header className="shadow-lg shadow-amber-300/50 mb-10 md:mb-0 pt-10">
      <Link href="/">
        <GGLogo />
      </Link>
      <Link
        href={{
          pathname: "/",
          query: {},
        }}
      >
        <h1
          className={`
          text-amber-100 text-center text-2xl font-medium italic 
          text-shadow-md text-shadow-amber-200 
          flex flew-row flex-wrap justify-center gap-3 items-center
          pb-6
          `}
        >
          <div>Sports cost money.</div>
          <div>Giveaways don&apos;t.</div>
          <div>We know where they are.</div>
        </h1>
      </Link>
    </header>
  );
};

export default Header;
