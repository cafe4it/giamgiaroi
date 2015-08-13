var lazadaRoutes = FlowRouter.group({
    prefix : '/lz'
});

lazadaRoutes.route('/',{
    name : 'lazada_home',
    action : function(p, q){
        BlazeLayout.render('defaultLayout',{top : 'header',main : 'lazada_home', bottom : 'footer'});
    }
});