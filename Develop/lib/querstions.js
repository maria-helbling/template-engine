//the default employee form questions
const questions=[
    {
        type: 'input',
        message: 'What is the employee name?',
        name: 'name',
        default: 'Unknown'
    },
    {
        type: 'input',
        message: 'What is the employee id?',
        name: 'id',
        default:'guest'
    },
    {
        type: 'input',
        message: 'What is the employee\'s email?',
        name: 'email',
        default:'info@company.com',
        validate: async input =>{
            if (input.includes('@')){
                return true
            }
            return "This doesn't look like an e-mail address "
        }
    }
]

module.exports ={ questions}