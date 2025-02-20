// Copyright (c) 2025, Sanskar and contributors
// For license information, please see license.txt

frappe.ui.form.on("Job Opening", {
    refresh:function(frm){
        frm.add_custom_button("Go to Jobs", function () {
            window.location.href = "/jobs";  // Redirect to /jobs page
        });
    }
});
