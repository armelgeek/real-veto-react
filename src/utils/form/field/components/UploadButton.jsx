import { Box, Flex, Text, chakra } from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";
import axios from "axios";
import React, { forwardRef, useState } from "react";
import ImageLoader from "./ImageLoader";
import useFileHandler from "../../utils/useFileHandler";
export const UploadButton = forwardRef(
  (
    {
      icon,
      name,
      type,
      className,
      filter,
      setData,
      value,
      changeValue,
      invalid,
      ...inputProps
    },
    ref
  ) => {
    const image = value;
    const nodata = type == "single" ? {} : [];
    const {
      imageFile,
      isFileLoading,
      onFileChange,
      removeImage,
      removeSingle,
    } = useFileHandler({
      [name]: image != undefined ? image : nodata,
    });
    React.useEffect(() => {
      if (type == "single") {
        changeValue(imageFile[`${name}`].file);
      } else {
        changeValue(imageFile[`${name}`]);
      }
    }, [imageFile]);
    return (
      <Box>
        {type == "single" ? (
          <>
            {imageFile[name]?.url && (
              <Box p={3} position="relative">
                <ImageLoader alt="" src={imageFile[name].url} width="100px" />
                <Text
                  cursor="pointer"
                  color="white"
                  position="absolute"
                  top={3}
                  left={4}
                  onClick={() => removeSingle(name)}
                >
                  <FiTrash2 size={15} fill="red" />
                </Text>
              </Box>
            )}
            {typeof value == "string" && value != undefined  &&  (
              <Box p={3} position="relative">
                <ImageLoader alt="" src={value} width="100px" />
                <Text
                  cursor="pointer"
                  color="white"
                  position="absolute"
                  top={4}
                  left={4}
                  onClick={() => removeSingle(name)}
                >
                  <FiTrash2 size={15} fill="red" />
                </Text>
              </Box>
            )}
          </>
        ) : (
          <Flex flexDir="row" justifyContent="flex-start" flexWrap="wrap">
            {imageFile[name].length >= 1 &&
              imageFile[name].map((img) => (
                <Box p={3} key={img.id} position="relative">
                  <ImageLoader
                    alt=""
                    src={img.url}
                    width="100px"
                    boxShadow="lg"
                  />
                  <Text
                    cursor="pointer"
                    color="white"
                    rounded="full"
                    position="absolute"
                    top={4}
                    right={4}
                    onClick={() => removeImage({ id: img.id, name: name })}
                  >
                    <FiTrash2 size={15} fill="red" />
                  </Text>
                </Box>
              ))}
          </Flex>
        )}
        {!isFileLoading && (
          <>
            {type == "single" ? (
              <>
                <input
                  accept="image/x-png,image/jpeg"
                  onChange={(e) =>
                    onFileChange(e, { name: name, type: "single" })
                  }
                  type="file"
                />
              </>
            ) : (
              <>
                <input
                  accept="image/x-png,image/jpeg"
                  multiple
                  onChange={(e) =>
                    onFileChange(e, { name: name, type: "multiple" })
                  }
                  type="file"
                />
              </>
            )}
          </>
        )}
      </Box>
    );
  }
);
