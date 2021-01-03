const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const questions = require("./lib/questions");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let teamBuild = [];

const addTeamMember = () => {
    inquirer.prompt(questions)
    .then(function (ask) {
        if (ask.Role === 'Manager') {
            inquirer.prompt([
                        {
                            type: 'input',
                            message: 'Enter your office number',
                            name: 'officeNum'
                        }])
                        .then(function(next) {
                            console.log(`Welcome ${ask.Name} in Office ${next.officeNum}`);
                            teamBuild.push(new Manager(
                                ask.Name, 
                                ask.Id, 
                                ask.Email, 
                                next.officeNum));
                        });   
        } else if (ask.Role === 'Engineer') {
            inquirer.prompt([
                        {
                            type: 'input',
                            message: 'Enter your GitHub username',
                            name: 'github'
                        }]).then(function(next) {
                            console.log(`Welcome ${ask.Name} on Github as ${next.github}`);
                            teamBuild.push(new Engineer(
                                ask.Name, 
                                ask.Id, 
                                ask.Email, 
                                next.github));
                        })
        } else if (ask.Role === 'Intern') {
            inquirer.prompt([
                        {
                            type: 'input',
                            message: 'Enter your school',
                            name: 'school'
                        }])
                        .then(function(next) {
                            console.log(`Welcome ${ask.Name} from ${next.school}`);
                            teamBuild.push(new Intern(
                                ask.Name, 
                                ask.Id, 
                                ask.Email, 
                                next.school));
                        });
        } else {
            return 'Invalid input yo';
        }
    })
}


// function call to initialize program
addTeamMember();
