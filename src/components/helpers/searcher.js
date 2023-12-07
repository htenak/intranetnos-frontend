export const searcher = (rows, text) => {
  return (
    rows.filter((row) =>
      Object.values(row).some((value) =>
        value?.toString().toLowerCase().includes(text.toLowerCase())
      )
    ) || rows
  );
};
