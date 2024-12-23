import Image from 'next/image';
import React from 'react';
import OtpInputForm from './OtpInputForm';

const VerifyOtpForm = () => {
  return (
    <div className="flex h-[512px] w-[500px] flex-col rounded-md shadow-xl">
      <div className="flex-center flex-col gap-2 rounded-tl-md rounded-tr-md bg-brand-secondary p-10">
        <Image
          src="/assets/icons/JF.svg"
          alt="SVG Example"
          width={44}
          height={45}
          className="mb-[13px]"
        />
        <h3 className="text-center text-xl font-semibold text-white">
          Verify Email
        </h3>
        <p className="text-center text-[15px] font-normal text-[#AEB7CA]">
          we have sent a verification code to support@jobfynder.io In case you
          don&apos;t find it, please check your spam folder.
        </p>
      </div>
      <div className="flex-center h-full rounded-bl-md rounded-br-md bg-white p-10">
        <OtpInputForm />
      </div>
    </div>
  );
};

export default VerifyOtpForm;
