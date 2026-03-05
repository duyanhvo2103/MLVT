export const smartCap = (s: string): string => {
    const looksLikeWord =
      s.length >= 4 && /[aeiouy]/i.test(s) && s === s.toLowerCase();
  
    return looksLikeWord
      ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
      : s.toUpperCase();
  };
  