# Copyright (c) 2025, Sanskar and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class TrainingSession(Document):
	def on_change(self):
		if self.trainer:
			self.self_participent()

	def self_participent(self):
		self.set('participents', [])

		participents =frappe.get_all("Participant",filters={'trainer':self.trainer},fields=['full_name','email','phone']) 


		for participent in participents:
			self.append('participants', {
				"participant_name":participent.full_name,
				"email":participent.email,
				"phone":participent.phone,
				"registration_date":frappe.utils.now()
			})

		frappe.db.commit()