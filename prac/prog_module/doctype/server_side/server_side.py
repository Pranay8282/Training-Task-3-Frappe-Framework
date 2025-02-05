# Copyright (c) 2025, Sanskar and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import getdate, today


class serverside(Document):
	
	def validate(self):
		if self.dob and (self.dob) > getdate(today()):
			frappe.throw("You entered a wrong Date of Birth! It cannot be in the future.")	
	# def validate(self):
    # 	full_name = " ".join(filter(None, [self.first_name, self.middle_name, self.last_name]))  
    # 	frappe.msgprint(_("Hello My friends '{0}'").format(full_name))


	# def validate(self):
	# 	frappe.msgprint("Hello and Thank you")
	# def before_save(self):
	# 	frappe.throw("Hello and Thank you")
	# def before_insert(self):
	# 	frappe.throw("Hello and Thank you")
	# def after_insert(self):
	# 	frappe.throw("Hello and Thank you")
	# def on_update(self):
	# 	frappe.msgprint("Hello and Thank you")
	# def before_submit(self):
	# 	frappe.msgprint("Hello and Thank you")
	# def on_submit(self):
	# 	frappe.msgprint("Hello and Thank you")
	# def on_cancel(self):
	# 	frappe.msgprint("	 you") 

	# @frappe.whitelist()
	# def frm_call(self,msg):
	# 	return "Hieee From frm Call	"



		# frappe.msgprint(("Hellow my full name is '{0}'").format(self.first_name , self.middle_name , self.last_name))
		# self.work_document()
		# self.get_document()
		# frappe.delete_doc('scripting','PK-0034')
		# self.work_document()

		# for row in self.get("familiy_members"):
		# 	frappe.msgprint(("{0}. The Family member is {1} and the relation is {2}").format(row.idx ,row.name1 ,row.relation))



	def work_document(self):
		# doc =frappe.db.get_list('scripting',filters={
		# 	'enable':1
		# },
		# fields=['first_name','age'])

		# for d in doc:
		# 	frappe.msgprint(("Hieee {0} and age is {1}").format(d.first_name,d.age))


		data = frappe.db.sql("""
					select 
						first_name,age
					from 
						`tabscripting`
					where 
						enable=1;
		
		""",as_dict	=1)

		for d in data:
			frappe.msgprint(("The {0} and {1}").format(d.first_name ,d.age))
	# def get_document(self):
	# 	# doc=frappe.get_doc("scripting",self.clinet_side)
	# 	# frappe.msgprint(("Hello From child and name is {0} and age is {1}").format(doc.first_name,doc.age))
		

	# 	# for row in doc.get("familiy_members"):
	# 	# 	frappe.msgprint(("{0}. The Family member is {1} and the relation is {2}").format(row.idx ,row.name1 ,row.relation))

	# 	doc=frappe.new_doc('scripting')
	# 	doc.first_name="Jake"
	# 	doc.age=10
	# 	doc.last_name="jay"


	# 	doc.append("familiy_members",{"name1":"K","age":20,"relation":"Uncomplete Stroy"})
	# 	doc.insert()




@frappe.whitelist()
def new_doc_method(docname):
	new_doc = frappe.get_doc({
        "doctype": "InDoc",
        "first_name": "Youoyyy",  
        "last_name": "LA",
		"imp":[{
			"name1":"YOHO",
			"age":24,
			"inner_child":[{"hiee":"Hellow"}],
		},
]
    })
	new_doc.insert(ignore_permissions=True) 
	return new_doc.name  



@frappe.whitelist()
def new_method_freeze(msg):
	import time
	time.sleep(10)
	frappe.msgprint(msg)
	return "Freeze Done"