import Image from "next/image";

export default ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => <div className="flex h-full items-center">
  <div className="flex-auto flex items-center justify-center">
    <Image src={'/next.svg'} width={500} height={500} alt="next"></Image>
  </div>
  {children}
</div>
