# Copyright (c) 2025, Sanskar and contributors
# For license information, please see license.txt

import frappe
from frappe.utils import random_string
from frappe.model.document import Document


class Product(Document):
	def before_save(self):
		self.product_code=random_string(8)

	def validate(self):
		if self.stock_quantity <0 :
			frappe.throw("Stock Quantity cannot be negative")


		if self.unit_price <0 :
			frappe.throw("Unit Price cannot be negative")


	def before_insert(self):
		self.product_code=random_string(8)
		doc=frappe.get_doc("Product","PRD-")
		
	def create_product(doc, method):
		if doc.doctype == "Product":
            # Creating a new Product document with values
			new_product = frappe.get_doc({
                'doctype': 'Product',
                'product_name': 'Laptop',
                'category': 'Electronics',
                'stock_quantity': 100,
                'unit_price': 1500,
                'supplier': 'TechCorp',
                'status': 'Available',
                'purchase_history': [
                    {
                        'purchase_date': '2025-01-15',
                        'quantity_purchased': 50,
                        'price_per_unit': 1400,
                        'supplier_name': 'TechCorp'
                    },
                    {
                        'purchase_date': '2025-02-01',
                        'quantity_purchased': 50,
                        'price_per_unit': 1500,
                        'supplier_name': 'TechCorp'
                    }
                ]
            })

            # Insert the new product into the database
			new_product.insert()  # Save the document
			frappe.db.commit()  # Commit the transaction to apply changes

            # Optional: Display a success message
			frappe.msgprint(f"Product '{new_product.product_name}' has been inserted successfully!")





# Define the child table 'Purchase History'
class PurchaseHistory(Document):
    pass	