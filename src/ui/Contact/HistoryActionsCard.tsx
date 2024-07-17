import { Typography } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import { CardInner } from "./CardInner.tsx";
import { GeneralCardContent } from "./GeneralCardContent.tsx";

export const HistoryActionsCard = () => {
  return (
    <GeneralCardContent
      TitleIconComponent={HistoryIcon}
      title={"Historique des actions"}
      CardContent={<CardInner content={<Typography>work in progress</Typography>} />}
      seeMoreLabel="Voir plus d’actions"
      seeMoreContent={<CardInner content={<Typography>autre work in progress</Typography>} />}
    />
  );
};
