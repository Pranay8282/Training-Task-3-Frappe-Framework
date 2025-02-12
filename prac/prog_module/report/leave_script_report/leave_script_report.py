# Copyright (c) 2025, Sanskar and contributors
# For license information, please see license.txt  

# import frappe


def execute(filters=None):
	columns, data = [
		{
			"fieldname": "leave_type",
			"ladbel": "Leave Type",
			"fieldtype": "Data",
			"width": 150
		}
	], [
		{
			"leave_type": "Casual"
		},{
			"leave_type": "Sick"
		},
		{
			"leave_type": "Annual"
		}
	]
	return columns, data
