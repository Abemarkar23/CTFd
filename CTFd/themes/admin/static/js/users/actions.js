$(document).ready(function () {
    $('.delete-user').click(function(e){
        ezq({
            title: "Delete User",
            body: "Are you sure you want to delete {0}".format("<strong>" + htmlentities(USER_NAME) + "</strong>"),
            success: function () {
                var route = script_root + '/api/v1/users/' + USER_ID;
                $.delete(route, {}, function (data) {
                    if (data.success) {
                        window.location = script_root + '/admin/users';
                    }
                });
            }
        });
    });

    $('.edit-user').click(function (e) {
        $('#user-info-modal').modal('toggle');
    });

    $('.award-user').click(function (e) {
        $('#user-award-modal').modal('toggle');
    });

    $('.email-user').click(function (e) {
        $('#user-email-modal').modal('toggle');
    });

    $('#user-award-form').submit(function(e){
        e.preventDefault();
        var params = $('#user-award-form').serializeJSON(true);
        params['user_id'] = USER_ID;
        fetch(script_root + '/api/v1/awards', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then(function (response) {
            return response.json();
        }).then(function (response) {
            if (response.success) {
                window.location.reload()
            }
        });
    });

    $('.delete-submission').click(function(e){
        e.preventDefault();
        var submission_id = $(this).attr('submission-id');
        var submission_type = $(this).attr('submission-type');
        var submission_challenge = $(this).attr('submission-challenge');

        var body = "<span>Are you sure you want to delete <strong>{0}</strong> submission from <strong>{1}</strong> for <strong>{2}</strong>?</span>".format(
            htmlentities(submission_type),
            htmlentities(USER_NAME),
            htmlentities(submission_challenge)
        );

        var row = $(this).parent().parent();

        ezq({
            title: "Delete Submission",
            body: body,
            success: function () {
                fetch(script_root + '/api/v1/submissions/' + submission_id, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(function (response) {
                    return response.json();
                }).then(function (response) {
                    if (response.success) {
                        row.remove();
                    }
                });
            }
        });
    });

    $('.delete-award').click(function(e){
        e.preventDefault();
        var award_id = $(this).attr('award-id');
        var award_name = $(this).attr('award-name');

        var body = "<span>Are you sure you want to delete the <strong>{0}</strong> award from <strong>{1}</strong>?".format(
            htmlentities(award_name),
            htmlentities(USER_NAME)
        );

        var row = $(this).parent().parent();

        ezq({
            title: "Delete Award",
            body: body,
            success: function () {
                fetch(script_root + '/api/v1/awards/' + award_id, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(function (response) {
                    return response.json();
                }).then(function (response) {
                    if (response.success) {
                        row.remove();
                    }
                });
            }
        });
    });
});