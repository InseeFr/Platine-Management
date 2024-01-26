import { Typography } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import { CardInner } from "./CardInner";
import { GeneralCardContent } from "./GeneralCardContent";
import { useNavigate } from "react-router-dom";

type Props = {};

export const HistoryActions = ({}: Props) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <GeneralCardContent
      TitleIconComponent={HistoryIcon}
      title={"Historique des actions"}
      CardContent={<CardInner content={<Typography>content</Typography>} />}
      seeMoreLabel="Voir plus d’actions"
      handleNavigate={handleNavigate}
    />
  );
};
