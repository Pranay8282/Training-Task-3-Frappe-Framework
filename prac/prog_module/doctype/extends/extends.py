# Copyright (c) 2025, Sanskar and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Extends(Document):
	def before_save(self):
		level=frappe.db.get_single_value('Confurigation','level')
		is_checked=frappe.db.get_single_value('Confurigation','got_it')
		self.level=level
		self.checked=is_checked

