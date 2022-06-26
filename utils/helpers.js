module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    try {
      return date.toLocaleDateString();
    } catch (err) {
      return "Not Specified Date";
    }
  },
  now: () => {
    var d = new Date();

    var datestring =
      d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

    return datestring;
  },
};
