import React from "react";

type Props = {
  name: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
};

export const Image = ({ name, alt, className, style }: Props) => {
  if (name.startsWith("http")) {
    return <img src={name} alt={alt} className={className} style={style} />;
  }
  try {
    // Import image as needed
    const image = require(`../assets/images/${name}`);

    if (!image) return null;
    return <img src={image} alt={alt} className={className} style={style} />;
  } catch (error) {
    console.log(`Image with name "${name}" does not exist`);
    return null;
  }
};
