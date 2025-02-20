frappe.ui.form.on("Library Member", {
    refresh: function (frm) {
        frm.add_custom_button("Add Member via API", function () {
            frappe.call({
                method: "prac.api.add_library_member",
                args: {
                    member_name: frm.doc.member_name,
                    email: frm.doc.email,
                    membership_type: frm.doc.membership_type,
                    status: frm.doc.status || "Active"
                },
                callback: function (response) {
                    if (response.message) {
                        frappe.msgprint({
                            title: __('Success'),
                            indicator: 'green',
                            message: __('Library Member Created: ' + response.message.member_id)
                        });
                    } else {
                        frappe.msgprint({
                            title: __('Error'),
                            indicator: 'red',
                            message: __('Failed to create member: ' + response.error)
                        });
                    }
                }
            });
        });

        // Add new button to redirect to /jobs page
        frm.add_custom_button("Go to Jobs", function () {
            window.location.href = "/jobs";  // Redirect to /jobs page
        });
    }
});
