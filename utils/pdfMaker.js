const{format_date} = require('./helpers')

function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}


function getItemRow(item){
	let itemTotal = parseFloat(item.quantity) * (parseFloat(item.unit_price) - parseFloat(item.unit_price) * parseFloat(item.discount)/100)
	itemTotal = roundToTwo(itemTotal)
	let data =[
		{
		  text: item.item.name,
		  border: [false, false, false, true],
		  margin: [0, 5, 0, 5],
		  alignment: 'left',
		},
		{
			text: `$${item.unit_price}`,
		  border: [false, false, false, true],
		  margin: [0, 5, 0, 5],
		  alignment: 'center',
		  fillColor:'#f5f5f5'
		},
		{
			text: `${item.quantity} kg`,
		  border: [false, false, false, true],
		  margin: [0, 5, 0, 5],
		  alignment: 'center',
		},
		{
			text: `${item.discount}%`,
		  border: [false, false, false, true],
		  margin: [0, 5, 0, 5],
		  alignment: 'center',
		},
		{
		  border: [false, false, false, true],
		  text: `$${itemTotal}`,
		  fillColor: '#f5f5f5',
		  alignment: 'right',
		  margin: [0, 5, 0, 5],
		},
	  ]
	return [data, itemTotal]
}

function getDocumentData(data){
	var itemList = []
	var total = 0
	for (const item of data.invoice_items) {
		var itemRowData = getItemRow(item)
		itemList.push(itemRowData[0])
		total += itemRowData[1]
	}
var dd = {
	content: [
	  {
		columns: [
		  {
			text:''
		  },
		  [
			{
			  text: 'Invoice',
			  color: '#333333',
			  width: '*',
			  fontSize: 28,
			  bold: true,
			  alignment: 'right',
			  margin: [0, 0, 0, 15],
			},
			{
			  stack: [
				{
				  columns: [
					{
					  text: 'Invoice No.',
					  color: '#aaaaab',
					  bold: true,
					  width: '*',
					  fontSize: 12,
					  alignment: 'right',
					},
					{
					  text: data.id,
					  bold: true,
					  color: '#333333',
					  fontSize: 12,
					  alignment: 'right',
					  width: 100,
					},
				  ],
				},
				{
				  columns: [
					{
					  text: 'Date Issued',
					  color: '#aaaaab',
					  bold: true,
					  width: '*',
					  fontSize: 12,
					  alignment: 'right',
					},
					{
					  text: format_date(data.createdAt),
					  bold: true,
					  color: '#333333',
					  fontSize: 12,
					  alignment: 'right',
					  width: 100,
					},
				  ],
				},
				{
				  columns: [
					{
					  text: 'Due Date',
					  color: '#aaaaab',
					  bold: true,
					  fontSize: 12,
					  alignment: 'right',
					  width: '*',
					},
					{
					  text: format_date(data.due_date),
					  bold: true,
					  fontSize: 12,
					  alignment: 'right',
					  color: 'green',
					  width: 100,
					},
				  ],
				},
			  ],
			},
		  ],
		],
	  },
	  {
		columns: [
		  {
			text: 'From',
			color: '#aaaaab',
			bold: true,
			fontSize: 14,
			alignment: 'left',
			margin: [0, 20, 0, 5],
		  },
		  {
			text: 'To',
			color: '#aaaaab',
			bold: true,
			fontSize: 14,
			alignment: 'left',
			margin: [0, 20, 0, 5],
		  },
		],
	  },
	  {
		columns: [
		  {
			text: 'My Butcher PTY LTD',
			bold: true,
			color: '#333333',
			alignment: 'left',
		  },
		  {
			text: data.customer_name,
			bold: true,
			color: '#333333',
			alignment: 'left',
		  },
		],
	  },
	  {
		columns: [
		  {
			text: 'Address',
			color: '#aaaaab',
			bold: true,
			margin: [0, 7, 0, 3],
		  },
		  {
			text: 'Address',
			color: '#aaaaab',
			bold: true,
			margin: [0, 7, 0, 3],
		  },
		],
	  },
	  {
		columns: [
		  {
			text: 'Company Address',
		  },
		  {
			text: data.address,
		  },
		],
	  },
	  {
		columns: [
			{
				text:'Phone',
				color: '#aaaaab',
				bold: true,
				margin: [0, 7, 0, 3],
			},
			{
				text:'Phone',
				color: '#aaaaab',
				bold: true,
				margin: [0, 7, 0, 3],
			}
		]
	  },
	  {
		columns: [
			{
				text:'0404 686 109'
			},
			{
				text: data.phone1
			}
		]
	  },
	  {
		columns: [
			{
				text: ''
			},
			{
				text: data.phone2
			}
		]
	  },
	  '\n\n',
	  {
		layout: {
		  defaultBorder: false,
		  hLineWidth: function(i, node) {
			return 1;
		  },
		  vLineWidth: function(i, node) {
			return 1;
		  },
		  hLineColor: function(i, node) {
			if (i === 1 || i === 0) {
			  return '#bfdde8';
			}
			return '#eaeaea';
		  },
		  vLineColor: function(i, node) {
			return '#eaeaea';
		  },
		  hLineStyle: function(i, node) {
			// if (i === 0 || i === node.table.body.length) {
			return null;
			//}
		  },
		  // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
		  paddingLeft: function(i, node) {
			return 10;
		  },
		  paddingRight: function(i, node) {
			return 10;
		  },
		  paddingTop: function(i, node) {
			return 2;
		  },
		  paddingBottom: function(i, node) {
			return 2;
		  },
		  fillColor: function(rowIndex, node, columnIndex) {
			return '#fff';
		  },
		},
		table: {
		  headerRows: 1,
		  widths: ['*', 80,50,50,80],
		  body: [
			[
			  {
				text: 'ITEM DESCRIPTION',
				fillColor: '#eaf2f5',
				border: [false, true, false, true],
				margin: [0, 5, 0, 5],
				textTransform: 'uppercase',
			  },
			  {
				text: 'UNIT PRICE',
				fillColor: '#eaf2f5',
				border: [false, true, false, true],
				margin: [0, 5, 0, 5],
				textTransform: 'uppercase',
				alignment: 'center'
			  },
			  {
				text: 'QTY',
				fillColor: '#eaf2f5',
				border: [false, true, false, true],
				margin: [0, 5, 0, 5],
				textTransform: 'uppercase',
				alignment: 'center'
			  },
			  {
				  text: 'Discount',
				fillColor: '#eaf2f5',
				border: [false, true, false, true],
				margin: [0, 5, 0, 5],
				textTransform: 'uppercase',
				alignment: 'center'
			  },
			  {
				text: 'ITEM TOTAL',
				border: [false, true, false, true],
				alignment: 'right',
				fillColor: '#eaf2f5',
				margin: [0, 5, 0, 5],
				textTransform: 'uppercase',
			  },
			],
			...itemList
		  ],
		},
	  },
	  '\n',
	  '\n\n',
	  {
		layout: {
		  defaultBorder: false,
		  hLineWidth: function(i, node) {
			return 1;
		  },
		  vLineWidth: function(i, node) {
			return 1;
		  },
		  hLineColor: function(i, node) {
			return '#eaeaea';
		  },
		  vLineColor: function(i, node) {
			return '#eaeaea';
		  },
		  hLineStyle: function(i, node) {
			// if (i === 0 || i === node.table.body.length) {
			return null;
			//}
		  },
		  // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
		  paddingLeft: function(i, node) {
			return 10;
		  },
		  paddingRight: function(i, node) {
			return 10;
		  },
		  paddingTop: function(i, node) {
			return 3;
		  },
		  paddingBottom: function(i, node) {
			return 3;
		  },
		  fillColor: function(rowIndex, node, columnIndex) {
			return '#fff';
		  },
		},
		table: {
		  headerRows: 1,
		  widths: ['*', 'auto'],
		  body: [
			[
			  {
				text: 'Total Amount',
				bold: true,
				fontSize: 20,
				alignment: 'right',
				border: [false, false, false, true],
				margin: [0, 5, 0, 5],
			  },
			  {
				text: `$${total}`,
				bold: true,
				fontSize: 20,
				alignment: 'right',
				border: [false, false, false, true],
				fillColor: '#f5f5f5',
				margin: [0, 5, 0, 5],
			  },
			],
		  ],
		},
	  },
	  '\n\n',
	  {
		text: 'NOTES',
		style: 'notesTitle',
	  },
	  {
		text: data.note,
		style: 'notesText',
	  },
	],
	styles: {
	  notesTitle: {
		fontSize: 10,
		bold: true,
		margin: [0, 50, 0, 3],
	  },
	  notesText: {
		fontSize: 10,
	  },
	},
	defaultStyle: {
	  columnGap: 20,
	  //font: 'Quicksand',
	},
  };

  return dd
}



module.exports = getDocumentData