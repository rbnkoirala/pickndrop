frappe.pages['pickup-list'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Ready to Pickup Lists',
		single_column: true
	});

	// Create a table
	var table = $('<table>').addClass('min-w-full').appendTo(page.main);

	// Add table headers
	var thead = $('<thead>').appendTo(table);
	var headerRow = $('<tr>').appendTo(thead);
	$('<th>').addClass('py-2 px-2 bg-gray-100 border').text('SN').appendTo(headerRow);
	$('<th>').addClass('py-2 px-2 bg-gray-100 border').text('Vendor').appendTo(headerRow);
	$('<th>').addClass('py-2 px-2 bg-gray-100 border').text('List Name').appendTo(headerRow);
	$('<th>').addClass('py-2 px-2 bg-gray-100 border').text('Created').appendTo(headerRow);
	$('<th>').addClass('py-2 px-2 bg-gray-100 border').text('Last Updated').appendTo(headerRow);
	$('<th>').addClass('py-2 px-2 bg-gray-100 border').text('Pickup Time').appendTo(headerRow);
	$('<th>').addClass('py-2 px-2 bg-gray-100 border').text('Pickup Address').appendTo(headerRow);
	$('<th>').addClass('py-2 px-2 bg-gray-100 border').text('Contact Person').appendTo(headerRow);
	$('<th>').addClass('py-2 px-2 bg-gray-100 border').text('Phone').appendTo(headerRow);
	$('<th>').addClass('py-2 px-2 bg-gray-100 border').text('Number of orders').appendTo(headerRow);
	$('<th>').addClass('py-2 px-2 bg-gray-100 border').text('Action').appendTo(headerRow);

	// Add new data row
	var tbody = $('<tbody>').appendTo(table); // Define tbody and append it to the table
	var newRow = $('<tr>').appendTo(tbody);
	$('<td>').addClass('py-2 px-2 border').text('1').appendTo(newRow);
	$('<td>').addClass('py-2 px-2 border').text('Flora beauty solution').appendTo(newRow);
	$('<td>').addClass('py-2 px-2 border').text('Flora beauty solution orders for 2023-11-17').appendTo(newRow);
	$('<td>').addClass('py-2 px-2 border').text('2023-11-17 13:05:19').appendTo(newRow);
	$('<td>').addClass('py-2 px-2 border').text('2023-11-17 13:06:16').appendTo(newRow);
	$('<td>').addClass('py-2 px-2 border').text('10AM TO 12AM').appendTo(newRow);
	$('<td>').addClass('py-2 px-2 border').text('gaurighat,kathmandu').appendTo(newRow);
	$('<td>').addClass('py-2 px-2 border').text('Flora beauty solution').appendTo(newRow);
	$('<td>').addClass('py-2 px-2 border').text('9746470599').appendTo(newRow);
	$('<td>').addClass('py-2 px-2 border').text('1').appendTo(newRow);

	
	var viewButton = $('<button>').addClass('btn btn-primary btn-sm').text('Order Details');
	$('<td>').addClass('py-2 px-2 border').append(viewButton).appendTo(newRow);

	$('div#page-pickup-list th, div#page-pickup-list td, div#page-pickup-list button').css({
		'font-size': '12px',

	});

	// Wrap the table inside a responsive container
	var tableContainer = $('<div>').addClass('table-responsive').appendTo(page.main);
	tableContainer.append(table);
}
