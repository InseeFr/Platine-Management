import { Card } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  content: ReactNode;
};

export const CardInner = ({ content }: Props) => {
  return (
    <Card sx={{ px: 2, py: 2, backgroundColor: "#EBEFF5" }} elevation={0}>
      {content}
    </Card>
  );
};
