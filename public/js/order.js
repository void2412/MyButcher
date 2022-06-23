const handleValueChange = function() {
	$('.itemQuantity').each(function(){
		var element = $(this)

		if (typeof element.value === 'undefined') {
			element.data('oldVal', 0)
		}
		else{
			element.data('oldVal', element.val())
		}
		element.on("input", function(event){
			if(element.data('oldVal') != element.children('#quantityInput').val()){
				element.data('oldVal', element.val())

				let quantity = parseInt(element.children('#quantityInput').val())
				let unit_price = parseInt($(element.parent().children()[2]).children('.itemPrice').text())
				let discount = parseInt($(element.parent().children()[3]).children('.itemDiscount').text())
				let itemTotal = quantity * (unit_price - discount*unit_price/100)
				$(element.parent().children()[5]).children('.itemTotal').text(itemTotal)
			}
			$('#totalText').text(getTotal())

		})
	})
}

const getTotal = function () {
	let sum=0
	var itemTotals = $('.itemTotal')

	for (const item of itemTotals) {
		sum += parseInt($(item).text())
	}

	return sum
}

handleValueChange()


const handleSubmit=()=>{
	let obj = {}
	let itemObj = {}
	let listItems = []
}

$('.orderForm').on('click','submitBtn', handleSubmit)