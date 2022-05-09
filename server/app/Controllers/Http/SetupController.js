'use strict'

const AddInstructor = use('App/Models/AddInstructor');
const AddDisciplineArea = use('App/Models/AddDisciplineArea')
const AddSection = use('App/Models/AddSection');
const Database = use('Database')

class SetupController {
    async setup({request}) {
        return 'Some test';
    }

    async addInstructor({request}) 
    {
        const {Last_Name, Max_Course_Load} = request.all();
        console.log(Last_Name, Max_Course_Load);

        const userInstructor = await AddInstructor.create(
        {
            Last_Name,
            Max_Course_Load,
        });

        const{Discipline_ID} = request.all();
        console.log(Discipline_ID);
        const userDisciplineArea = await AddDisciplineArea.create(
        {
            Instructor_ID : userIntstructor.id, Discipline_ID 
        });

        return{ userInstructor, userDisciplineArea,  message: 'Thank you for your input'};  
    }

    async deleteInstructor({request})
    {
        
    }

    async addSection({request}) {
        const {
            Course_Reference_Number, 
            Section_Number,

            Meeting_Period_1_Days,
            Meeting_Period_1_Start,
            Meeting_Period_1_End,

            Meeting_Period_2_Days,
            Meeting_Period_2_Start,
            Meeting_Period_2_End,

            Meeting_Period_3_Days,
            Meeting_Period_3_Start,
            Meeting_Period_3_End
        } = request.all();

        //prints data to console
        console.log( Course_Reference_Number, Section_Number, Meeting_Period_1_Days, Meeting_Period_1_Start, Meeting_Period_1_End,
                     Meeting_Period_2_Days,Meeting_Period_2_Start,Meeting_Period_2_End, 
                     Meeting_Period_3_Days, Meeting_Period_3_Start, Meeting_Period_3_End) 

        const userSection = await AddSection.create({ //instead of creating a User, create a Request
            Course_Reference_Number, 
            Section_Number,

            Meeting_Period_1_Days,
            Meeting_Period_1_Start,
            Meeting_Period_1_End,

            Meeting_Period_2_Days,
            Meeting_Period_2_Start,
            Meeting_Period_2_End,

            Meeting_Period_3_Days,
            Meeting_Period_3_Start,
            Meeting_Period_3_End
        });
        return{ 
            userSection,
            message: 'Thank you for your input',
        };
    }

  async deleteSection({request, params}) {
        await Database
            .query()
            .from('sections')
            .where('id', params.id)
            .delete()
        console.log("The row id: "+ params.id + " has been deleted.")
        return{message: "The row id: "+ params.id + " has been deleted."}
    }
}

module.exports = SetupController
