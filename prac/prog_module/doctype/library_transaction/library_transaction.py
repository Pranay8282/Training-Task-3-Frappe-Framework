# Copyright (c) 2025, Sanskar and contributors
# For license information, please see license.txt

import frappe
from datetime import datetime
from frappe.model.document import Document
from frappe.utils import getdate  # Import getdate method

class LibraryTransaction(Document):

    def before_save(self):
        self.update_status_based_on_return_date()

    def update_status_based_on_return_date(self):
        today = datetime.today().date()
        
        # Convert return_date string to date object using frappe.utils.getdate
        return_date = getdate(self.return_date) if self.return_date else None
        
        if return_date and return_date < today:
            if self.status != "Overdue":
                self.status = "Overdue"
                frappe.msgprint(f"Status updated to 'Overdue' for transaction {self.name}.")
                self.set_status_read_only()

    def set_status_read_only(self):
        # Check if status is "Overdue"  
        if self.status == "Overdue":
            # Dynamically make the 'status' field read-only
            field = frappe.get_meta("Library Transaction").get_field("status")
            field.read_only = True
            frappe.msgprint(f"Status field is now read-only for transaction {self.name}.")
