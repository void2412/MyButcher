const printBtn = document.querySelector('#printBtn')
const invoiceIdElement = document.querySelector('#invoiceId')
const invoiceId = parseInt(invoiceIdElement.getAttribute('data-id'))
const downloadBtn = document.querySelector('#downloadBtn')

async function sendPostData(){
	var response = await fetch(`/invoice/pdf/${invoiceId}`,{
		method: 'POST'
	})

	if(response.ok){
		let data = await response.json()
		return data
	}
	else{
		return false
	}
}
const handlePrintButton= async ()=>{
	var data = await sendPostData()
	if(data){
		pdfMake.createPdf(data).open();
	}
}

const handleDownloadButton=async ()=>{
	var data = await sendPostData()
	if(data){
		pdfMake.createPdf(data).download(`Invoice_${invoiceId}.pdf`);
	}
}

printBtn.addEventListener('click', handlePrintButton)
downloadBtn.addEventListener('click', handleDownloadButton)