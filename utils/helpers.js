module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
	try{
		return date.toLocaleDateString()
		
	}
	catch(err){
		return 'Not Specified'
	}
  },
};
