import frappe

def get_context(context):
    context.leaves = frappe.get_all(
        "Leave Application",  
        # filters={"status": "Approved"},
        fields=["employe", "from_date", "to_date", "total_days", "medical_certificate"]
    )
