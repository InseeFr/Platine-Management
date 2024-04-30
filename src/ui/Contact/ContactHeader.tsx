import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Row } from "../Row";
import { APISchemas } from "../../types/api.ts";
import { IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";

type Props = {
  contact: Pick<APISchemas["ContactFirstLoginDto"], "firstName" | "lastName" | "identifier">;
};

export const ContactHeader = ({ contact }: Props) => {
  const navigate = useNavigate();
  return (
    <Row spacing={5} px={6} py={2} bgcolor={"white"}>
      <IconButton sx={{ bgcolor: "background.default" }} onClick={() => navigate(-1)}>
        <ArrowBackIosNewIcon sx={{ color: "black.main" }} />
      </IconButton>
      <Row spacing={2}>
        <PersonOutlineOutlinedIcon fontSize="headerSinglePage" />
        <Stack>
          <Typography component={"span"} fontWeight={700} fontSize={"20px"} color={"text.primary"}>
            {`${contact.firstName ?? ""} ${contact?.lastName?.toUpperCase() ?? ""} `}
          </Typography>
          <Typography component={"span"} fontSize={"20px"} fontWeight={600} color={"text.tertiary"}>
            {contact.identifier}
          </Typography>
        </Stack>
      </Row>
    </Row>
  );
};
