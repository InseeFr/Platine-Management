import Tab, { TabProps } from "@mui/material/Tab";

type Props = {
  label: string;
} & TabProps;

export const ContactTab = ({ label, ...props }: Props) => {
  return (
    <Tab
      label={label}
      sx={{
        paddingX: 6,
        paddingY: 3,
        typography: "titleSmall",
        letterSpacing: 0.4,
      }}
      {...props}
    />
  );
};
