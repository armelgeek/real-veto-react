import { Input } from "@chakra-ui/input";
import React, { forwardRef, useCallback, useEffect, useState } from "react";
import ReactTags from "react-tag-autocomplete";
import "../styles/tags.css";
const TagInput = forwardRef(
  (
    {
      icon,
      className,
      filter,
      setData,
      tags,
      options,
      changeValue,
      invalid,
      ...inputProps
    },
    ref
  ) => {
    const [changed, setChanged] = useState(false);
    const [tagsData, setTagsData] = useState(tags ? tags : []);

    const onDelete = useCallback(
      (tagIndex) => {
        setTagsData(tagsData.filter((_, i) => i !== tagIndex));
        setChanged(true);
      },
      [tagsData]
    );
    useEffect(() => {
      if (changed) changeValue(tagsData);
      if (setData) {
        setData(tagsData);
      }
      setChanged(false);
    }, [changed]);

    const onAddition = useCallback(
      (newTag) => {
        setTagsData([...tagsData, newTag]);
        setChanged(true);
      },
      [tagsData]
    );

    return (
      <div className={className}>
        {icon && <i className={`fa fa-${icon}`} />}
        <ReactTags
          as={Input}
          ref={ref}
          tags={tagsData}
          suggestions={options}
          onDelete={onDelete}
          onAddition={onAddition}
        />
      </div>
    );
  }
);
export default TagInput;
