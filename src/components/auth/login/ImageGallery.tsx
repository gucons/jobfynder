import Image from "next/image";

const ImageGallery = () => {
  return (
    <div className="mb-[8px] flex justify-center space-x-[-7px]">
      <div className="h-[24px] w-[24px] overflow-hidden rounded-full border border-white">
        <Image
          src="/assets/images/person-1.jpg"
          alt="Person 1"
          width={24}
          height={24}
          className="object-cover"
          priority
        />
      </div>
      <div className="h-[24px] w-[24px] overflow-hidden rounded-full border border-white">
        <Image
          src="/assets/images/person-2.jpg"
          alt="Person 2"
          width={24}
          height={24}
          className="object-cover"
          priority
        />
      </div>
      <div className="h-[24px] w-[24px] overflow-hidden rounded-full border border-white">
        <Image
          src="/assets/images/person-3.jpg"
          alt="Person 3"
          width={24}
          height={24}
          className="object-cover"
          priority
        />
      </div>
      <div className="h-[24px] w-[24px] overflow-hidden rounded-full border border-white">
        <Image
          src="/assets/images/person-4.jpg"
          alt="Person 4"
          width={24}
          height={24}
          className="object-cover"
          priority
        />
      </div>
      <div className="h-[24px] w-[24px] overflow-hidden rounded-full border border-white">
        <Image
          src="/assets/images/person-5.jpg"
          alt="Person 5"
          width={24}
          height={24}
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
};

export default ImageGallery;
