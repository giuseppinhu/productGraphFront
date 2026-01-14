export const getDate = (date: string) => {
  const dataJs = new Date(date).toLocaleDateString();
  return dataJs;
};
