import User from "../model/user.model.js";   // Import the model
import bcryptjs from "bcryptjs"
export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const hashPassword= await bcryptjs.hash(password,10)
    const newUser = new User({
      fullname :fullname,
      email:email,
      password:hashPassword, // ⚠️ should hash before saving in production!
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const login=async (req,res)=>{
  try {
    const{email,password}= req.body;
    const user = await User.findOne({email})
    const isMatch= await bcryptjs.compare( password,user.password)
    if(!user || !isMatch) {
      return res.status(400).json({message:"invalid username or password",user:{

        _id:createduser._id,
        fullname:createduser.fullname,
        email:createduser.email,

      }
    })

    }else{
      res.status(200).json({message:"login successful",user:{
        _id:user._id,
        fullname:user.fullname,
        email:user.email
      }})
    }
  } catch (error) {
    console.log("Error:"+error.message)
    res.status(500).json({message:"internal server error"})

    
  }
}

