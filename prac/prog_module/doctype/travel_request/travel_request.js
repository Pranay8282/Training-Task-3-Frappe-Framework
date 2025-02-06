// Copyright (c) 2025, Sanskar and contributors
// For license information, please see license.txt

frappe.ui.form.on("Travel Request", {
    onload: function(frm) {

        frm.trigger("travel_type");
        frm.trigger("travel_cost");
    },
    travel_type: function(frm) {
        frm.toggle_display("visa_required", frm.doc.travel_type === "International");
    },
    travel_cost: function(frm) {
        frm.toggle_display("manager_approval", frm.doc.travel_cost > 1000);
    },
    validate: function(frm) {
        if (frm.doc.travel_type === "International" && !frm.doc.visa_required) {
            frappe.throw("Visa is required for international travel.");
        }
        if (frm.doc.travel_cost > 1000 && !frm.doc.manager_approval) {
            frappe.throw("Manager approval is required for travel costs above 1000.");
        }
    }
});
