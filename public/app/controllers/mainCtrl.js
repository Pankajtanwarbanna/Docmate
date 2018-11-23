angular.module('mainController', ['userServices'])

.controller('mainCtrl', function ($rootScope) {

    var app = this;

    $rootScope.$on('$routeChangeStart', function (event, next, current) {

        //console.log('user is changing routes');
        //console.log($window.location.pathname);
        if (next.$$route) {
            //console.log('we are not at home page');
            app.home = false;
        } else {
            app.home = true;
        }
    });
})


.controller('docmateCtrl', function ($timeout) {
    var app = this;

    app.step = 1;
    app.feverStep = 1;
    app.errorMsg = false;
    app.symptoms = ['FEVER','HEADACHE','JOINT PAIN'];
    app.selectedSymp = [];
    app.numberofSelectedSymptoms = 0;

    app.selectSymp = function(symptom) {
        //console.log(app.symptom);
        if(app.selectedSymp.indexOf(app.symptom) === -1) {
            if(app.symptom === 'FEVER') {
                console.log('Fever Selected.');
                $('#myModal').modal('show');
            } else {
                app.selectedSymp.push(app.symptom);
                app.numberofSelectedSymptoms = app.numberofSelectedSymptoms + 1;
            }

        } else {
            app.errorMsg = 'Symptom Already Selected.';
            $timeout(function () {
                app.errorMsg = '';
            },2000);
        }
        //console.log(app.selectedSymp);
    };

    app.removeSymp = function(choicesymptom) {
        //console.log(app.choicesymptom);
        //console.log(choicesymptom);
        if(choicesymptom === 'FEVER') {
            app.temp = '';
            app.feverStep = 1;
        }
        app.numberofSelectedSymptoms = app.numberofSelectedSymptoms - 1;
        //console.log(app.numberofSelectedSymptoms);

        var i = app.selectedSymp.indexOf(choicesymptom);
        //console.log(i);
        app.selectedSymp.splice(i,1);
    };


    app.register = function (infoData) {
        //console.log(app.infoData);
        if(!app.infoData || !app.infoData.gender) {
            app.errorMsg = 'Please select Gender.'
        } else if(!app.infoData.age) {
            app.errorMsg = 'Please select Age.'
        } else {
            app.gender = app.infoData.gender;
            app.age = app.infoData.age;
            app.step = 2;
            app.errorMsg = '';
        }

    };

    app.fever = function (feverData) {

        if(!app.feverData) {
            app.errorMsg = 'Please refine your Symptoms!'
        } else {
            //$('#myModal').modal('hide');
            app.errorMsg = '';
            //app.step = 3;
        }
    };

    app.addSymptom = function(newsymptom) {
        $('#addsymptom').modal('hide');
        app.symptoms.push(app.newsymptom.toUpperCase());
        //console.log(app.newsymptom);
    };

    app.next = function () {
        app.step = 3;
    };

    app.details = function (disease) {
        console.log(disease);
        //console.log(app.disease);
        app.disease = disease;
        app.step = 4;
    };

    app.addnewsymptom = function (newsymptom) {
        console.log(newsymptom);
        if(!newsymptom) {
            app.errorMsg = 'Please select Symptom.';
        } else {
            app.successMsg = 'Symptom added.';
        }
        $timeout(function () {
            app.successMsg = '';
            app.errorMsg = '';
        }, 1500);
        //console.log(app.symptom);
        /*
        if(app.selectedSymp.indexOf(newsymptom) === -1) {

            if(app.symptom === 'FEVER') {
                console.log('Fever Selected.');
                $('#myModal').modal('show');
            }

            app.selectedSymp.push(newsymptom);
            app.numberofSelectedSymptoms = app.numberofSelectedSymptoms + 1;
        } else {
            app.errorMsg = 'Symptom Already Selected.';
            $timeout(function () {
                app.errorMsg = '';
            },2000);
        }
        */
    };

    app.feverTemp = function () {
        //console.log('Testing');
        if(!app.temp) {
            app.ModelerrorMsg = 'Please select Temperature.'
        } else {
            app.ModelerrorMsg = '';
            app.feverStep = 2;
        }
    };
    app.feverDays = function() {
        if(!app.days) {
            app.ModelerrorMsg = 'Please select days.'
        } else {
            app.ModelerrorMsg = '';
            $('#myModal').modal('hide');
            app.feverStep = 1;
            app.selectedSymp.push('FEVER');
            app.numberofSelectedSymptoms = app.numberofSelectedSymptoms + 1;
        }
    };

    app.Firstskip = function () {
        app.ModelerrorMsg = '';
        app.feverStep = 2;
        app.temp = '';
    };
    app.secondSkip = function () {
        app.ModelerrorMsg = '';
        $('#myModal').modal('hide');
        app.days = '';
        app.feverStep = 1;
        app.selectedSymp.push('FEVER');
        app.numberofSelectedSymptoms = app.numberofSelectedSymptoms + 1;
    }
});