Accounts.ui.config({
    forceEmailLowercase: true,
    forceUsernameLowercase: true,
    forcePasswordLowercase: true,
    extraSignupFields : [{
        fieldName: 'fullName',
        fieldLabel: 'Full Name',
        inputType: 'text',
        visible: true,
        validate: function(value, errorFunction) {
            if (!value) {
                errorFunction("Please write your Full Name");
                return false;
            } else {
                return true;
            }
        }
    }]
});