import TableRow from "@mui/material/TableRow";
import { columns } from "./ContactSurveysTable";
import TableCell from "@mui/material/TableCell";
import { Row } from "../Row";
import Chip from "@mui/material/Chip";
import { collectStates } from "./CollectStateSelect";
import { CollectStateHistory } from "./CollectStateHistory";
import { APISchemas } from "../../types/api";
import { theme } from "../../theme";
import { useState } from "react";
import { useFetchMutation } from "../../hooks/useFetchQuery";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import IconButton from "@mui/material/IconButton";
import { Link } from "../Link";

type Props = {
  survey: APISchemas["AccreditationDetailDto"];
  onSelectState: () => void;
};
export const ContactSurveysTableRow = ({ survey, onSelectState }: Props) => {
  const [openCollectStateHistory, setOpenCollectStateHistory] =
    useState<APISchemas["AccreditationDetailDto"]>();

  const { mutateAsync } = useFetchMutation("/api/questionings/questioning-events", "post");

  const onSelectCollectState = async (type: string, questioningId?: string) => {
    if (!questioningId) {
      return;
    }

    await mutateAsync({
      query: {
        id: parseInt(questioningId),
      },
      body: {
        questioningId: parseInt(questioningId),
        eventDate: new Date().toISOString(),
        type,
        payload: { "source": "platine-gestion" },
      },
    });
    onSelectState();
  };

  return (
    <TableRow
      hover
      tabIndex={-1}
      key={`row-${survey.partition}-${survey.identificationName}`}
      sx={{ borderBottom: `solid 1px ${theme.palette.text.hint}` }}
    >
      {columns.map(column => {
        return (
          <ContactSurveysTableCell
            key={survey["identificationCode"]}
            survey={survey}
            columnId={column.id}
            openCollectStateHistory={openCollectStateHistory}
            setOpenCollectStateHistory={setOpenCollectStateHistory}
            onSelectCollectState={onSelectCollectState}
          />
        );
      })}
    </TableRow>
  );
};

export const getCollectStateChipColor = (state?: string) => {
  switch (state) {
    case "PND":
    case "PARTIELINT":
      return "error";
    case "VALINT":
    case "VALPAP":
      return "success";
    default:
      return "default";
  }
};

type ContactSurveysTableCellProps = {
  survey: APISchemas["AccreditationDetailDto"];
  columnId: string;
  openCollectStateHistory: APISchemas["AccreditationDetailDto"] | undefined;
  setOpenCollectStateHistory: (survey?: APISchemas["AccreditationDetailDto"]) => void;
  onSelectCollectState: (type: string, questioningId?: string) => void;
};

const ContactSurveysTableCell = ({
  survey,
  columnId,
  openCollectStateHistory,
  setOpenCollectStateHistory,
  onSelectCollectState,
}: ContactSurveysTableCellProps) => {
  const value = survey[columnId as keyof typeof survey];

  if (columnId === "lastEvent") {
    const isCollectStateHistoryVisible =
      survey.questioningId !== undefined && openCollectStateHistory === survey;

    return (
      <TableCell key={`state-${survey.partition}-${survey.identificationName}`} width={"240px"}>
        <Row spacing={1}>
          <Chip
            sx={{
              typography: "titleSmall",
              maxWidth: "220px",
              textOverflow: "ellipsis",
            }}
            label={collectStates.find(state => state.value === value)?.label ?? "Aucun état"}
            onClick={() => setOpenCollectStateHistory(survey)}
            color={getCollectStateChipColor(value as string)}
            onDelete={() => setOpenCollectStateHistory(survey)}
            deleteIcon={<ArrowDropDownIcon />}
          />
          {isCollectStateHistoryVisible && (
            <CollectStateHistory
              onClose={() => setOpenCollectStateHistory(undefined)}
              open={true}
              questioningId={survey.questioningId!}
              surveyName={survey.partition ?? ""}
              onSelect={(value: string) => onSelectCollectState(value, survey.questioningId)}
            />
          )}
        </Row>
      </TableCell>
    );
  }

  if (columnId === "actions") {
    return (
      <TableCell key={`action-${survey.partition}-${survey.identificationName}`} align="center">
        {survey.questioningUrl && (
          <IconButton color="inherit" target="_blank" component={Link} to={survey.questioningUrl}>
            <OpenInNewIcon fontSize="small" />
          </IconButton>
        )}
      </TableCell>
    );
  }

  if (columnId === "main") {
    return <TableCell key={columnId}>{value === true ? "Principal" : "Secondaire"}</TableCell>;
  }

  if (columnId === "partioningClosingDate") {
    return (
      <TableCell key={columnId}>{new Date(Date.parse(value as string)).toLocaleDateString()}</TableCell>
    );
  }

  if (columnId === "surveyUnitId" || columnId === "sourceWording") {
    return (
      <TableCell key={columnId}>
        <Link
          sx={{ cursor: "pointer", "&.MuiLink-root:hover": { color: "primary.main" } }}
          to={columnId === "surveyUnitId" ? `/survey-units/${value}` : `/surveys/${survey.surveyId}`}
          color={"inherit"}
          underline="none"
        >
          {value}
        </Link>
      </TableCell>
    );
  }

  return <TableCell key={columnId}>{value}</TableCell>;
};
