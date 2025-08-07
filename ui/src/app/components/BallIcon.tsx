import Image from "next/image";

const BallIcon = ({ league }: { league: string | undefined }) => {
  let icon: string;

  switch (league) {
    case "mlb":
      icon = "/baseball-svgrepo-com1.svg";
      break;
    case "nfl":
      icon = "/football-ball-svgrepo-com.svg";
      break;
    case "nhl":
      icon = "/hockey-stick-sport-winter-svgrepo-com.svg";
      break;
    case "nba":
      icon = "/basketball-svgrepo-com.svg";
      break;
    default:
      icon = "/baseball-svgrepo-com1.svg";
  }

  return <Image src={`${icon}`} width={100} height={100} alt="Logo" />;
};

export default BallIcon;
