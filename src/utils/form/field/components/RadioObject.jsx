import { Radio, Stack, RadioGroup } from "@chakra-ui/react";
import React, { forwardRef, useState } from "react";
import { Button } from "@chakra-ui/button";
import { useDispatch } from "react-redux";

const RadioObject = forwardRef(
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
      masterKey,
      filtrable,
      callback = null,
      ...inputProps
    },
    ref
  ) => {
    const [radioValueData, setRadioValue] = useState(radioValue);
    const [value, setValue] = React.useState(`${radioValueData}`);
    const dispatch = useDispatch();
    React.useEffect(() => {
      if (masterKey) {
        changeValue(options.find((option) => option[masterKey].id == value));
      } else {
        changeValue(options.find((option) => option.id == value));
      }
    }, [value]);
    React.useLayoutEffect(() => {
      if (setRadio) {
        setRadio(radioValueData);
      }
    }, [radioValueData]);
    return (
      <>
        <RadioGroup
          onChange={setValue}
          name={name}
          defaultValue={`${radioValueData}`}
          className={className}
        >
          <Stack spacing={4} direction={direction}>
            {options.map((value) => (
              <>
                {masterKey ? (
                  <>
                    <Radio
                      {...inputProps}
                      value={`${value[masterKey].id}`}
                      ref={ref}
                    >
                      {value[masterKey][valueKey]}
                    </Radio>
                    {filtrable == true && (
                      <Button
                        variant="solid"
                        onClick={() => dispatch(callback(value[masterKey].id))}
                        colorScheme={"yellow"}
                        size="xs"
                      >
                        Annuler
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <Radio {...inputProps} value={`${value.id}`} ref={ref}>
                      {value[valueKey]}
                    </Radio>
                    {filtrable == true && (
                      <Button
                        variant="solid"
                        onClick={() => dispatch(callback(value.id))}
                        colorScheme={"yellow"}
                        size="xs"
                      >
                        Annuler
                      </Button>
                    )}
                  </>
                )}
              </>
            ))}
          </Stack>
        </RadioGroup>
      </>
    );
  }
);
export default RadioObject;
