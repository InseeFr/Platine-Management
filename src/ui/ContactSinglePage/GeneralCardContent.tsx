import Card from "@mui/material/Card";
import { ContactDetailsCardTitle } from "./ContactDetailsCardTitle";
import { ElementType, ReactNode } from "react";
import Stack from "@mui/material/Stack";
import { Button, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type Props = {
  TitleIconComponent: ElementType;
  title: string;
  ButtonStartIcon?: ReactNode;
  buttonLabel?: string;
  CardContent?: ReactNode;
  CardDialog?: ReactNode;
  seeMoreLabel?: string;
  handleClickOpen?: () => void;
  handleNavigate?: () => void;
};

export const GeneralCardContent = ({
  TitleIconComponent,
  title,
  ButtonStartIcon,
  buttonLabel,
  CardContent,
  CardDialog,
  seeMoreLabel,
  handleClickOpen,
  handleNavigate,
}: Props) => {
  return (
    <Card sx={{ px: 6, py: 3 }} elevation={2}>
      <Stack spacing={2}>
        <Stack spacing={3}>
          <ContactDetailsCardTitle IconComponent={TitleIconComponent} title={title} />

          {buttonLabel && (
            <Button
              onClick={handleClickOpen}
              variant="outlined"
              sx={{ typography: "bodyLarge", py: 1, px: 3, width: "fit-content" }}
              startIcon={ButtonStartIcon}
            >
              {buttonLabel}
            </Button>
          )}
          {CardContent && CardContent}
        </Stack>
        {seeMoreLabel && (
          <Button
            onClick={handleNavigate}
            variant="text"
            sx={{
              width: "fit-content",
              typography: "titleSmall",
              textTransform: "none",
              color: "blue.main",
              ".css-9tj150-MuiButton-endIcon > :nth-of-type(1)": {
                fontSize: 12,
              },
            }}
            endIcon={<ArrowForwardIosIcon sx={{}} />}
          >
            {seeMoreLabel}
          </Button>
        )}
      </Stack>
      {CardDialog && CardDialog}
    </Card>
  );
};
