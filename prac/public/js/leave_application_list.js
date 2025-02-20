frappe.listview_settings['Leave Application'] = {
    onload: function (listview) {
        listview.page.add_inner_button('Get a dialog Field', function () {
            leave_application_massage();
        });
    }
};

function leave_application_massage() {
    // Fetch employee options from the User doctype
    frappe.call({
        method: 'frappe.client.get_list',
        args: {
            doctype: 'User',  // Fetch users (employees)
            fields: ['name', 'full_name'],  // Retrieve user ID (name) and full name
        },
        callback: function (res_employees) {
            // Map employee options (link field to full_name)
            let employee_options = res_employees.message.map(employee => ({
                label: employee.full_name, 
                value: employee.name  // Employee link is referenced by name
            }));

            // Fetch leave types (no change here)
            frappe.call({
                method: 'frappe.client.get_list',
                args: {
                    doctype: 'Leave Application',  // You can also query a different doctype if needed
                    fields: ['leave_type'],
                },
                callback: function (res_leave_types) {
                    // Get unique leave types
                    let leave_type_options = [...new Set(res_leave_types.message.map(leave => leave.leave_type))].map(leave_type => ({
                        label: leave_type, 
                        value: leave_type
                    }));

                    // Create the dialog
                    let d = new frappe.ui.Dialog({
                        title: "Leave Application",
                        fields: [
                            {
                                label: "Employee",
                                fieldname: "employee",
                                fieldtype: "Link",  // Link type to show employee (User)
                                options: "User",  // Link to the User doctype
                                get_query: function () {
                                    return {
                                        filters: {
                                            enabled: 1,  // Ensure only enabled users are shown
                                        }
                                    };
                                }
                            },
                            {
                                label: "Leave Type",
                                fieldname: "leave_type",
                                fieldtype: "Select",
                                options: leave_type_options // Populate leave type options
                            },
                            {
                                label: "Medical Certificate",
                                fieldname: "medical_certificate",
                                fieldtype: "Attach",
                                depends_on: "eval:doc.leave_type == 'Sick'",  // Show this only if the leave type is 'Sick'
                            }
                        ],
                        primary_action_label: "Create Leave Application",
                        primary_action(values) {
                            create_leave_application(values);  // Call function to create the leave application
                            d.hide();
                        }
                    });

                    d.show();  // Show the dialog
                }
            });
        }
    });
}

function create_leave_application(values) {
    // Insert the leave application based on dialog values
    frappe.call({
        method: 'frappe.client.insert',
        args: {
            doc: {
                doctype: 'Leave Application',
                employe: values.employee,  // Correct field name
                leave_type: values.leave_type,  // Correct field name
                medical_certificate: values.medical_certificate  // Add medical certificate if provided
            }
        },
        callback: function (r) {
            if (r.message) {
                frappe.msgprint('Leave Application Created');
            }
        }
    });
}
