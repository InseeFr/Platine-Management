import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Row } from "../ui/Row";
import React from "react";

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
        <Select value={selectedOption} onChange={handleChange} displayEmpty>
          <MenuItem value="mostRecent">plus récent</MenuItem>
        </Select>
      </FormControl>
    </Row>
  );
};
