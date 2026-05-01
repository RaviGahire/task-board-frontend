
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const formatForInput = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);

  return date.toISOString().split('T')[0];
};