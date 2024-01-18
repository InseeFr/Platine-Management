import { Box, CardActionArea, CardContent, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailIcon from "@mui/icons-material/Email";
import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined";
import { Link } from "react-router-dom";

type ContactCardProps = {
  identifier: string;
  firstname: string;
  lastname: string;
  cityName: string;
  phone: string;
  email: string;
  functionContact: string;
};

export const ContactCard = ({
  identifier,
  firstname,
  lastname,
  cityName,
  phone,
  functionContact,
  email,
}: ContactCardProps) => {
  return (
    <Card sx={{ width: 319, minHeight: 250, margin: "5px" }}>
      <CardActionArea component={Link} to={`/contact/${identifier}`}>
        <CardContent>
          <Typography
            sx={{ fontSize: 16, fontWeight: 600 }}
            color="#797676"
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-end"}
            gutterBottom
          >
            #{identifier}
          </Typography>

          <Box display={"flex"} gap={"8px"} alignItems={"center"}>
            <PersonOutlineOutlinedIcon />
            <Typography
              sx={{
                fontSize: 22,
                fontWeight: 600,
                lineHeight: "28px",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >{`${firstname} ${lastname}`}</Typography>
          </Box>

          <Stack spacing={"4px"} margin={"20px 0"}>
            <Box display={"flex"} gap={"18px"} alignItems={"flex-end"}>
              <LocationOnIcon fontSize="small" />
              <Typography sx={{ fontSize: 14, fontWeight: 600 }} color="#3B4758">
                {cityName}
              </Typography>
            </Box>
            <Box display={"flex"} gap={"15px"} alignItems={"flex-end"}>
              <LocalPhoneOutlinedIcon fontSize="small" />
              <Typography sx={{ fontSize: 14, fontWeight: 600 }} color="#3B4758">
                {phone}
              </Typography>
            </Box>
            <Box display={"flex"} gap={"15px"} alignItems={"flex-end"}>
              <EmailIcon fontSize="small" />
              <Typography sx={{ fontSize: 14, fontWeight: 600 }} color="#3B4758">
                {email}
              </Typography>
            </Box>
            <Box display={"flex"} gap={"15px"} alignItems={"flex-end"}>
              <DesktopWindowsOutlinedIcon fontSize="small" />
              <Typography sx={{ fontSize: 14, fontWeight: 600 }} color="#3B4758">
                {functionContact}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
