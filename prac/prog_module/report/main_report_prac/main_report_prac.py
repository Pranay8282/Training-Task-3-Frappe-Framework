# Copyright (c) 2025, Sanskar and contributors
# For license information, please see license.txt

# import frappe


def execute(filters=None):
	columns=[
		{
			"fieldname":"modified_by",
			"label":"Created By",
			"fieldtype":"data",
			"width":300,

		}

	]
	data=[{"first_name":"pranay@sanskartechnolab.com"},{"first_name":"Administator"}]
	return columns, data


