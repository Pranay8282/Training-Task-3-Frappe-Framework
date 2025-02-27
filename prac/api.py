import frappe
from frappe import _
import json


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

@frappe.whitelist()  
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
        doc.insert(ignore_permissions=True)  
        frappe.db.commit()
        return {"message": "Library Member Created", "member_id": doc.name}
    
    except Exception as e:
        frappe.log_error(f"Library Member Creation Failed: {str(e)}")
        return {"error": str(e)}

@frappe.whitelist()
def issue_book(book_name, member_name):
    """
    API to issue a book to a library member.
    - Creates a new Library Transaction
    - Updates book status to 'Issued'
    """
    book = frappe.get_doc("Library Book", book_name)
    if book.status != "Available":
        frappe.throw(_("Book is not available."))
    member = frappe.get_doc("Library Member", {"member_name": member_name})
    if not member:
        frappe.throw(_("Member not found."))
    transaction = frappe.get_doc({
        "doctype": "Library Transaction",
        "book": book_name,
        "member": member_name,
        "issue_date": frappe.utils.today(),
        "status": "Issued"
    })
    transaction.insert(ignore_permissions=True)

    book.status = "Issued"
    book.save(ignore_permissions=True)

    return {
        "message": "Book issued successfully",
        "transaction_id": transaction.name,
        "book": book_name,
        "member": member_name,
        "issue_date": transaction.issue_date
    }


@frappe.whitelist()
def my_custom_api():
    return "Hello, API is working!"
    

@frappe.whitelist(allow_guest=True)
def blood_donor_wbh():
    try:
        # Get JSON data from request
        data = frappe.local.form_dict

        # Log data for debugging
        frappe.logger().info(f"Received Webhook Data: {json.dumps(data)}")

        # Create a new document in 'Webhook Logs' Doctype (if exists)
        doc = frappe.get_doc({
            "doctype": "Webhook Logs",
            "event": "New Blood Donor",
            "data": json.dumps(data)
        })
        doc.insert(ignore_permissions=True)

        return {"status": "success", "message": "Webhook data received"}
    except Exception as e:
        frappe.logger().error(f"Webhook Error: {str(e)}")
        return {"status": "error", "message": str(e)}
