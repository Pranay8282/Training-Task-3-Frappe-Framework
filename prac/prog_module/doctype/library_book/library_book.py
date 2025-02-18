# Copyright (c) 2025, Sanskar and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class LibraryBook(Document):
	def mark_as_issued(self):
		self.status = "Issued"
		self.save()
		frappe.db.commit()
		return "Hi"



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
