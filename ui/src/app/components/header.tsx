import Link from "next/link";
import GGLogo from "./GGLogo";

const Header = () => {
  return (
    <header>
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
          text-center 
          text-2xl font-bold
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
