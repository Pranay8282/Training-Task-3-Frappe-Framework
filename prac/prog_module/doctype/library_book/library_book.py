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




