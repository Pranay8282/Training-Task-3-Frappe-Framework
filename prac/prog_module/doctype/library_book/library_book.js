// Copyright (c) 2025, Sanskar and contributors
// For license information, please see license.txt

frappe.ui.form.on('Library Book', {
    refresh: function(frm) {
        frm.add_custom_button('Create Sample Book', function() {
            frappe.call({
                method: "prac.api.create_book",
                callback: function(response) {
                    frappe.msgprint("Book Created: " + response.message);
                }
            });
        });
    }
});

