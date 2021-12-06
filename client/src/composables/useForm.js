import React from "react";

const useForm = (initialValue) => {
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e) => {
    const { name, value } = e.target;

    setValue((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleAddChip = (tag) => {
    setValue({ ...value, tags: [...value.tags, tag] }); 
  };

  const handleDeleteChip = (chipToDelete) => {
    setValue({
      ...value,
      tags: value.tags.filter((tag) => tag !== chipToDelete),
    });
  };

  return { value, setValue, onChange, handleAddChip, handleDeleteChip };
};

export default useForm;
