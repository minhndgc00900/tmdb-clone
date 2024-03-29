export const isEmptyPagination = (pagination: object) => {
  return Object.entries(pagination).length === 0;
};

export const hyphenToUpper = (str: string) => {
  const upperWord = str
    .split('-')
    .map(function capitalize(part) {
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(' ');

  return upperWord;
};

export const padToTwoDigits = (num: number) => {
  return num.toString().padStart(1, '0');
};

export const toHoursAndMinutes = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${padToTwoDigits(hours)}h${padToTwoDigits(minutes)}`;
};
