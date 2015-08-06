/**
 * Created by nxcong on 06/08/2015.
 */
if(Meteor.isServer){
    Meteor.startup(function(){
        setupSMTP();
        setupMeteorEmailConfig();
    });

    var setupSMTP = function(){
        var smtpCfg = JSON.parse(Assets.getText('private/smtp.json'));
        if(smtpCfg){
            var tpl = _.template("smtp://<%=username%>:<%=password%>@<%=server%>:<%=port%>/"),
                MAIL_URL = tpl({
                    username : encodeURIComponent(smtpCfg.username),
                    password : encodeURIComponent(smtpCfg.password),
                    server : encodeURIComponent(smtpCfg.server),
                    port : smtpCfg.port
                });

            //process.env.MAIL_URL = MAIL_URL;

            Mandrill.config({
                username: smtpCfg.username,  // the email address you log into Mandrill with. Only used to set MAIL_URL.
                key: smtpCfg.password,  // get your Mandrill key from https://mandrillapp.com/settings/index
                // port: 587,  // defaults to 465 for SMTP over TLS
                host: smtpCfg.server  // the SMTP host
                // baseUrl: 'https://mandrillapp.com/api/1.0/'  // update this in case Mandrill changes its API endpoint URL or version
            });
        }
    }

    var setupMeteorEmailConfig = function(){
        Accounts.config({
            sendVerificationEmail : true
        })
        Accounts.emailTemplates.headers = {
            'X-MC-AutoText': true
        };
        Accounts.emailTemplates.from = 'PriceBuddy <no-reply@pricebuddy.xyz>';
        Accounts.emailTemplates.siteName = 'Price Buddy';
        Accounts.emailTemplates.verifyEmail.subject = function(user) {
            return 'Welcome to PriceBuddy!';
        };

        Accounts.emailTemplates.verifyEmail.html = function(user, url) {
            var welcomeData = [
                {
                    "name": "fullname",
                    "content": user.profile.fullName
                },
                {
                    "name": "email",
                    "content": user.emails[0].address
                },
                {
                    "name" : "verify",
                    "content": url
                }
            ]
            var result;
            try{
                result = Mandrill.templates.render({
                    template_name : 'welcome-to-pricebuddy',
                    template_content : welcomeData,
                    merge_vars : welcomeData
                });
            }catch(ex){
                console.error('Error while rending template, ', ex);
            }
            return result.html;
        };
    }
}