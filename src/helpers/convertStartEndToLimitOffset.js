export const convertStartEndToLimitOffset = (start, end) => {
      const limit = end - start;
      const offset = start;
      return { limit, offset };
}