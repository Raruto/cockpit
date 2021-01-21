if (!window.FormData) return;

var form        = document.getElementById("{{ $options['id'] }}"),
    msgsuccess  = form.getElementsByClassName("form-message-success").item(0),
    msgfail     = form.getElementsByClassName("form-message-fail").item(0),
    disableForm = function(status) {
        for(var i=0, max=form.elements.length;i<max;i++) form.elements[i].disabled = status;
    },
    success     = function(){
        if (msgsuccess) {
            msgsuccess.style.display = 'block';
        } else {
            alert("@lang('Form submission was successful.')");
        }
    },
    fail        = function(){
        if (msgfail) {
            msgfail.style.display = 'block';
        } else {
            alert("@lang('Form submission failed.')");
        }
    };

if (msgsuccess) msgsuccess.style.display = "none";
if (msgfail)    msgfail.style.display = "none";

var submit = function(_success, _fail) {

    _success = _success || success;
    _fail    = _fail || fail;

    if (msgsuccess) msgsuccess.style.display = "none";
    if (msgfail)    msgfail.style.display = "none";

    var xhr = new XMLHttpRequest(), data = new FormData(form);

    xhr.onload = function(){

        if (this.status == 200 && this.responseText!='false') {
            _success();
            form.reset();
        } else {
            _fail();
        }

        disableForm(false);
    };

    disableForm(true);

    xhr.open('POST', "@route('/api/forms/submit/'.$name)", true);
    xhr.send(data);
};

form.addEventListener("submit", function(e) {

    e.preventDefault();

    var callback = window['beforeSubmit{{ $name }}'] || function(submit) {
        submit();
    }

    callback(submit);

}, false);
