import { Typography } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import { CardInner } from "./CardInner";
import { GeneralCardContent } from "./GeneralCardContent";

type Props = {};

export const HistoryActionsCard = ({}: Props) => {
  return (
    <GeneralCardContent
      TitleIconComponent={HistoryIcon}
      title={"Historique des actions"}
      CardContent={<CardInner content={<Typography>content</Typography>} />}
      seeMoreLabel="Voir plus d’actions"
      seeMoreContent={<CardInner content={<Typography>autre content</Typography>} />}
    />
  );
};
