# Copyright (c) 2025, Sanskar and contributors
# For license information, please see license.txt

import frappe	
from frappe.website.website_generator import WebsiteGenerator
from frappe.model.document import Document


class JobOpening(WebsiteGenerator):
    def before_insert(self):
            self.route = f"jobs/{frappe.scrub(self.job_title)}"
            
	
	
