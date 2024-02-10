import { cva } from "styled-system/css";
import { styled } from "styled-system/jsx";

export const buttonStyle = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "3xl",
    minWidth: {
      md: "164px",
    },
    cursor: {
      base: "pointer",
      _disabled: "not-allowed",
    },
    px: "18px",
    transition: "colors",
  },
  variants: {
    size: {
      large: {
        height: 12,
        textStyle: "headingM",
      },
      small: {
        height: 10,
        fontSize: "13px",
        fontWeight: 700,
        lineHeight: "23px",
      },
    },
    variant: {
      primary: {
        color: "white",
        bgColor: {
          base: "purple.base",
          _hover: "purple.light",
          _disabled: "purple.light",
        },
      },
      secondary: {
        color: "purple.base",
        bgct: {
          base: "purple.base/90",
          _hover: "purple.base/75",
          _dark: {
            base: "white",
            _hover: "white",
          },
        },
      },
      destructive: {
        color: "white",
        bgColor: {
          base: "red.base",
          _hover: "red.light",
          _disabled: "red.light",
        },
      },
    },
  },
  defaultVariants: {
    size: "large",
    variant: "primary",
  },
});

const Button = styled("button", buttonStyle);

export default Button;
