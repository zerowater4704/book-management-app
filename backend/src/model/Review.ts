import mongoose, { Schema, Document } from "mongoose";

interface IReview extends Document {
  book: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  content: string;
  rating: number;
}

const reviewSchema: Schema = new Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  rating: {
    type: Number,
    require: true,
    max: 5,
    min: 1,
  },
});

export default mongoose.model<IReview>("Review", reviewSchema);
