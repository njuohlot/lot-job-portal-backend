const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    tittle: { type: String, required: true },
    nature: { type: String, required: true },
    dateline: { type: Date, required: true },
    location: { type: String, required: true },
    qualification: { type: String, required: true },
    salary: { type: String, required: true },
    description: { type: String, required: true },
    companyInfo: { type: String, required: true },
    publish: { type: Date, required: true },
    vacant: { type: Number, required: true },
    country: { type: String, required: true },
    category: { type: String, required: true },
    email: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Jobs", jobSchema);