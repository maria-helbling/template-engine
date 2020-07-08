const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require('util')
const questionObj = require('./lib/querstions')

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employees = [];
const questions = questionObj.questions

//create a new Manager object
const addManager = () => {
    //push a Manager specific question to the questions array
    questions.push({
        type: 'input',
        message: 'What is the Manager\'s office number?',
        name: 'officeNumber'
    })
    //get input
    inquirer.prompt(questions).then(answers => {
        //new manager object
        const newGuy = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
        //push it to the employee array
        employees.push(newGuy)
        //start over
        inputEmployees();
    }).catch(err => err)

}

//create a new Engineer object
const addEngineer = () => {
    //push an Engineer specific question to the questions array
    questions.push({
        type: 'input',
        message: 'What is the Engineer\'s GitHub username?',
        name: 'gitHub'
    })
    //get input
    inquirer.prompt(questions).then(answers => {
        //new Engineer object
        const newGuy = new Engineer(answers.name, answers.id, answers.email, answers.gitHub)
        //push it to the employee array
        employees.push(newGuy)
        //start over
        inputEmployees();
    }).catch(err => err)

}

//create a new Intern object
const addIntern = () => {
    //push an Intern specific question to the questions array
    questions.push({
        type: 'input',
        message: 'What school does the Intern attend?',
        name: 'school'
    })
    //get input
    inquirer.prompt(questions).then(answers => {
        //new Intern object
        const newGuy = new Intern(answers.name, answers.id, answers.email, answers.school)
        //push it to the employee array
        employees.push(newGuy)
        //start over
        inputEmployees();
    }).catch(err => err)
}

const writeFileAsync = util.promisify(fs.writeFile);

//Initiate user input gathering
const inputEmployees = () => {
    //start employee input with prompt
    inquirer.prompt([{
        type: 'list',
        message: 'Pick an employee type to enter or quit.',
        name: 'type',
        choices: () => {
            //if the function runs for the firs time, we don't want the option of results rendering to show
            if (employees.length) {
                questions.pop() //this is here to restore the questions array back to the default Employee questions
                return ['Manager', 'Engineer', 'Intern', 'Render results']
            } else {
                return ['Manager', 'Engineer', 'Intern']
            }
        }
    }]).then(answer => {
        if (answer.type === 'Render results') {
            console.log('Rendering results')
            console.log(employees)
            const html = render(employees)
            writeFileAsync(outputPath,html).then(
                console.log('File created in "Output" directory')
            )

        } else if (answer.type === 'Manager') {
            addManager();
        } else if (answer.type === 'Engineer') {
            console.log('Engineer')
            addEngineer();
        } else {
            console.log('Intern')
            addIntern();
        }
    }).catch(err => err)
}

inputEmployees();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
