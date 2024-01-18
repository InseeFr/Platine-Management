import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React from "react";
import { theme } from "../theme";

type FilterListToggleButtonProps = {
  firstOption: string;
  secondOption: string;
  handleChange: (selectedOption: string) => void;
};

export const FilterListToggleButton = ({
  firstOption,
  secondOption,
  handleChange,
}: FilterListToggleButtonProps) => {
  const [selectedOption, setSelectedOption] = React.useState(firstOption);

  const handleChangeSelection = (
    _event: React.MouseEvent<HTMLElement>,
    newSelectedOption: string | null,
  ) => {
    newSelectedOption && (setSelectedOption(newSelectedOption), handleChange(newSelectedOption));
  };

  return (
    <ToggleButtonGroup
      sx={{
        ".Mui-selected": {
          borderRadius: "24px !important",
          backgroundColor: `${theme.palette.inseePurple} !important`,
          color: "white !important",
        },
      }}
      size="small"
      value={selectedOption}
      exclusive
      onChange={handleChangeSelection}
    >
      <ToggleButton
        sx={{
          textTransform: "none",
          fontSize: "14px",
          fontWeight: 400,
          lineHeight: "20px",
          borderRadius: "24px",
          borderRightWidth: 0,
        }}
        value={firstOption}
      >
        {firstOption}
      </ToggleButton>
      <ToggleButton
        sx={{
          textTransform: "none",
          fontSize: "14px",
          fontWeight: 400,
          lineHeight: "20px",
          borderRadius: "24px",
        }}
        value={secondOption}
      >
        {secondOption}
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
