import { forwardRef } from "react";
import Image from "next/image";

type Props = {
  width: number;
  height: number;
  className?: string;
};

const logoSource = "/icon.svg";

const Logo = forwardRef<HTMLImageElement, Props>(function Logo(
  { width, height, className = "", ...props },
  ref
) {
  return (
    <Image
      ref={ref}
      width={width}
      height={height}
      className={className}
      priority
      src={logoSource}
      alt="Jobfynder Logo"
      {...props}
    />
  );
});

export default Logo;
