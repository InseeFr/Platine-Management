import { Link as MuiLink, type LinkProps } from "@mui/material";
import { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";

type Props = LinkProps & {
  to: string;
};

export const Link = (props: Props) => {
  return <MuiLink component={RouterLink} {...props} />;
};

export const LinkWithForwardRef = forwardRef<HTMLAnchorElement, Props>(function Link(props, ref) {
  return <MuiLink component={RouterLink} ref={ref} {...props} />;
});
