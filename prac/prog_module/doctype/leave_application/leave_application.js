// Copyright (c) 2025, Sanskar and contributors
// For license information, please see license.txt

frappe.ui.form.on("Leave Application", {

    onload: function(frm) {
        frm.trigger("leave_type");  // Apply conditions on form load
        frm.trigger("total_days");
    },

    leave_type: function(frm) {
        // Show "Attach Medical Certificate" if Leave Type is "Sick Leave"
        frm.toggle_display("medical_certificate", frm.doc.leave_type === "Sick");

       
    },

    total_days: function(frm) {
        frm.toggle_display("manager_approval", frm.doc.total_days > 3);
    }
});

