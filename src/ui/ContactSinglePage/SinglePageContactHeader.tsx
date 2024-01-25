import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { HeaderInformations } from "../SinglePageHeader/HeaderInformations";
import { Row } from "../Row";
import { GoBackButton } from "../SinglePageHeader/GoBackButton";

type Props = {
  firstname: string;
  lastname: string;
  identifier: string;
};

export const SinglePageContactHeader = ({ firstname, lastname, identifier }: Props) => {
  return (
    <Row spacing={5} px={6} py={2} bgcolor={"white"}>
      <GoBackButton />
      <HeaderInformations
        IconComponent={PersonOutlineOutlinedIcon}
        label={`${firstname} ${lastname.toUpperCase()} `}
        identifier={identifier}
      />
    </Row>
  );
};
