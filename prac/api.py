import frappe


@frappe.whitelist()
def create_book():
    doc = frappe.get_doc({
        "doctype": "Library Book",
        "book_name": "Learn Python",
        "author": "John Doe",
        "isbn": "87714-66-88",
        "status": "Issued"
    })
    doc.insert()
    frappe.db.commit()
    return doc.name


import frappe

@frappe.whitelist()  # Allows it to be called from JavaScript
def add_library_member(member_name, email, membership_type, status="Active"):
    """
    Inserts a new Library Member from a client-side call.
    """
    if not member_name or not email or not membership_type:
        return {"error": "Missing required fields"}

    try:
        doc = frappe.get_doc({
            "doctype": "Library Member",
            "member_name": member_name,
            "email": email,
            "membership_type": membership_type,
            "status": status
        })
        doc.insert(ignore_permissions=True)  # Allow insertion from the client side
        frappe.db.commit()
        return {"message": "Library Member Created", "member_id": doc.name}
    
    except Exception as e:
        frappe.log_error(f"Library Member Creation Failed: {str(e)}")
        return {"error": str(e)}
