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
                inquirer.prompt([{
                        type: 'input',
                        message: 'Enter your office number',
                        name: 'officeNum'
                    }])
                    .then(function (next) {
                        console.log(`Welcome ${ask.Name} in Office ${next.officeNum}`);
                        teamBuild.push(new Manager(
                            ask.Name,
                            ask.Id,
                            ask.Email,
                            next.officeNum));
                        final();
                    });
            } else if (ask.Role === 'Engineer') {
                inquirer.prompt([{
                    type: 'input',
                    message: 'Enter your GitHub username',
                    name: 'github'
                }]).then(function (next) {
                    console.log(`Welcome ${ask.Name} on Github as ${next.github}`);
                    teamBuild.push(new Engineer(
                        ask.Name,
                        ask.Id,
                        ask.Email,
                        next.github));
                    final();
                })
            } else if (ask.Role === 'Intern') {
                inquirer.prompt([{
                        type: 'input',
                        message: 'Enter your school',
                        name: 'school'
                    }])
                    .then(function (next) {
                        console.log(`Welcome ${ask.Name} from ${next.school}`);
                        teamBuild.push(new Intern(
                            ask.Name,
                            ask.Id,
                            ask.Email,
                            next.school));
                        final();
                    });
            } else {
                return 'Invalid input yo';
            }
        })
}

const final = () => {
    inquirer.prompt([{
        type: 'list',
        message: 'Good to go?',
        choices: ['Yes', 'No'],
        name: 'last'
    }]).then(function (next) {
        console.log(`You have chosen ${next.last}`);
        if (next.last === 'No') {
            addTeamMember();
        } else {
            let teamrender = render(teamBuild);
            fs.writeFile("index.html", render(teamBuild), function (next, err) {
                if (err) {
                    throw err;
                } else {
                    return console.log('Done yo!');
                }
            });
        }
    });
}

// function call to initialize program
addTeamMember();