import { FormControl, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { Row } from "../ui/Row";
import React from "react";

export const FilterListBySelector = () => {
  const [selectedOption, setSelectedOption] = React.useState("mostRecent");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedOption(event.target.value);
  };
  return (
    <Row gap={2}>
      <Typography
        variant="titleSmall"
        sx={{
          fontWeight: 400,
          color: "text.tertiary",
        }}
      >
        Trier par
      </Typography>
      <FormControl sx={{ mr: 4 }}>
        <Select type="filter" value={selectedOption} onChange={handleChange} displayEmpty>
          <MenuItem value="mostRecent">plus récent</MenuItem>
        </Select>
      </FormControl>
    </Row>
  );
};
