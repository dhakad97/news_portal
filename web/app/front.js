var app=angular.module("NewsPortal",['ngRoute'])
app.config(function($routeProvider)
{
    $routeProvider
    .when('/',
    {
        templateUrl:'pages/front.html',
        controller:'frntCtrl'
    })
     .when('/login',
    {
        templateUrl:'pages/login.html',
        controller:function($scope)
        {
            $scope.SignInButton=function()
             {
        gapi.signin.render('signInButton',
            {
                'callback': $scope.signInCallback, // Function handling the callback.
                'clientid': '602843109661-l0i7obannr43hsahnv971q6lfojc57n7.apps.googleusercontent.com', // CLIENT_ID from developer console which has been explained earlier.
                'requestvisibleactions': 'http://schemas.google.com/AddActivity', // Visible actions, scope and cookie policy wont be described now,
                                                                                  // as their explanation is available in Google+ API Documentation.
                'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
                'cookiepolicy': 'single_host_origin'
            }
        );
    }
        }
    })
     .when('/signup',
    {
        templateUrl:'pages/regis.html',
        controller:function($scope,$http)
        {
            $scope.regis=function()
            {
               $http.post("http://localhost:8045/signup",$scope.myData).then(function(res)
               {
                   console.log(res.data.msg)
               })
            }
        }
    })
     .when('/single/:ndat',
    {
        templateUrl:'pages/single.html',
        controller:function($scope,$routeParams,$http)
        {
            dat=$routeParams.ndat;
            $http.get("http://localhost:8045/single/"+dat).then(function(res)
            {
                console.log(res.data)
            })
        }
    })

 .when('/category/:cname',
    {
        templateUrl:'pages/catnews.html',
        controller:function($scope,$routeParams,$http)
        {
            cname=$routeParams.cname;
            $http.get("http://localhost:8045/catnews/"+cname).then(function(res)
            {
                console.log(res.data)
            })
        }
    })
})
app.controller('frntCtrl',function($scope,$http)
{
  $http.get("http://localhost:8045/news").then(function(res)
  {
     $scope.news=res.data.mesg;
     console.log(res.data.mesg);
  })
})
app.controller('MainCtrl',function($scope,$http)
{
    $scope.search=function()
    {
       ser=$scope.ser;
       if(ser!="")
       {
           $http.get("http://localhost:8045/search/"+ser).then(function(res)
           {

           })
       }
    }
})