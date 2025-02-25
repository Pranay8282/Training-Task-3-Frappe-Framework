frappe.pages['library_dashboard'].on_page_load = function(wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Library Dashboard',
        single_column: true
    });

    let $container = $(wrapper).find('.layout-main-section');

    // Add HTML Elements
    $container.html(`
        <div class="library-dashboard">
            <h3>Search Books</h3>
            <input type="text" id="search_input" class="form-control" placeholder="Enter book title">
            <hr>
            <h4>Book List</h4>
            <ul id="book_list" class="list-group"></ul>
        </div>

        <style>
            .library-dashboard {
                max-width: 600px;
                margin: 40px auto;
                padding: 20px;
                background: #ffffff;
                border-radius: 10px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            }
            .library-dashboard h3, .library-dashboard h4 {
                text-align: center;
                color: #2c3e50;
                font-weight: 600;
            }
            #search_input {
                width: 100%;
                padding: 10px;
                border: 2px solid #27ae60;
                border-radius: 5px;
                font-size: 16px;
                outline: none;
                transition: 0.3s ease-in-out;
            }
            #search_input:focus {
                border-color: #2ecc71;
                box-shadow: 0 0 8px rgba(46, 204, 113, 0.5);
            }
            .list-group {
                margin-top: 15px;
            }
            .list-group-item {
                font-size: 16px;
                padding: 10px;
                background: #f8f9fa;
                border-left: 5px solid #27ae60;
                transition: 0.3s ease-in-out;
                cursor: pointer;
            }
            .list-group-item:hover {
                background: #e8f6f3;
                transform: translateX(5px);
            }
        </style>
    `);

    // Fetch books from backend
    function fetch_books(title = "") {
        frappe.call({
            method: 'prac.prog_module.page.library_dashboard.library_dashboard.get_books',
            args: { title: title },
            callback: function(response) {
                let books = response.message || [];
                let book_list = $('#book_list');
                book_list.empty();

                console.log("Fetched Books:", books); // Debugging

                if (books.length === 0) {
                    book_list.append('<li class="list-group-item">No books found.</li>');
                } else {
                    books.forEach(book => {
                        book_list.append(`
                            <li class="list-group-item" data-book-name="${book.book_name}">
                                <strong>${book.book_name}</strong> by ${book.author}
                            </li>
                        `);
                    });
                }
            }
        });
    }

    // Click Event - Redirect to Book Details Page
    $(document).on('click', '#book_list .list-group-item', function() {
        let book_name = $(this).data('book-name');
        console.log("Clicked Book:", book_name); // Debugging

        if (book_name) {
            frappe.set_route('library_book_details', book_name);
        } else {
            frappe.msgprint(__('Error: No book selected.'));
        }
    });

    // Debounce function to delay API calls
    function debounce(func, delay) {
        let timer;
        return function(...args) {
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // Handle user typing in search input
    $('#search_input').on('input', debounce(function() {
        let title = $(this).val().trim();
        fetch_books(title);
    }, 300));

    // Load books when the page loads
    fetch_books();
};

