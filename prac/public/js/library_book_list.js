frappe.listview_settings['Library Book'] = {
    onload: function (listview) {
        listview.page.add_inner_button('Issue Book', function () {
            issue_book_dialog();
        });
    }
};


function issue_book_dialog() {
    frappe.call({
        method: 'frappe.client.get_list',
        args: {
            doctype: 'Library Member',
            fields: ['name']  
        },
        callback: function (res_members) {
            let member_options = res_members.message.map(member => ({ label: member.name, value: member.name }));

            frappe.call({
                method: 'frappe.client.get_list',
                args: {
                    doctype: 'Library Book',
                    fields: ['name', 'book_name']
                },
                callback: function (res_books) {
                    let book_options = res_books.message.map(book => ({ label: book.title, value: book.name }));

                    let d = new frappe.ui.Dialog({
                        title: 'Issue a Book',
                        fields: [
                            { label: 'Library Member', fieldname: 'library_member', fieldtype: 'Select', options: member_options },
                            { label: 'Book Title', fieldname: 'book', fieldtype: 'Select', options: book_options },
                            { label: 'Issue Date', fieldname: 'issue_date', fieldtype: 'Date', default: frappe.datetime.get_today() },
                            { label: 'Due Date', fieldname: 'due_date', fieldtype: 'Date' },
       
                        ],
                        primary_action_label: 'Issue Book',
                        primary_action(values) {
                            create_library_transaction(values);
                            d.hide();
                        }
                    });

                    d.show();
                }
            });
        }
    });
}

function create_library_transaction(values) {
    frappe.call({
        method: 'frappe.client.insert',
        args: {
            doc: {
                doctype: 'Library Transaction',
                transaction_type: 'Issue',
                member: values.library_member,
                book: values.book,
                issue_date: values.issue_date,
                return_date: values.due_date
            }
        },
        callback: function (r) {
            if (r.message) {
                frappe.msgprint('Book Issued Successfully!');
            }
        }
    });
}
