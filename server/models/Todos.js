const mongoose=require('mongoose')//יבוא הספרייה

const todosSchema=new mongoose.Schema(//הגדרת הסכמה
    {title:{
        type:String,
        required:true
    },
    tags:{type:[String]
    },
    completed:{
        type:Boolean,
        default:false
    }},//פרמטר ראשון אוביקט של שדות 
    {timestamps:true}//פרמטר שני מאפיינים נוספים

)

//ייצוא
module.exports=mongoose.model('Todos',todosSchema)