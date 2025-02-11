# Copyright (c) 2025, Sanskar and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document
from frappe.model.naming import getseries


class Employe(Document):
	def autoname(self):
		prefix = "P-{}-".format(self.name1)
		self.name = getseries(prefix, 3)