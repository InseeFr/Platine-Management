import {
  Box,
  Button,
  Checkbox,
  Divider,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { Row } from "../Row.tsx";

type Props = {
  options: { label: string; value: string }[];
  name: string;
  label: string;
  inputProps: (name: any) => {
    id: any;
    name: any;
    value: any;
    onChange: (e: any) => void;
  };
  onReset: () => void;
  onSubmit: () => void;
};

export const MultipleSearchSelect = ({ options, inputProps, name, label, onReset, onSubmit }: Props) => {
  return (
    <FormControl variant="filled" sx={{ flex: 1 }}>
      <InputLabel id={`label-${name}`}>{label}</InputLabel>
      <Select
        IconComponent={props => <ExpandMoreOutlinedIcon {...props} sx={{ color: "text.primary" }} />}
        labelId={`label-${name}`}
        id={`select-${name}`}
        aria-label={`select ${label}`}
        multiple
        label={label}
        renderValue={(selected: string[]) => (
          <Typography noWrap sx={{ maxWidth: "25vw" }}>
            {selected &&
              selected
                .map(element => options.find(status => status.value === element)?.label)
                .join(", ")}
          </Typography>
        )}
        inputProps={{ ...inputProps(name), "aria-labelledby": `label-${name}` }}
        endAdornment={
          inputProps(name).value.length > 0 && (
            <IconButton sx={{ mr: 2 }} size="small" onClick={onReset}>
              <CloseIcon />
            </IconButton>
          )
        }
        fullWidth
        displayEmpty
        disableUnderline
        variant="filled"
      >
        {options.map(option => {
          return (
            <MenuItem value={option.value} sx={{ p: 0 }} key={option.value}>
              <Stack sx={{ width: "100%" }}>
                <Row sx={{ pr: 4, pl: 2, py: 1 }}>
                  <Checkbox checked={inputProps(name).value.includes(option.value)} size="small" />
                  <ListItemText primary={option.label} />
                </Row>
                <Divider sx={{ margin: "0px !important" }} variant="fullWidth" />
              </Stack>
            </MenuItem>
          );
        })}
        <Box sx={{ m: 2 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ typography: "titleMedium", py: 1.5 }}
            onClick={onSubmit}
          >
            Appliquer
          </Button>
        </Box>
      </Select>
    </FormControl>
  );
};
