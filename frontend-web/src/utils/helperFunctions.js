export function calculateNumberOfPages (count) {
  return Array.from(Array(Math.ceil(parseInt(count, 10)/10)).keys());
};
