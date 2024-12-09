import { auth } from "@/auth";
import Link from "next/link";
import DropDownMenu from "./DropDownMenu";
const Navbar = async ({ sideMenu }) => {
  const session = await auth();
  const image = session?.user?.image;

  return (
    <nav>
      <Link href="/">
        <span className="text-2xl tracking-widest">
          <span className="text-5xl font-extrabold text-primary">G</span>{" "}
          BOOKING
        </span>
      </Link>
      {sideMenu && (
        <ul>
          <li>
            <Link href="/hotels">Expore Hotels</Link>
          </li>

          <li>
            <Link href="/bookings">Bookings</Link>
          </li>
          <li>
            <DropDownMenu image={image} />
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
