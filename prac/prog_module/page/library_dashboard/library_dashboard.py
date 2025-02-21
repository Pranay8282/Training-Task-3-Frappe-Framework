import frappe

@frappe.whitelist()
def get_books(title=None):
    filters = {}
    if title:
        filters["book_name"] = ["like", f"%{title}%"]

    books = frappe.get_all("Library Book", 
                           filters=filters, 
                           fields=["book_name", "author"])
    
    return books

@frappe.whitelist()
def get_book_details(book_name):
    if not book_name:
        return {"error": "No book selected."}

    book = frappe.db.get_value(
        "Library Book",
        {"book_name": book_name},
        ["book_name", "author", "isbn", "status"],
        as_dict=True
    )

    if not book:
        return {"error": "Book not found."}

    transactions = frappe.get_all(
        "Library Transaction",
        filters={"book": book_name},
        fields=["member", "status", "issue_date", "return_date"]
    )

    # Log transactions
    frappe.logger().info(f"Transactions for {book_name}: {transactions}")

    return {"book": book, "transactions": transactions}

