import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

type ExpandButtonProps = {
  label: string;
  handleExpandClick: () => void;
};

export const ExpandButton = ({ label, handleExpandClick }: ExpandButtonProps) => {
  const onClick = () => {
    handleExpandClick();
  };
  return (
    <Button
      variant="text"
      onClick={onClick}
      endIcon={<ExpandMoreIcon />}
      sx={{
        typography: "titleSmall",
        textTransform: "none",
        color: "blue.main",
        justifyContent: "space-between",
      }}
    >
      {label}
    </Button>
  );
};
