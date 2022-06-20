import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    //unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please enter valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

UserSchema.pre("save", async function () {
  //console.log(this.modifiedPaths());//returns array of modified fields
  //console.log(this.isModified());
  if (!this.isModified("password")) return;
  // if password is NOT modified when updating user then we end the execution of this func bcs if we dont then the password will be hashed again which will change our our login credentials
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); //this points to User
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
