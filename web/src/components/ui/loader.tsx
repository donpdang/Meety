import Image from 'next/image';

export function Loader() {
  return (
    <div className="align-center mx-auto flex animate-bounce flex-row items-center justify-center text-center text-black">
      <Image src="/mfer.png" alt="" height={25} width={25} className="rounded-full " />
    </div>
  );
}
