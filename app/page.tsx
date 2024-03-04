import Image from "next/image";
import Link from "next/link";

/* group-hover:filter group-hover:blur-[2px] */


const HomePage = () => {
  return (
    <>
      <div className="grid grid-cols-2 h-[95vh]">
        <div className="relative group transition ease-in-out delay-75 hover:scale-[98%] duration-300 h-full w-full">
          <Link href="/dashboard">
            <div className="group-hover:filter group-hover:blur-sm h-full w-full">
              <Image
                src="/fondo_prueba.jpg"
                alt="Logo"
                priority
                layout="fill"
                objectFit="cover"
                className="h-full w-full"
                />
            </div>
            <h4 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-black">
              PRESIONE
            </h4>
          </Link>
        </div>
        <div className="relative group transition ease-in-out delay-75 hover:scale-[98%] duration-300 h-full w-full">
          <Link href="/dashboard">
            <div className="group-hover:filter group-hover:blur-sm h-full w-full">
              <Image
                src="/mesas.jpg"
                alt="Logo"
                priority
                layout="fill"
                objectFit="cover"
                className="h-full w-full"
                />
            </div>
            <h4 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-black">
              PRESIONE 2
            </h4>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
