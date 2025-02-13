// Copyright (c) 2025, Sanskar and contributors
// For license information, please see license.txt

frappe.query_reports["Performance Metrics"] = {
    "filters": [
        {
            "fieldname": "category",
            "label": __("Category"),
            "fieldtype": "Select",
            "options": ["", "Sales", "Marketing", "Finance", "HR"],
            "default": ""
        },
        {
            "fieldname": "from_date",
            "label": __("From Date"),
            "fieldtype": "Date",
            "default": frappe.datetime.add_days(frappe.datetime.nowdate(), -30)
        },
        {
            "fieldname": "to_date",
            "label": __("To Date"),
            "fieldtype": "Date",
            "default": frappe.datetime.nowdate()
        }
    ],

    onload: function(report) {
        report.trigger("refresh");
    }
};

