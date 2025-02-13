// Copyright (c) 2025, Sanskar and contributors
// For license information, please see license.txt
frappe.query_reports["Employee Attendance Report"] = {
    "filters": [
        {
            "fieldname": "employee",
            "label": __("Employee"),
            "fieldtype": "Link",
            "options": "Employee",
            "reqd": 0
        },
        {
            "fieldname": "from_date",
            "label": __("From Date"),
            "fieldtype": "Date",
            "reqd": 0
        },
        {
            "fieldname": "to_date",
            "label": __("To Date"),
            "fieldtype": "Date",
            "reqd": 0
        }
    ],

    "onload": function(report) {
        report.page.add_inner_button("Refresh Chart", function() {
            report.refresh();
        });

        frappe.call({
            method: "prac.prog_module.report.employee_attendance_report.employee_attendance_report.execute",
            args: { filters: frappe.query_report.get_filter_values() },
            callback: function(r) {
                if (r.message && r.message.length >= 3) {
                    let chart_data = r.message[2];  // Chart data is the third item in response

                    if (chart_data) {
                        report.chart = chart_data;
                        report.render_chart();
                    } else {
                        frappe.msgprint("No chart data available.");
                    }
                }
            }
        });
    }
};

