import React from "react";

type Props = {
  name: string;
  alt: string;
  className?: string;
};

export const Image = ({ name, alt, className }: Props) => {
  try {
    // 필요에 따라 이미지 가져오기
    const image = require(`../assets/images/${name}`);

    if (!image) return null;
    return <img src={image} alt={alt} className={className} />;
  } catch (error) {
    console.log(`Image with name "${name}" does not exist`);
    return null;
  }
};
