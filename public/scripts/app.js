(function(){
        'use strict';

        $(document).ready(function () {

            getEmployees();

            $('#newEmployee').hide();
            $('#btnAddNewEmp').on('click', function () {
                $('#btnAddNewEmp').hide();
                $('#newEmployee').show();
            });
            $('#clearNewEmp').on('click', function(){
                $('#btnAddNewEmp').show();
                $('#newEmployee').hide();
            });

            $('#saveNewEmp').on('click', function(){

                var serverReq = {
                    first_name: $('#first_name').val(),
                    last_name: $('#last_name').val(),
                    e_mail: $('#e_mail').val(),
                    opt1: changeBtnStatus($('#opt_1')),
                    opt2: changeBtnStatus($('#opt_2')),
                    opt3: changeBtnStatus($('#opt_3')),
                    opt4: changeBtnStatus($('#opt_4')),
                    opt5: changeBtnStatus($('#opt_5'))
                };

                 jQuery.ajax({
                 method: 'POST',
                 url: 'api/add/',
                 data: serverReq,
                 success: function(data) {
                     alert('SUCCESS.');
                     $('#newEmployee').hide();
                     $('#dataContainer').empty();
                     getEmployees();
                    },
                 error: function(err) {
                     alert('ERROR !!!')
                    }
                 });
            });

            function getEmployees(){
                jQuery.ajax({
                    method: 'GET',
                    url: 'api/get/',
                    success: function(data){
                        rendEmployees(data);
                    },
                    error: function(err) {
                        console.log('Server error ', err);
                    }
                });
            }


            function rendEmployees(data){
                for(var i = 0; i < data.length; i++){
                    var employee = new Employee(data[i]._id, data[i].first_name, data[i].last_name,
                        data[i].e_mail, data[i].opt1, data[i].opt2,
                         data[i].opt3, data[i].opt4, data[i].opt5);
                    employee.render();
                }
            }


            function changeBtnStatus(check_box) {
                if (check_box.prop('checked')) {
                    return true;
                } else {
                    return false;
                }
            }
        });
})();
