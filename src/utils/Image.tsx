import React from "react";

type Props = {
  name: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: "lazy" | "eager";
  decoding?: "async" | "auto" | "sync";
};

export const Image = ({
  name,
  alt,
  className,
  style,
  loading = "lazy",
  decoding = "async",
}: Props) => {
  if (name.startsWith("http")) {
    return (
      <img
        src={name}
        alt={alt}
        className={className}
        style={style}
        loading={loading}
        decoding={decoding}
      />
    );
  }
  try {
    // Import image as needed
    const image = require(`../assets/images/${name}`);

    if (!image) return null;
    return (
      <img
        src={image}
        alt={alt}
        className={className}
        style={style}
        loading={loading}
        decoding={decoding}
      />
    );
  } catch (error) {
    console.log(`Image with name "${name}" does not exist`);
    return null;
  }
};
