import {
  defineConfig,
  defineKeyframes,
  defineTextStyles,
  defineTokens,
  defineUtility,
} from "@pandacss/dev";

const tokens = defineTokens({
  colors: {
    black: {
      value: "hsla(237, 100%, 4%, 1)",
    },
    white: {
      value: "hsla(0, 0%, 100%, 1)",
    },
    purple: {
      light: { value: "hsla(242, 100%, 82%, 1)" },
      base: { value: "hsla(242, 48%, 58%, 1)" },
    },
    red: {
      light: {
        value: "hsla(0, 100%, 80%, 1)",
      },
      base: {
        value: "hsla(0, 78%, 63%, 1)",
      },
    },
    grey: {
      vDark: {
        value: "hsla(235, 16%, 15%, 1)",
      },
      dark: {
        value: "hsla(235, 12%, 19%, 1)",
      },
      medium: {
        value: "hsla(216, 15%, 57%, 1)",
      },
      light: {
        value: "hsla(220, 69%, 97%, 1)",
      },
    },
    lines: {
      dark: {
        value: "hsla(235, 12%, 27%, 1)",
      },
      light: {
        value: "hsla(221, 69%, 94%, 1)",
      },
    },
  },
});

const textStyles = defineTextStyles({
  headingXL: {
    value: {
      fontWeight: 700,
      fontSize: 24,
      lineHeight: "30px",
    },
  },
  headingL: {
    value: {
      fontWeight: 700,
      fontSize: 18,
      lineHeight: "23px",
    },
  },
  headingM: {
    value: {
      fontWeight: 700,
      fontSize: 15,
      lineHeight: "19px",
    },
  },
  headingS: {
    value: {
      fontWeight: 700,
      fontSize: 12,
      lineHeight: "15px",
      letterSpacing: "2.4px",
    },
  },
  bodyL: {
    value: {
      fontWeight: 500,
      fontSize: 13,
      lineHeight: "23px",
    },
  },
  bodyM: {
    value: {
      fontWeight: 700,
      fontSize: 12,
      lineHeight: "15px",
    },
  },
});

const keyframes = defineKeyframes({
  overlayShow: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  overlayHide: {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },
  contentShow: {
    from: { opacity: 0, transform: "scale(0.96)" },
    to: { opacity: 1, transform: "scale(1)" },
  },
  contentHide: {
    from: { opacity: 1, transform: "scale(1)" },
    to: { opacity: 0, transform: "scale(0.96)" },
  },
  scaleIn: {
    from: { opacity: 0, transform: "scale(0)" },
    to: { opacity: 1, transform: "scale(1)" },
  },
  scaleOut: {
    from: { opacity: 1, transform: "scale(1)" },
    to: { opacity: 0, transform: "scale(0)" },
  },
});

const backgroundColorTransparentize = defineUtility({
  shorthand: ["bgct", "bgt"],
  property: "backgroundColor",
  className: "transparentize_bgc",
  transform: (value, { token }) => {
    const lastIndex = value?.lastIndexOf("/");
    if (!lastIndex) {
      return {};
    }
    if (typeof value?.substring !== "function") {
      return {};
    }
    const color = value?.substring(0, lastIndex);
    if (!color) {
      return {};
    }
    const amount = value.split("/").at(-1);
    const colorValue = token(`colors.${color}`);
    const opacityValue = parseInt(token(`opacity.${amount}`) ?? "");
    let amountValue: string;
    if (isNaN(opacityValue)) {
      amountValue = `${amount}%`;
    } else {
      amountValue = (opacityValue * 100).toString();
    }

    return {
      backgroundColor: `color-mix(in srgb, transparent ${amountValue}, ${colorValue})`,
    };
  },
});

export default defineConfig({
  outExtension: "js",
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    "./app/root.tsx",
    "./app/routes/**/*.{ts,tsx,js,jsx}",
    "./app/components/**/*.{ts,tsx,js,jsx}",
  ],

  // Files to exclude
  exclude: [],

  globalCss: {
    extend: {
      body: {
        fontFamily: "Plus Jakarta Sans Variable, sans-serif",
      },
    },
  },

  utilities: {
    backgroundColorTransparentize,
  },

  // Useful for theme customization
  theme: {
    extend: { tokens, textStyles, keyframes },
  },

  outdir: "styled-system",
  jsxFramework: "react",
});
