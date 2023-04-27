export const soundEffect = () =>
  JSON.parse(
    window.localStorage.getItem(
      "gameOptions"
    ) || "{}"
  );
