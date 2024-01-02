const mongoose = require('mongoose')//יבוא הספרייה

const usersSchema = new mongoose.Schema(//הגדרת הסכמה
    {
        name: {
            type: String,
            required: true
        }, username: {
            type: String,
            //required: true
        }, email: {
            type: String
        }, address: {
            type: String
        }, phone: {
            type: String,
            maxLength: 15
        }
    },//פרמטר ראשון אוביקט של שדות 
    { timestamps: true }//פרמטר שני מאפיינים נוספים

)

//ייצוא
module.exports = mongoose.model('Users', usersSchema)