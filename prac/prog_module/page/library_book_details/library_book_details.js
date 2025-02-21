frappe.pages['library_book_details'].on_page_load = function(wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Book Details',
        single_column: true
    });

    let $container = $(wrapper).find('.layout-main-section');

    // Inject CSS for styling
    let css = `
        <style>
            .book-card {
                background: #ffffff;
                border-radius: 12px;
                box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                padding: 20px;
                margin-top: 10px;
            }
            .book-title {
                font-size: 24px;
                font-weight: bold;
                color: #333;
                text-align: center;
            }
            .book-meta {
                font-size: 16px;
                text-align: center;
                color: #666;
            }
            .status-badge {
                padding: 6px 10px;
                border-radius: 8px;
                font-weight: bold;
            }
            .status-issued { background: #ffcc00; color: #000; }
            .status-available { background: #28a745; color: #fff; }
            .status-overdue { background: #dc3545; color: #fff; }
            .transaction-card {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 10px;
                box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
                margin-bottom: 10px;
            }
        </style>
    `;
    $('head').append(css);

    function load_book_details() {
        // Get book from route
        let route = frappe.get_route();
        let book_name = route.length > 1 ? route[1] : null;

        console.log("📌 Book Name from Route:", book_name);

        if (!book_name) {
            frappe.msgprint(__('⚠️ Error: No book selected.'));
            return;
        }

        // Clear previous content before loading new details
        $container.html(`
            <div class="book-card">
                <h2 class="book-title" id="book_title">Loading...</h2>
                <p class="book-meta"><strong>📚 Author:</strong> <span id="book_author"></span></p>
                <p class="book-meta"><strong>🔢 ISBN:</strong> <span id="book_isbn"></span></p>
                <p class="book-meta"><strong>📌 Status:</strong> <span id="book_status" class="status-badge"></span></p>
                
                <hr>

                <h3 class="mt-4">📜 Transaction History</h3>
                <div id="transaction_list" class="mt-3"></div>
            </div>
        `);

        // Fetch Book Details
        frappe.call({
            method: 'prac.prog_module.page.library_dashboard.library_dashboard.get_book_details',
            args: { book_name: book_name },
            callback: function(response) {
                if (!response.message) {
                    frappe.msgprint(__('⚠️ Error: No response from server.'));
                    return;
                }

                let book = response.message.book;
                let transactions = response.message.transactions || [];

                if (!book) {
                    frappe.msgprint(__('❌ Error: No such book found.'));
                    return;
                }

                console.log("📖 Book Details:", book);
                console.log("📜 Transactions:", transactions);

                $('#book_title').text(book.book_name);
                $('#book_author').text(book.author);
                $('#book_isbn').text(book.isbn);

                let status_class = 'status-badge';
                if (book.status === 'Issued') status_class += ' status-issued';
                else if (book.status === 'Available') status_class += ' status-available';
                else if (book.status === 'Overdue') status_class += ' status-overdue';

                $('#book_status').attr('class', status_class).text(book.status);

                let transaction_list = $('#transaction_list');
                transaction_list.empty();

                if (transactions.length === 0) {
                    transaction_list.append('<p class="text-muted">⚠️ No transactions found.</p>');
                } else {
                    transactions.forEach(tx => {
                        let tx_status_class = 'status-badge';
                        if (tx.status === 'Issued') tx_status_class += ' status-issued';
                        else if (tx.status === 'Returned') tx_status_class += ' status-returned';
                        else if (tx.status === 'Overdue') tx_status_class += ' status-overdue';

                        transaction_list.append(`
                            <div class="transaction-card">
                                <p><strong>👤 Member:</strong> ${tx.member}</p>
                                <p><strong>📅 Issue Date:</strong> ${tx.issue_date}</p>
                                <p><strong>📌 Status:</strong> <span class="${tx_status_class}">${tx.status}</span></p>
                                <p><strong>🔄 Return Date:</strong> ${tx.return_date || "<em>Not Returned Yet</em>"}</p>
                            </div>
                        `);
                    });
                }
            }
        });
    }

    // Attach event listener for route change to reload details
    $(document).on('page-change', function() {
        if (frappe.get_route()[0] === 'library_book_details') {
            load_book_details();
        }
    });

    // Load book details when the page first loads
    load_book_details();
};
