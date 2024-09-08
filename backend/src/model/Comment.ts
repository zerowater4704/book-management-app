import mongoose, { Schema, Document } from "mongoose";

interface IComment extends Document {
  book: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  comment: string;
  rating: number;
  likeCount: number;
  dislikeCount: number;
}

const commentSchema: Schema = new Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  dislikeCount: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model<IComment>("Review", commentSchema);
