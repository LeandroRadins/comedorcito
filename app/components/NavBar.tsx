import Image from "next/image";
import Link from "next/link";
import { Pangolin } from "next/font/google";

const pangolin = Pangolin({ weight: "400", subsets: ["latin"] });

const NavBar = () => {
  return (
    <>
      <header className="sticky inset-0 z-50 border-b border-slate-100 bg-[#f7f7f7] backdrop-blur-lg">
        <nav className="mx-auto flex max-w-7xl px-4 transition-all duration-200 ease-in-out lg:px-12 py-2">
          <div>
            <Link href="/">
              <Image
                src="/comedorcito_imagotipo.svg"
                alt="Logo"
                priority
                className="bg-transparent col-span-3"
                width={200}
                height={200}
              />
            </Link>
          </div>
          <div className="flex-grow"></div>
          <div className="hidden items-center justify-center gap-6 md:flex">
            <Link
              href="/auth/login"
              className="font-dm text-sm font-bold text-text transition-transform duration-150 easy-in-out hover:scale-[1.04]"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/auth/register"
              className="rounded-lg bg-primary px-3 py-1.5 font-dm text-sm font-medium text-white transition-transform duration-150 ease-in-out delay-75  hover:scale-[1.04]"
            >
              Registrarse
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
