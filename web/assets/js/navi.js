// ====================================
// Navigation modules to ajax load website components

$(document).ready(function(){
    NaviGoto(NaviGetCurrentPage());
});


function NaviGetCurrentPage() {
    let url = new URI(window.location.href);
    if (url.search(true)["get"] !== undefined) {
        return url.search(true)["get"];
    } else {
        return "home"; // return homepage if cannot find page address in get query
    }
}

function NaviGoto(page) {
    $( "#page-content-ajax" ).html(`
        <div class="loading">
            <img src="assets/loading.svg" style="width: 48px; height: 48px">
        </div>
    `);

    page = encodeURI(page);
    $.ajax({
        type: 'GET',
        url: page + ".html",
        contentType: 'application/json; charset=utf-8',
        cache: false,
        success: function(data) {
            // Update page content
            $( "#page-content-ajax" ).html(data);
            history.pushState(null, null, window.location.pathname + "?get=" + page);
        }, error: function(xhr) {
            if (page != "404") {
                NaviGoto("404");
            }
        }});
}

