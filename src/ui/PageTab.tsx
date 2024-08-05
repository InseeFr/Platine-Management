import Tab, { TabProps } from "@mui/material/Tab";

type Props = {
  label: string;
} & TabProps;

export const PageTab = ({ label, ...props }: Props) => {
  return (
    <Tab
      label={label}
      sx={{
        paddingX: 4,
        paddingY: 2,
        typography: "titleSmall",
        textTransform: "none",
      }}
      {...props}
    />
  );
};
