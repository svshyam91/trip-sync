const clamp = (value: number) => Math.min(255, Math.max(0, value));

const hexToRgb = (hex: string) => {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((char) => char + char)
          .join("")
      : clean;

  const value = Number.parseInt(full, 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255
  };
};

export const mixColor = (hex: string, amount: number) => {
  const { r, g, b } = hexToRgb(hex);

  const next = {
    r: clamp(r + amount),
    g: clamp(g + amount),
    b: clamp(b + amount)
  };

  const toHex = (value: number) => value.toString(16).padStart(2, "0");

  return `#${toHex(next.r)}${toHex(next.g)}${toHex(next.b)}`;
};
