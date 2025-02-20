frappe.pages['my_chart_page'].on_page_load = function(wrapper) {
    let page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'My Custom Chart',
        single_column: true
    });

    let chart_container = $('<div id="chart"></div>').appendTo(page.main);
    
    new frappe.Chart("#chart", {  // Attach Chart
        title: "Sales Data",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{ values: [10, 20, 30, 25, 15, 40] }]
        },
        type: 'bar',  // Chart Type
        height: 300
    });
};
    