"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type LoadingImageProps = ImageProps & {
  wrapperClassName?: string;
};

export default function LoadingImage({
  className = "",
  wrapperClassName = "",
  onLoad,
  onError,
  fill,
  alt,
  ...props
}: LoadingImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad: NonNullable<ImageProps["onLoad"]> = (event) => {
    setIsLoading(false);
    onLoad?.(event);
  };

  const handleError: NonNullable<ImageProps["onError"]> = (event) => {
    setIsLoading(false);
    onError?.(event);
  };

  return (
    <span
      className={`group/loading-image ${fill ? "absolute inset-0" : "relative inline-flex"} ${wrapperClassName}`}
      aria-busy={isLoading}
    >
      <Image
        {...props}
        alt={alt}
        fill={fill}
        className={className}
        onLoad={handleLoad}
        onError={handleError}
      />
      {isLoading && (
        <span
          className="image-loading-indicator absolute inset-0 z-10 flex items-center justify-center bg-void/35"
          aria-hidden="true"
        >
          <span className="image-loading-track">
            <span className="image-loading-bar" />
          </span>
        </span>
      )}
    </span>
  );
}
