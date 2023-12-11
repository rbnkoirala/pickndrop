frappe.pages['delivery-person-login'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Delivery Person Login',
		single_column: true
	});

	// Create a container div for the table
	var container = $('<div>').addClass('table-responsive').appendTo(page.main);

	// Add search textbox
	var searchBox = $('<input>').attr('type', 'text').addClass('form-control input-with-feedback mb-3').attr('placeholder', 'Search Delivery Person').css('margin', '10px 0px 10px 0px');
	searchBox.appendTo(container);
	// Create the table
	var table = $('<table id="">').addClass('table table-bordered table-striped').appendTo(container);

	// Add table headers
	var thead = $('<thead>').appendTo(table);
	var headerRow = $('<tr>').appendTo(thead);
	$('<th>').text('SN').appendTo(headerRow);
	$('<th>').text('ID').appendTo(headerRow);
	$('<th>').text('Delivery Person').appendTo(headerRow);
	$('<th>').text('Username').appendTo(headerRow);
	$('<th>').text('Last Login').appendTo(headerRow);
	$('<th>').attr('colspan', '2').text('Action').addClass('text-center').appendTo(headerRow);

	// Add new data rows
	var tbody = $('<tbody>').appendTo(table);
	for (var i = 1; i <= 10; i++) {
		var newRow = $('<tr>').appendTo(tbody);
		$('<td>').text(i).appendTo(newRow);
		$('<td>').text('Delivery Person ID').appendTo(newRow);
		$('<td>').text('Delivery Person ' + i).appendTo(newRow);
		$('<td>').text('Username ' + i).appendTo(newRow);
		$('<td>').text('2023-11-17 11:30 AM').appendTo(newRow);

		var resetButton = $('<button>').addClass('btn btn-primary').text('Reset');
		$('<td>').addClass('button-cell text-center').append(resetButton).appendTo(newRow);

		var resetSmsButton = $('<button>').addClass('btn btn-primary').text('Reset Via SMS');
		$('<td>').addClass('button-cell text-center').append(resetSmsButton).appendTo(newRow);


		resetButton.click(function() {
			
			var deliveryPersonName = $(this).closest('tr').find('td:nth-child(3)').text();
			frappe.confirm('Do you want to reset the password?', function() {			
				var password = generatePassword(); 
				var message = 'Dear ' + deliveryPersonName + ', your auto-generated password is: ' + password;

				frappe.msgprint(message, 'New Generated Password', function() {
					password = "";
					frappe.msgprint({
						message: message,
						title: 'Password generated successfully'
					});
				});
			});
			
		});


		resetSmsButton.click(function() {
			
			var deliveryPersonName = $(this).closest('tr').find('td:nth-child(3)').text();
			var username = $(this).closest('tr').find('td:nth-child(4)').text();
			frappe.confirm('Do you want to reset the password?', function() {			
				var password = generatePassword(); 
				var message = 'Reset password is send to ' + username + ' via SMS.';

				frappe.msgprint(message, 'Passowrd Sended Sucussfully', function() {
					password = "";
					frappe.msgprint({
						message: message,
						title: 'Password generated successfully'
					});
				});
			});
			
		});

	}

	// Add sorting functionality
	var sortAscending = true; // Flag to track the sorting order
	$('div#page-delivery-person-login th').css('cursor', 'pointer'); // Change cursor to hand
	$('div#page-delivery-person-login th').click(function() {
		var columnIndex = $(this).index();
		sortTable(columnIndex);
	});


	function sortTable(columnIndex) {
		var rows = tbody.find('tr').get();

		rows.sort(function(a, b) {
			var aValue = $(a).children('td').eq(columnIndex).text();
			var bValue = $(b).children('td').eq(columnIndex).text();

			if (columnIndex === 0) {
				// Sort by SN column as numeric
				return sortAscending ? parseInt(aValue) - parseInt(bValue) : parseInt(bValue) - parseInt(aValue);
			} else {
				// Sort by other columns as string
				return sortAscending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
			}
		});

		$.each(rows, function(index, row) {
			tbody.append(row);
		});

		sortAscending = !sortAscending; // Toggle the sorting order
	}

	// Handle search functionality
	searchBox.on('input', function() {
		var searchText = $(this).val().toLowerCase();

		tbody.find('tr').each(function() {
			var rowText = $(this).text().toLowerCase();

			if (rowText.includes(searchText)) {
				$(this).show();
			} else {
				$(this).hide();
			}
		});
	});

	if (window.innerWidth <= 768) {
		$('div#page-delivery-person-login th:nth-child(2), div#page-delivery-person-login th:nth-child(5)').css('display', 'none');
		$('div#page-delivery-person-login td:nth-child(2), div#page-delivery-person-login td:nth-child(5)').css('display', 'none');
		$('div#page-delivery-person-login th, div#page-delivery-person-login td, div#page-delivery-person-login button').css('font-size', 'var(--text-xs)');
	}
	else
	{
		$('div#page-delivery-person-login th, div#page-delivery-person-login td, div#page-delivery-person-login button').css('font-size', 'var(--text-base)');
		
}
	}
	

function generatePassword() {
	var length = 8;
	var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	var password = "";

	for (var i = 0; i < length; i++) {
		var randomIndex = Math.floor(Math.random() * charset.length);
		password += charset.charAt(randomIndex);
	}

	return password;
}
