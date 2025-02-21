frappe.pages['my_custom_page'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Prac',
		single_column: true
	});

	let $container = $(wrapper).find('.layout-main-section');
	$container.html(`
        <div class="custom-page-content">
            <h1>My Custom Page</h1>
            <p>This is a sample custom page in Frappe.</p>
            <button class="btn btn-primary" id="show-alert">Click Me</button>
        </div>
    `);

    $container.find('button').on('click', function() {
        frappe.msgprint('Button Clicked!');
    });
}