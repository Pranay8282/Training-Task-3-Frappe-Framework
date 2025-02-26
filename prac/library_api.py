import frappe
from frappe import _

@frappe.whitelist(allow_guest=True)  # Makes API public, remove `allow_guest=True` to make it private
def get_library_reviews():
    try:
        reviews = frappe.get_all("Library Review", fields=["book", "member", "rating", "review"])
        return {"success": True, "data": reviews}
    except Exception as e:
        return {"success": False, "error": str(e)}
