import frappe

def get_context(context):
    context.jobs = frappe.get_all("Job Opening", 
                                  filters={"is_published": 1},
                                  fields=["job_title", "company", "location", "salary", "route"])
