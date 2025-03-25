# Copyright (c) 2025, Sanskar and contributors
# For license information, please see license.txt  

import frappe


def execute(filters=None):
	columns, data = [
		{
			"fieldname": "leave_type",
			"ladbel": "Leave Type",
			"fieldtype": "Data",
			"width": 300
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


def get_chart(columns, data):
    labels = [row["leave_type"] for row in data]
    values = [5, 10, 15]  

    return {
        "data": {
            "labels": labels,
            "datasets": [{
                "name": "Leave Type",
                "values": values
            }]
        },
        "type": "pie"
    }
