# Copyright (c) 2025, Sanskar and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class EmployeeAttendance(Document):
	pass


import frappe

def on_update(doc, method):
    frappe.cache().delete_value("attendance_summary")
    frappe.cache().delete_value("user_working_hours")
    print("🗑 Cache Cleared: Attendance Data")
