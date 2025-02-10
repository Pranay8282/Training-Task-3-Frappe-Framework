frappe.pages['practice_page'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Demo',
		single_column: true
	});


	page.set_title('Practice Page');
	// page.add_inner_button('Refresh', function() {
	// 	page.main.html("Refreshed");
	// });

	page.set_indicator('Done', 'green');

	page.add_menu_item('Refresh', function() {
		frappe.msgprint('Refreshed');
	});

	let btn = page.add_button('Click Me', function() {
		frappe.msgprint('Button Clicked');
	});
	let field = page.add_field({
		fieldtype: 'Data',
		label: 'Name',
		fieldname: 'name'
	});
	let field2 = page.add_field({
		label: 'Status',
		fieldtype: "Select",
		fieldname: "status",
		options: 'Open\nClosed',  // Options should be a newline-separated string
		default: 'Open'
	});
	

	$(frappe.render_template('practice_page', {})).appendTo(page.body);
	


}
