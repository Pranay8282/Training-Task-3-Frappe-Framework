frappe.ready(function() {
	// bind events here
	frappe.web_form.after_load=()=>{
		frappe.msgprint('Form Loaded');
	}
})