function properCase(s) {
  if (typeof s !== 'string') return s;
  return s.charAt(0).toUpperCase() + s.substring(1);
}

module.exports = {
  properCase
}