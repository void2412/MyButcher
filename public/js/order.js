function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

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

				let quantity = parseFloat(element.children('#quantityInput').val())
				let unit_price = parseFloat($(element.parent().children()[2]).children('.itemPrice').text())
				let discount = parseFloat($(element.parent().children()[3]).children('.itemDiscount').text())
				let itemTotal = quantity * (unit_price - discount*unit_price/100)
				itemTotal=roundToTwo(itemTotal)
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
		sum += parseFloat($(item).text())
	}
	sum = roundToTwo(sum)
	return sum
}

handleValueChange()


const handleSubmit= async (event)=>{
	event.preventDefault()
	let listItems = []
	let iterator = $('.itemRow')
	for (const item of iterator){
		let itemObj ={
			id: parseInt($(item).attr('item-id')),
			quantity: parseFloat($(item).children('.itemQuantity').children('#quantityInput').val()),
		}
		
		if(itemObj.quantity >0){
			listItems.push(itemObj)
		}
	}

	if (listItems.length == 0){
		return
	}

	let obj = {
		due_date: $('#dueDateInput').val(),
		note: $('#invoiceNoteInput').val(),
		invoice_items: listItems
	}

	const response = await fetch("/api/orders",{
		method: "POST",
		body: JSON.stringify(obj),
		headers: { "Content-Type": "application/json" },
	})

	if (response.ok){
		let data = await response.json()
		document.location.replace(`/invoice/${data.id}`)
	}
	else{
		$('#modalLabel').text('Error')
		$('#modalBody').text('Error while trying to save the order! Please try again.')
		$('#launchModal').click()
	}
}

$('.orderForm').submit(handleSubmit)