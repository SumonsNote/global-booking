import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
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
            <Image
              src="/default-avatar.svg"
              alt="user"
              width={40}
              height={40}
            />
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
