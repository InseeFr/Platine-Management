import { useEffect, useRef } from "react";
import { useIntersection } from "react-use";
import { Row } from "./Row.tsx";
import { CircularProgress } from "@mui/material";

type Props = {
  onVisible: () => void;
};

export function VisibilitySpy({ onVisible }: Props) {
  const ref = useRef(null);
  const intersection = useIntersection(ref, {});
  const isIntersecting = intersection?.isIntersecting;
  const onVisibleRef = useRef(onVisible)
  onVisibleRef.current = onVisible
  useEffect(() => {
    if (isIntersecting) {
      onVisibleRef.current();
    }
  }, [isIntersecting]);
  return (
    <Row ref={ref} justifyContent="center" sx={{ gridColumn: "1 / -1" }}>
      <CircularProgress />
    </Row>
  );
}
