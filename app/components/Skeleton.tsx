import { styled } from "styled-system/jsx";

const Skeleton = styled("div", {
  base: {
    borderRadius: "md",
    bgColor: "grey.light",
    height: "100%",
    width: "100%",
    animation: "pulse",
  },
});

export default Skeleton;
