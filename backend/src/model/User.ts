import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  image?: string;
}

const userSchema: Schema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
  },
  image: { type: String },
});

export default mongoose.model<IUser>("User", userSchema);
