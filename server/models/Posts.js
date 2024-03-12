const mongoose=require('mongoose')//יבוא הספרייה

const postsSchema=new mongoose.Schema(//הגדרת הסכמה
    {title:{
        type:String,
        required:true
    },
    body:{type:String,
        maxLength:300
    }
    },//פרמטר ראשון אוביקט של שדות 
    {timestamps:true}//פרמטר שני מאפיינים נוספים
)

//ייצוא
module.exports=mongoose.model('Posts',postsSchema)