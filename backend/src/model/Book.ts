import mongoose, { Schema, Document } from "mongoose";

interface IBook extends Document {
  title: string;
  author: string;
  description: string;
  image?: string;
  reviews: mongoose.Schema.Types.ObjectId[];
  addedBy: mongoose.Schema.Types.ObjectId;
}

const bookSchema: Schema = new Schema({
  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
});

export default mongoose.model<IBook>("Book", bookSchema);
