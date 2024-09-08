import mongoose, { Schema, Document } from "mongoose";

interface IBook extends Document {
  title: string;
  author: string;
  description: string;
  image?: string;
  likeCount: number;
  dislikeCount: number;
  likes: mongoose.Schema.Types.ObjectId[];
  dislikes: mongoose.Schema.Types.ObjectId[];
  comment: mongoose.Schema.Types.ObjectId[];
  addedBy: mongoose.Schema.Types.ObjectId;
}

const bookSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  dislikeCount: {
    type: Number,
    default: 0,
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  dislikes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model<IBook>("Book", bookSchema);
