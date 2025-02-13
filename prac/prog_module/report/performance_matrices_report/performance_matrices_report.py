import frappe

def execute(filters=None):
    # Define report columns
    columns = [
        {"fieldname": "category", "label": "Category", "fieldtype": "Data", "width": 150},
        {"fieldname": "date", "label": "Date", "fieldtype": "Date", "width": 120},
        {"fieldname": "total_value", "label": "Total Value", "fieldtype": "Float", "width": 150}
    ]

    # Ensure filters are not None
    filters = filters or {}

    # Prepare filter conditions
    conditions = []
    values = {}

    if filters.get("category"):
        conditions.append("category = %(category)s")
        values["category"] = filters["category"]

    if filters.get("from_date") and filters.get("to_date"):
        conditions.append("date BETWEEN %(from_date)s AND %(to_date)s")
        values["from_date"] = filters["from_date"]
        values["to_date"] = filters["to_date"]

    # Convert conditions list to SQL WHERE clause
    where_clause = " AND ".join(conditions) if conditions else "1=1"

    # Fetch & group data
    data = frappe.db.sql(f"""
        SELECT category, date, SUM(value) as total_value
        FROM `tabPerformance Metrics`
        WHERE {where_clause}
        GROUP BY category, date
        ORDER BY date DESC
    """, values, as_dict=True)
    labels = [row["category"] for row in data]
    values = [row["total_value"] for row in data]
    
	# Define chart data
    chart = {
        "data": {
            "labels": labels,
            "datasets": [{"name": "Total Value", "values": values}]
        },
        "type": "pie"  # Chart type can be "bar", "line", "pie", etc.
    }
    categories = list(set(row["category"] for row in data))
    dates = list(set(row["date"] for row in data))

    # Prepare datasets for each date
    datasets = []
    for date in dates:
        dataset_values = [next((row["total_value"] for row in data if row["category"] == category and row["date"] == date), 0) for category in categories]
        datasets.append({"name": str(date), "values": dataset_values})

    # Define chart data
    chart = {
        "data": {
            "labels": categories,  # X-axis
            "datasets": datasets    # Y-axis (grouped by date)
        },
        "type": "bar"
    }

    return columns, data, None, chart


