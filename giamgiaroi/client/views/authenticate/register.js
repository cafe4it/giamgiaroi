Template.register.events({
    'click #btnRegister' : function(e,t){
        e.preventDefault();
        var model = {
            username : $('#txtUsername').val() || '',
            email : $('#txtEmail').val() || '',
            password : $('#txtPassword2').val() || ''
        }
        var isNotValidate = _.find(_.keys(model),function(k){
            return _.isEmpty(model[k])
        });
        if(!isNotValidate){
            console.log(_.keys(model),model);
        }
    }
});

Template.register.rendered = function(){
    $('#frmRegister').validator();
}