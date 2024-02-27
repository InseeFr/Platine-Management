import Card from "@mui/material/Card";
import { CardtitleWithIcon } from "../CardtitleWithIcon.tsx";
import { ElementType, ReactNode, useState } from "react";
import Stack from "@mui/material/Stack";
import { Box, Button } from "@mui/material";
import { ExpandButton } from "../ExpandButton";

type Props = {
  TitleIconComponent: ElementType;
  title: string;
  ButtonStartIcon?: ReactNode;
  buttonLabel?: string;
  CardContent?: ReactNode;
  CardDialog?: ReactNode;
  seeMoreLabel?: string;
  seeMoreContent?: ReactNode;
  handleClickOpen?: () => void;
};

export const GeneralCardContent = ({
  TitleIconComponent,
  title,
  ButtonStartIcon,
  buttonLabel,
  CardContent,
  CardDialog,
  seeMoreLabel,
  seeMoreContent,
  handleClickOpen,
}: Props) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ px: 6, py: 3, width: "100%" }} elevation={2}>
      <Stack spacing={2}>
        <Stack spacing={3}>
          <CardtitleWithIcon IconComponent={TitleIconComponent} title={title} />

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
          {CardContent}
        </Stack>
        {seeMoreLabel && (
          <Box width={"fit-content"}>
            <ExpandButton label={seeMoreLabel} handleExpandClick={handleExpandClick} />
          </Box>
        )}
        {expanded && seeMoreContent}
      </Stack>
      {CardDialog}
    </Card>
  );
};
