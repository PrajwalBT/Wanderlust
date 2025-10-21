const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review")

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    // type: Schema.Types.Mixed,
    type: String,
    default: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg",
    set: (v) => (v === "" || v == null)? "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg" : v,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review"
    },
  ],
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if(listing) {
    await Review.deleteMany({_id : {$in: listing.reviews}});
  }
})

// model => class => collection("Listing")
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;