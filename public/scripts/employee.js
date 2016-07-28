/**
 * Created by rafail on 7/20/16.
 */

function Employee(id, first_name, last_name, e_mail, opt1, opt2, opt3, opt4, opt5){
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.e_mail = e_mail;
    this.opt1 = opt1;
    this.opt2 = opt2;
    this.opt3 = opt3;
    this.opt4 = opt4;
    this.opt5 = opt5;
}

Employee.prototype.render = function(){
    var self = this;
    var el = $('<div id="employee" class="container" ' +
        'style="border:solid;width:80%;background-color:lightblue"></div>');
    var mainDiv = $('<div class="row"></div>');
    var leftDiv = $('<div class="col-md-6"></div>');
    var rightDiv = $('<div class="col-md-6"></div>');

    var first_name_field = $('<input type="text" style="width: 100px" class="form-control" value="'+ this.first_name +'">');
    var last_name_field = $('<input type="text" style="width: 100px" class="form-control" value="'+ this.last_name +'">');
    var e_mail_field = $('<input type="text" style="width: 200px" class="form-control" value="'+ this.e_mail +'">');
    var opt1_btn = $('<input id="opt1" style="margin: 20px; margin-top: 80px" type="checkbox">Option 1</input>');
    var opt2_btn = $('<input id="opt2" style="margin: 20px" type="checkbox">Option 2</input>');
    var opt3_btn = $('<input id="opt3" style="margin: 20px" type="checkbox">Option 3</input>');
    var opt4_btn = $('<input id="opt4" style="margin: 20px" type="checkbox">Option 4</input>');
    var opt5_btn = $('<input id="opt5" style="margin: 20px" type="checkbox">Option 5</input>');
    var btn_save = $('<button style="margin-left: 200px; margin-top: 20px; margin-right: 20px">Save Changes</button>');
    var btn_delete = $('<button >Delete Employee</button>');

    var opt_btn_arr = [opt1_btn, opt2_btn, opt3_btn, opt4_btn, opt5_btn];
    var emp_opt_arr = [this.opt1, this.opt2, this.opt3, this.opt4, this.opt5];

    mainDiv.append(leftDiv);
    mainDiv.append(rightDiv);

    leftDiv.append('<div><label for="first_name">Name</label>');
    leftDiv.append(first_name_field);
    leftDiv.append('</div>');
    leftDiv.append('<div><label for="first_name">Last Name</label>');
    leftDiv.append(last_name_field);
    leftDiv.append('</div>');
    leftDiv.append('<div><label for="first_name">E-Mail</label>');
    leftDiv.append(e_mail_field);
    leftDiv.append('</div>');

    for(var i = 0; i < opt_btn_arr.length; i++){
        setStatus(emp_opt_arr[i], opt_btn_arr[i]);
        rightDiv.append(opt_btn_arr[i]);
    }

    el.append(mainDiv);
    el.append(btn_save);
    el.append(btn_delete);
    $('#dataContainer').append(el);



    btn_save.on('click', function(){

        for(var p = 0; p < opt_btn_arr.length; p++){
            changeBtnStatus(opt_btn_arr[p]);
        }

        var serverReq = {
            first_name: first_name_field.val(),
            last_name: last_name_field.val(),
            e_mail: e_mail_field.val(),
            opt1: changeBtnStatus(opt1_btn),
            opt2: changeBtnStatus(opt2_btn),
            opt3: changeBtnStatus(opt3_btn),
            opt4: changeBtnStatus(opt4_btn),
            opt5: changeBtnStatus(opt5_btn)
        };

        jQuery.ajax({
            method: 'PUT',
            url: 'api/update/' + self.id,
            data: serverReq,
            success: function(data) {
                alert(data.message);
            },
            error: function(err) {
                alert('ERROR !!!')
            }
        });

    });

    btn_delete.on('click', function(){

        jQuery.ajax({
            method: 'DELETE',
            url: 'api/del/' + self.id,
            success: function(data) {
                alert(data.message);
                el.remove();
            },
            error: function(){
                alert("Error Deleting Employee");
            }
        });
    });
};



function setStatus(opt, check_box){
    check_box.prop('checked', opt);
}

function changeBtnStatus(check_box){
   if(check_box.prop('checked')){
       return true;
   } else {
       return false;
   }
}