import { Row } from "../Row.tsx";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { forwardRef } from "react";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import { RadioLine } from "./RadioLine";
import { Controller, type UseFormReturn } from "react-hook-form";
import TextField, { TextFieldProps } from "@mui/material/TextField";

type Props = Pick<TextFieldProps, "onChange" | "onBlur" | "name" | "label" | "required" | "sx"> & {
  type?: "radios" | "radiostack" | "switch" | "text";
  error?: string;
  control?: UseFormReturn<any, any, any>["control"];
  labelOutside?: boolean;
  options?: { label: string; value: string }[];
};

export const Field = forwardRef<HTMLElement, Props>((props, ref) => {
  const isControlled = !!props.control;

  if (["radios", "switch", "radiostack"].includes(props.type ?? "") && !props.control) {
    return `You must add 'control' props to use a ${props.type} field`;
  }

  if (isControlled && !props.name) {
    return `A controlled field must have a name`;
  }

  const labelOutside = (props.type && props.type !== "text") || props.labelOutside;

  return (
    <Row gap={3}>
      {labelOutside && (
        <Box sx={{ flex: "none", minWidth: 90 }}>
          <Typography
            component="label"
            id={`label-${props.name}`}
            htmlFor={props.name}
            variant="bodyMedium"
            color="textTertiary"
            sx={{ whiteSpace: "noWrap" }}
          >
            {props.label}
            {props.required && (
              <Typography component="span" color="red" variant="bodyMedium">
                {" *"}
              </Typography>
            )}
          </Typography>
        </Box>
      )}
      <Box sx={{ flex: 1, minWidth: 0, width: "100%" }}>
        {isControlled && (
          <Controller
            name={props.name!}
            control={props.control}
            render={({ field }) => {
              return controlledField(props, field);
            }}
          />
        )}
        {!isControlled && uncontrolledField(props, ref)}
      </Box>
    </Row>
  );
});

export function uncontrolledField(props: Props, ref: any) {
  if (props.labelOutside) {
    return <OutlinedInput fullWidth {...props} error={!!props.error} inputRef={ref} size="small" />;
  }
  return (
    <TextField
      fullWidth
      {...props}
      inputRef={ref}
      error={!!props.error}
      helperText={props.error}
      size="small"
    />
  );
}

const style = {
  root: {
    "& .MuiSvgIcon-root": {
      fontSize: 14,
    },
    ".MuiTypography-root": {
      typography: "bodyMedium",
    },
    ".MuiFormControlLabel-root": {
      gap: 1,
    },
    gap: 3,
  },
};

export function controlledField({ type, name, options }: Props, field: any) {
  if (type === "switch") {
    return <Switch checked={field.value} color="green" {...field} />;
  }
  if (type === "radios") {
    return (
      <RadioGroup
        value={field.value}
        onChange={e => field.onChange(e.target.value)}
        row
        aria-labelledby={`label-${name}`}
        name={name}
        sx={style.root}
      >
        {options?.map(o => (
          <FormControlLabel
            key={o.value}
            value={o.value}
            control={<Radio sx={{ p: 0 }} size="small" />}
            label={o.label}
          />
        ))}
      </RadioGroup>
    );
  }
  if (type === "radiostack") {
    return (
      <RadioGroup
        value={field.value}
        onChange={e => field.onChange(e.target.value)}
        row
        aria-labelledby={`label-${name}`}
        name={name}
      >
        <Stack gap={1}>
          {options?.map(o => <RadioLine value={o.value} key={o.value} label={o.label} />)}
        </Stack>
      </RadioGroup>
    );
  }
  throw new Error("Cannot render controlled field of type " + type);
}
