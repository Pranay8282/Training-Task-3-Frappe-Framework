frappe.pages['library_book_details'].on_page_load = function(wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Book Details',
        single_column: true
    });

    let $container = $(wrapper).find('.layout-main-section');

    // Get book from route
    let route = frappe.get_route();
    let book_name = route.length > 1 ? route[1] : null;
    
    console.log("Book Name from Route:", book_name);

    if (!book_name) {
        frappe.msgprint(__('Error: No book selected.'));
        return;
    }

    // Add HTML Elements
    $container.html(`
        <div class="book-details">
            <h3 id="book_title">Loading...</h3>
            <p><strong>Author:</strong> <span id="book_author"></span></p>
            <p><strong>ISBN:</strong> <span id="book_isbn"></span></p>
            <p><strong>Status:</strong> <span id="book_status"></span></p>
            <hr>
            <h4>Transaction History</h4>
            <ul id="transaction_list" class="list-group"></ul>
        </div>
    `);

    // Fetch book details
    frappe.call({
        method: 'prac.prog_module.page.library_dashboard.library_dashboard.get_book_details',
        args: { book_name: book_name },
        callback: function(response) {
            if (!response.message) {
                frappe.msgprint(__('Error: No response from server.'));
                return;
            }

            let book = response.message.book;
            let transactions = response.message.transactions || [];

            if (!book) {
                frappe.msgprint(__('Error: No such book found.'));
                return;
            }

            console.log("Book Details:", book);
            console.log("Transactions:", transactions);

            $('#book_title').text(book.book_name);
            $('#book_author').text(book.author);
            $('#book_isbn').text(book.isbn);
            $('#book_status').text(book.status);

            let transaction_list = $('#transaction_list');
            transaction_list.empty();

            if (transactions.length === 0) {
                transaction_list.append('<li class="list-group-item">No transactions found.</li>');
            } else {
                transactions.forEach(tx => {
                    transaction_list.append(`
                        <li class="list-group-item">
                            <strong>Member:</strong> ${tx.member} <br>
                            <strong>Status:</strong> ${tx.status} <br>
                            <strong>Issue Date:</strong> ${tx.issue_date} <br>
                            <strong>Return Date:</strong> ${tx.return_date || "Not Returned Yet"}
                        </li>
                    `);
                });
            }
        }
    });
};
