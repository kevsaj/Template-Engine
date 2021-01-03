const questions = 
    [
        {
            type: 'input',
            message: 'Enter your name:',
            name: 'Name'
        },
        {
            type: 'list',
            message: 'Enter your role:',
            choices: ['Manager', 'Engineer', 'Intern'],
            name: 'Role'
        },
        {
            type: 'input',
            message: 'Enter your email:',
            name: 'Email'
        },
        {
            type: 'input',
            message: 'Enter your ID number:',
            name: 'Id'
        }
    ];

module.exports = questions;