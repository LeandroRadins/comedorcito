import Image from "next/image";

interface PageHeaderProps {
  title: string;
  headerStyle?: string;
  imageStyle?: string;
  imageData: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  headerStyle,
  imageStyle,
  imageData,
}) => {
  return (
    <>
      {/*TODO: Agregar img de nexts */}
      <Image
        className={`my-auto size-10 ${imageStyle}`}
        src={imageData.src}
        alt={imageData.src}
        width={imageData.width}
        height={imageData.height}
      />
      <p
        className={`text-2xl font-bold leading-9 tracking-tight py-2 px-2 ${headerStyle}`}
      >
        {title}
      </p>
    </>
  );
};
