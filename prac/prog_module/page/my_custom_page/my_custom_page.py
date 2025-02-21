import frappe

@frappe.whitelist()
def get_data():
    return {"message": "Hello from the backend!"}
