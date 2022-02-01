import {
  Radio,
  Button,
  Box,
  Stack,
  RadioGroup,
  useRadio,
  useRadioGroup,
  HStack,
} from "@chakra-ui/react";
import React, { forwardRef, useState } from "react";
function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}
const RadioProduct = forwardRef(
  (
    {
      name,
      className,
      options,
      radioValue,
      valueKey,
      direction,
      inArray,
      filter,
      setData,
      changeValue,
      setRadio,
      filtrable,
      ...inputProps
    },
    ref
  ) => {
    const [radioValueData, setRadioValue] = useState(radioValue);
    const [value, setValue] = React.useState(`${radioValueData}`);
    const removeFromArray = (value) => {
      options.filter((option) => option.id != value);
    };
    React.useEffect(() => {
      changeValue(options.find((option) => option.id == value));
      if (setData) {
        setData(value);
        setRadioValue(value);
      }
    }, [value]);
    React.useLayoutEffect(() => {
      if (setRadio) {
        setRadio(radioValueData);
      }
    }, [radioValueData]);
    const { getRootProps, getRadioProps } = useRadioGroup({
      name: name,
      defaultValue: 1,
      onChange: (value) => {
        console.log("hiii", value);
      },
    });

    const group = getRootProps();
    return (
      <>
        <HStack {...group}>
          {options.map(({ id }) => {
            const radio = getRadioProps({ id });

            return (
              <RadioCard key={id} {...radio}>
                {id}
              </RadioCard>
            );
          })}
        </HStack>
        {/**
       <RadioGroup
        onChange={setValue}
        name={name}
        defaultValue={`${radioValueData}`}
        className={className}
      >
        <Stack spacing={4} direction={direction}>
          {options.map((value) => (
            <>
              <Radio {...inputProps} value={`${value.id}`} ref={ref}>
                {value[valueKey]}
              </Radio>
              {filtrable == true && (
                <Button
                  variant="solid"
                  onClick={() => removeFromArray(value.id)}
                  colorScheme={"yellow"}
                  size="xs"
                >
                  Annuler
                </Button>
              )}
            </>
          ))}
        </Stack>
      </RadioGroup>
      
      
       */}
      </>
    );
  }
);
export default RadioProduct;
