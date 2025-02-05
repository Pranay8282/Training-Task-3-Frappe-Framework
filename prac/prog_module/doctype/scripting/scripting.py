# Copyright (c) 2025, Sanskar and contributors
# For license information, please see license.txt

import frappe	
import time
from frappe.model.document import Document


class scripting(Document):
	pass


@frappe.whitelist()
def fappe_call(msg):
	time.sleep(5)
	frappe.msgprint(msg)
	# return "Hieeee"