import Typography from "@mui/material/Typography";
import ReactMarkdown from "react-markdown";

interface TypoMarkdownProps {
  children?: string;
}

export function TypographyWithMarkdown(props: TypoMarkdownProps) {
  const { children, ...rest } = props;
  return (
    <Typography {...rest}>
      <ReactMarkdown>{children}</ReactMarkdown>
    </Typography>
  );
}
