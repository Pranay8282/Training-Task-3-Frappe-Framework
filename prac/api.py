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