import { Image } from '@chakra-ui/image'
import PropType from 'prop-types'
import React, { useState } from 'react'
import {Box,Spinner} from "@chakra-ui/react";

const ImageLoader = ({ src, alt, className, ...props }) => {
  const loadedImages = {}
  const [loaded, setLoaded] = useState(loadedImages[src])

  const onLoad = () => {
    loadedImages[src] = true
    setLoaded(true)
  }

  return (
    <Box position="relative" >

      {!loaded &&<Box {...props} position="absolute" top={0} height={100}> <Spinner></Spinner></Box>}
      <Image
        {...props}
        alt={alt || ''}
        className={`${className || ''} ${
          loaded ? 'is-img-loaded' : 'is-img-loading'
        }`}
        onLoad={onLoad}
        src={src}
      />
    </Box>
  )
}

ImageLoader.defaultProps = {
  className: 'image-loader'
}

ImageLoader.propTypes = {
  src: PropType.string.isRequired,
  alt: PropType.string.isRequired,
  className: PropType.string
}

export default ImageLoader
