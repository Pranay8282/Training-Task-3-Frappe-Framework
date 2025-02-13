import frappe

def execute(filters=None):
    if not filters:
        filters = {}

    query = """
        SELECT 
            ea.employee, 
            ea.check_in, 
            ea.check_out,
            TIMESTAMPDIFF(HOUR, ea.check_in, ea.check_out) AS working_hours,
            emp.department
        FROM `tabEmployee Attendance` AS ea
        LEFT JOIN `tabEmployee` AS emp ON ea.employee = emp.name
        WHERE 1=1
    """

    values = []

    if "employee" in filters:
        query += " AND ea.employee = %s"
        values.append(filters["employee"])

    if "department" in filters:
        query += " AND emp.department = %s"
        values.append(filters["department"])

    if "from_date" in filters and "to_date" in filters:
        query += " AND DATE(ea.check_in) BETWEEN %s AND %s"
        values.append(filters["from_date"])
        values.append(filters["to_date"])

    query += " ORDER BY ea.check_in DESC"

    data = frappe.db.sql(query, tuple(values), as_dict=True)

    columns = [
        {"fieldname": "employee", "label": "Employee", "fieldtype": "Link", "options": "Employee", "width": 150},
        {"fieldname": "department", "label": "Department", "fieldtype": "Data", "width": 150},
        {"fieldname": "check_in", "label": "Check In", "fieldtype": "Datetime", "width": 200},
        {"fieldname": "check_out", "label": "Check Out", "fieldtype": "Datetime", "width": 200},
        {"fieldname": "working_hours", "label": "Working Hours", "fieldtype": "Float", "width": 150}
    ]

    return columns, data, get_chart(data)

def get_chart(data):
    if not data:
        return None

    employees = [row["employee"] for row in data if row.get("employee")]
    working_hours = [row["working_hours"] for row in data if row.get("working_hours")]

    if not employees or not working_hours:
        return None

    return {
        "data": {
            "labels": employees,
            "datasets": [
                {
                    "name": "Working Hours",
                    "values": working_hours
                }
            ]
        },
        "type": "bar"
    }
