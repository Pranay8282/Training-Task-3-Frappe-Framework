# Copyright (c) 2025, Sanskar and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import (
	round_based_on_smallest_currency_fraction, money_in_words,fmt_money,random_string,today,getdate,now,cstr,cint,now_datetime,generate_hash,
	validate_email_address,get_system_timezone
)


class UtilityMethodsDemo(Document):
	def before_save(self):
		self.title=f"Transaction On {today()}"


		if self.amount and self.currency:
			self.rounded_amount=round_based_on_smallest_currency_fraction(self.amount,self.currency)
		else:
			self.rounded_amount=self.amount

		self.amount_in_words=money_in_words(self.amount,self.currency)

		self.random_string=random_string(8)
		self.created_on = getdate(now())
		self.transaction_time = now_datetime()
		self.created_by_user= frappe.session.user

		self.document_hash=generate_hash(length=12)
		if self.email:
			try:
				validate_email_address(self.email,throw=True)
			except frappe.ValidationError:
				frappe.throw("Invalid Email Address")
		if self.phone:
			self.phone_number=self.format_phone_number(self.phone)
		self.timezone_info=get_system_timezone()


	def format_phone_number(self,phone):
		cleaned_phone=''.join(c for c in phone if c.isdigit())
		
		return f"+91{cleaned_phone}"
		

		
