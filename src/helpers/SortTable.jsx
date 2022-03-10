export const sortTable = (array) => {
  const tab = [];
  array?.map((cursus) => {
    tab.push(cursus);
  });
  tab.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });
  return tab;
};
