import { Chip, TableCell, TableRow, Tooltip } from "@mui/material";
import { style } from "../Contact/SearchContactTable.tsx";
import { Link } from "../Link.tsx";
import { collectStatus } from "../../constants/collectStatus.ts";
import { getCollectStateChipColor } from "./SearchQuestioningTable.tsx";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { communicationsList } from "../../constants/communications.ts";

type Props = {
  questioning: {
    questioningId: number;
    campaignId: string;
    surveyUnitIdentificationCode?: string;
    surveyUnitId?: string;
    listContactIdentifiers?: string[];
    lastEvent: string;
    lastCommunication?: string;
    validationDate?: string;
    quality: string;
  };
  stateFilter: string;
};

export const SearchQuestioningTableRow = ({ questioning, stateFilter }: Props) => {
  return (
    <TableRow
      key={questioning.questioningId}
      sx={style.root}
      hover
      component={Link}
      to={`/questionings/${questioning.questioningId}`}
    >
      <TableCell>{questioning.campaignId}</TableCell>

      {questioning.listContactIdentifiers?.length && questioning.listContactIdentifiers?.length > 2 ? (
        <Tooltip
          title={questioning.listContactIdentifiers
            .slice(2)
            .map(contact => `#${contact}`)
            .join(", ")}
          sx={{ maxWidth: "30vw" }}
        >
          <TableCell sx={{ wordBreak: "break-word" }}>
            {`#${questioning.listContactIdentifiers[0]}, #${questioning.listContactIdentifiers[1]}...`}
          </TableCell>
        </Tooltip>
      ) : (
        <TableCell sx={{ wordBreak: "break-word" }}>
          {questioning.listContactIdentifiers?.map(contact => `#${contact}`).join(", ")}
        </TableCell>
      )}
      <TableCell>{questioning.surveyUnitIdentificationCode ?? questioning.surveyUnitId}</TableCell>
      <TableCell>
        {questioning.lastEvent && (
          <Chip
            sx={{
              typography: "titleSmall",
              maxWidth: stateFilter === "recovery" ? "11vw" : "14vw",
              textOverflow: "ellipsis",
            }}
            label={collectStatus.find(state => state.value === questioning.lastEvent)?.label}
            color={getCollectStateChipColor(questioning.lastEvent)}
          />
        )}
      </TableCell>
      <TableCell>
        {questioning.lastCommunication && (
          <Chip
            sx={{
              typography: "titleSmall",
              maxWidth: stateFilter === "recovery" ? "11vw" : "14vw",
              textOverflow: "ellipsis",
            }}
            label={
              communicationsList.find(
                communication => communication.value === questioning.lastCommunication,
              )?.label
            }
          />
        )}
      </TableCell>
      <TableCell>
        {questioning.validationDate
          ? new Date(Date.parse(questioning.validationDate)).toLocaleDateString()
          : "N/A"}
      </TableCell>
      {stateFilter === "recovery" && <TableCell>{questioning.quality}</TableCell>}
      <TableCell align="right">
        <ChevronRightIcon fontSize="navigateIcon" color="primary" />
      </TableCell>
    </TableRow>
  );
};
