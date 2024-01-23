import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton/ToggleButton";

type FilterListToggleButtonProps = {
  options: string[];
  handleChange: (selectedOption: string) => void;
};

export const FilterListToggleButton = ({ options, handleChange }: FilterListToggleButtonProps) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChangeSelection = (
    _event: React.MouseEvent<HTMLElement>,
    newSelectedOption: string | null,
  ) => {
    newSelectedOption && (setSelectedOption(newSelectedOption), handleChange(newSelectedOption));
  };

  return (
    <ToggleButtonGroup value={selectedOption} exclusive onChange={handleChangeSelection}>
      {options.map(option => (
        <ToggleButton
          key={option}
          sx={{
            typography: "bodyMedium",
            textTransform: "none",
            fontWeight: 400,
            borderRadius: "24px",
            borderRightWidth: 0,
          }}
          value={option}
        >
          {option}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
