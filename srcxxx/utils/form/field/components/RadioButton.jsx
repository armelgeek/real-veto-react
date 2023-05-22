import { Radio, Stack ,RadioGroup} from "@chakra-ui/react";
import React, { forwardRef, useState } from "react";

const RadioButton = forwardRef(
  (
    {
      name,
      className,
      options,
      radioValue,
      valueKey,
      direction,
      filter,
      setData,
      changeValue,
      setRadio,
      ...inputProps
    },
    ref
  ) => {
    const [radioValueData,setRadioValue]=useState(radioValue);
    const [value, setValue] = React.useState(`${radioValueData}`);
    React.useLayoutEffect(()=>{
      changeValue(value);
      if(setData){
        setData(value);
        setRadioValue(value);
      }
    },[value])
    React.useLayoutEffect(()=>{
      if(setRadio){
        setRadio(radioValueData);
      }
    },[radioValueData])
    return (
      <RadioGroup 
      onChange={setValue}
       defaultValue={`${radioValueData}`} className={className}>
        <Stack spacing={4} direction={direction}>
          {options.map((value) => (
            <>
              <Radio
                name={`${value.id}`}
                isChecked={value.id == radioValueData ? true : false}
                {...inputProps}
                value={`${value.id}`}
                ref={ref}
              >
                {value[valueKey]}
              </Radio>
            </>
          ))}
        </Stack>
      </RadioGroup>
    );
  }
);
export default RadioButton;
