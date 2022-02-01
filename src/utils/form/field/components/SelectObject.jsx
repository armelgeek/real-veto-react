import { Select } from '@chakra-ui/react';
import { isFunction } from 'lodash-es';
import React, { forwardRef, useEffect, useState } from 'react';
//import api from "../../../../../utils/api";
const SelectObject = forwardRef(
  (
    {
      name,
      className,
      invalid,
      isFieldArray = true,
      options,
      selectValue,
      valueKey,
      filter,
      setData,
      objectKey,
      index,
      inArray,
      changeValue,
      model,

      debug,
      array,
      ...inputProps
    },
    ref
  ) => {
    const [objectId, setObjectId] = useState(selectValue);
    const handleChange = event => {
      if (!filter || filter.test(event.target.value)) {
        if (isFunction(changeValue)) {
          if (isFieldArray) {
            changeValue(Number(event.target.value, event));
          }
        }
        if (setData) {
          setData(Number(event.target.value));
        }
        setObjectId(Number(event.target.value));
      }
    };
    /*useEffect(() => {
      (async () => {
        await api.get(`http://localhost:8100/api/${model}/${objectId}`).then(
          (data) => {
            inArray.forEach((element) => {
              if (index) {
                array[index][element] = data[element];
              } else {
                array[element] = data[element];
              }
            
            });
            changeValue(array);
          },
          (err) => {
            console.log(err);
          }
        );
      })();
    }, [objectId]);*/
    return (
      <div className={className}>
        <Select
          {...inputProps}
          bg={'gray.200'}
          boxShadow="sm"
          defaultValue={`${selectValue}`}
          //   valueKey={valueKey}
          isRequired
          name={name}
          isInvalid={invalid}
          onChange={handleChange}
          ref={ref}
        >
          <option value="">Selectionner</option>
          {options.map(value => (
            <option defaultChecked={`${selectValue}`} value={`${value.id}`}>
              {valueKey ? value[valueKey] : value}
            </option>
          ))}
        </Select>
      </div>
    );
  }
);
export default SelectObject;
