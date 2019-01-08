// alert(1)

$(document).ready(function() {
    $('.deleteUser').on('click', deleteUser)
})

function deleteUser() {
    var confirmation = confirm('Are you sure?')
    // alert(`/users/delete/${$(this).data('id')}`)
    console.log(this)   // <button class="deleteUser" data-id="5c33044e62308c37744b661c">X</button>
    console.log($(this))   // jQuery.fn.init [button.deleteUser]
    console.log($(this).data('id'))   // 5c33044e62308c37744b661c
    if(confirmation) {
        $.ajax({
            type: 'DELETE',
            url: `/users/delete/${$(this).data('id')}`
        }).done(function(response) {
            window.location.replace('/db_students')
        })
        window.location.replace('/db_students')
    } else {
        return false
    }
}