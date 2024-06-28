import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image
        width={40}
        height={40}
        src="/logo.svg"
        alt="Logo"
        className="w-10 h-10"
      />
      <span className="text-2xl font-bold text-white">VidMeet</span>
    </Link>
  );
};

export default Logo;
