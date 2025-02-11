import frappe
from frappe.model.document import Document


class ProjectManagement(Document):
    def before_save(self):
        fetch_employee_name(self, None)  # Pass None as second argument


def fetch_employee_name(doc, method):
    if doc.user:  # Ensure 'user' field has a value
        employee_name = frappe.db.get_value("Leave Application", {"name": doc.user}, "employee_name")
        # doc.username = "Iiei"
        if employee_name:
            doc.username = employee_name  # Set the value
        else:
            frappe.msgprint("No employee name found for the selected User")
