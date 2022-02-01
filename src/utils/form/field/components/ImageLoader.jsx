import { Image } from "@chakra-ui/image";
import PropType from "prop-types";
import React, { useState } from "react";
import { Flex, Box, Spinner } from "@chakra-ui/react";

import noImg from '../assets/img/no-image.png';
const ImageLoader = ({ src, alt, className, height, ...props }) => {
  const loadedImages = {};
  const [loaded, setLoaded] = useState(loadedImages[src]);

  const onLoad = () => {
    loadedImages[src] = true;
    setLoaded(true);
  };

  return (
    <Box>
      <Box pos={"relative"}>
       
        <Image
          {...props}
          objectFit={"cover"}
          alt={alt || ""}
          className={`${className || ""}`}
          onLoad={onLoad}
          fallbackSrc={noImg}
          src={src}
        />
      </Box>
    </Box>
  );
};

ImageLoader.defaultProps = {
  className: "image-loader",
};

ImageLoader.propTypes = {
  src: PropType.string.isRequired,
  alt: PropType.string.isRequired,
  className: PropType.string,
};

export default ImageLoader;
