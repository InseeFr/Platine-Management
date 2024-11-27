import { Box, FormControl, MenuItem } from "@mui/material";
import { Row } from "../Row.tsx";
import React from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select/Select";

export const FilterListBySelector = () => {
  const [selectedOption, setSelectedOption] = React.useState("mostRecent");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedOption(event.target.value);
  };
  return (
    <Row gap={2}>
      <Box typography="titleSmall" color="text.tertiary" component="span">
        Trier par
      </Box>
      <FormControl>
        <Select value={selectedOption} onChange={handleChange} displayEmpty size="small">
          <MenuItem value="mostRecent">plus récent</MenuItem>
        </Select>
      </FormControl>
    </Row>
  );
};
