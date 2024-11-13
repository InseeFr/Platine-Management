import { Checkbox, InputLabel, ListItemText, MenuItem, Select } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { collectStatus } from "../../constants/collectStatus.ts";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

export const SearchSelectStatus = () => {
  return (
    <FormControl fullWidth variant="filled">
      <InputLabel id={"label-status"}>Statut</InputLabel>
      <Select
        IconComponent={props => <ExpandMoreOutlinedIcon {...props} sx={{ color: "text.primary" }} />}
        labelId={"label-status"}
        multiple
        label={"status"}
        name={"lastEvent"}
        value={[]}
        fullWidth
        id={`select-status`}
        displayEmpty
        disableUnderline
        variant="filled"
      >
        {collectStatus.map(option => {
          return (
            <MenuItem value={option.value} key={option.value}>
              <Checkbox size="small" />
              <ListItemText primary={option.label} />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
