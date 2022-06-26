function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

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
  getItemTotal: (price, quantity, discount)=>{
	let itemTotal = parseFloat(quantity) * (parseFloat(price) - parseFloat(price) * parseFloat(discount)/100)
	itemTotal = roundToTwo(itemTotal)
	return itemTotal
  }
};
