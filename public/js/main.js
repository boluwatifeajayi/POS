$(document).ready(function () {
    $('.delete-article').on('click', function (e) {
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
            type: 'DELETE',
            url: '/products/' + id,
            success: function (response) {
                alert('Deleting Article');
                window.location.href = '/';
            },
            error: function (err) {
                console.log(err);
            }
        });
    });
});

//search js

function search_animal() {
    let input = document.getElementById('searchbar').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('animals');
    let nothing = document.getElementById('nothing');
    nothing.style.display = "none";
    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display = "none";
            nothing.style.display = "block";
        } else {
            x[i].style.display = "list-item";
            nothing.style.display = "none";
        }
        
    }
    
}
