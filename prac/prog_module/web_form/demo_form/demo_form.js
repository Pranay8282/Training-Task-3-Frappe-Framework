frappe.ready(function() {
	// bind events here

	frappe.web_form.after_load=()=>{
		frappe.web_form.on('dob',(field,value),()=>{
			if(value){
				let dob = new Date(value);
				let today = new Date();
				let age = today.getFullYear() - dob.getFullYear();
				frappe.web_form.set_value('age',[age]);
			}
		})
	}
})