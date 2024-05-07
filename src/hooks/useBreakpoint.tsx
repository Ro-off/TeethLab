import { useMediaQuery } from "react-responsive";
// import theme from "../../tailwind.config"; // Your tailwind config
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
const fullConfig = resolveConfig(tailwindConfig);

const breakpoints = fullConfig.theme.screens;

// type BreakpointKey = keyof typeof breakpoints;

export function useBreakpoint<K extends keyof typeof breakpoints & string>(
  breakpointKey: K
) {
  const bool = useMediaQuery({
    query: `(min-width: ${breakpoints[breakpointKey]})`,
  });
  const capitalizedKey =
    breakpointKey.toString()[0].toUpperCase() +
    breakpointKey.toString().substring(1);
  type Key = `is${Capitalize<K>}`;
  return {
    [`is${capitalizedKey}`]: bool,
  } as Record<Key, boolean>;
}
