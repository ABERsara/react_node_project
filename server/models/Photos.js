const mongoose=require('mongoose')//יבוא הספרייה

const photosSchema=new mongoose.Schema(//הגדרת הסכמה
    {title:{
        type:String,
        required:true
    },
    imageUrl:{type:String,
        maxLength:50
    },
    category:{
        type:String,
        default:"general"
    }},//פרמטר ראשון אוביקט של שדות 
    {timestamps:true}//פרמטר שני מאפיינים נוספים

)

//ייצוא
module.exports=mongoose.model('Photos',photosSchema)