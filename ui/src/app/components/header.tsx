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
        <h2
          className="
          text-amber-300 text-center text-2xl font-light italic
          text-shadow-sm text-shadow-amber-100
          flex flew-row flex-wrap justify-center gap-3 items-center
          pb-6
          "
        >
          <p>Sports are expensive,</p>
          <p>knowing where giveaways are…</p>
          <p>PRICELESS</p>
        </h2>
      </Link>
    </header>
  );
};

export default Header;
