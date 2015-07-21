Template.register.events({
    'click #btnRegister' : function(e,t){
        e.preventDefault();
        var model = {
            username : $('#txtUsername').val() || '',
            email : $('#txtEmail').val() || '',
            password : $('txtPassword2').val() || ''
        }
        var isValidate = _.find(_.keys(model),function(k){
            return !_.isEmpty(model[k])
        });
        if(isValidate){

        }
    }
});

Template.register.rendered = function(){
    $('#frmRegister').validator();
}