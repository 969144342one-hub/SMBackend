import mongoose from "mongoose";

// --- SCHEMAS ---

const userSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);


const entrySchema = new mongoose.Schema({
  day: { type: String, required: true }, // "Monday", "Tuesday" etc
  // Each day has up to 4 columns (like the image)
  columns: [
    {
      panel: { type: String, default: "" },  // 3-digit e.g. "689"
      jodi:  { type: String, default: "" },  // 2-digit e.g. "35"
      digit: { type: String, default: "" },  // 1-digit e.g. "3"
    },
  ],
});
 
const guessingChartSchema = new mongoose.Schema(
  {
    gameId:        { type: mongoose.Schema.Types.ObjectId, ref: "AllGame", required: true },
    gameName:      { type: String, required: true },
    noOfDays:      { type: Number, enum: [5, 6, 7], required: true },
    weekStartDate: { type: Date, required: true }, // always Monday
    entries:       [entrySchema],
  },
  { timestamps: true }
);

const allGamesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    owner: { type: String, required: true },
    resultNo: { type: Array },
    noOfDays:{type: Number},
    openNo: { type: Array },
    closeNo: { type: Array },
    startTime: { type: String, required: true },
    liveTime: { type: Number, default: null },
    endTime: { type: String, required: true },
    fontSize: { type: String },
    Notification_Message: { type: Array },
    nameColor: { type: String }, // default black
    resultColor: { type: String }, // default black
    panelColor: { type: String }, // default white
    notificationColor: { type: String },
    valid_date: {type: Date}, // Corrected 'require' to 'required'
    amount :{type: String}, // Corrected 'require' to 'required'
    method: {type: String}, // Corrected 'require' to 'required'
    status:{type: String}, // Corrected 'require' to 'required'
    IsNotification:{type:String}
  },
  { timestamps: true }
);

const endpointSchema = new mongoose.Schema({
  url: {
    type: String,
  },
  ArrayOfGames:{
    type:Array,
  },
  enabled: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const liveResultSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    owner: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  { timestamps: true }
);

const AgentListSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Corrected 'require' to 'required'
  owner: { type: String, required: true }, // Corrected 'require' to 'required'
});

const payMentBalanceRateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    owner: { type: String, required: true },
    TotalAmout: { type: String, required: true },
    TotalDay: { type: String, required: true },
    startTime: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  { timestamps: true }
);

const NotificationSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  index: { 
    type: String, 
    required: true 
  }
}, {
  timestamps: true 
});

// --- MODELS ---
const User = mongoose.model("User", userSchema);
const AllGames = mongoose.model("AllGames", allGamesSchema);
const LiveResult = mongoose.model("LiveResult", liveResultSchema);
const Notification = mongoose.model('Notification', NotificationSchema);
const PayMentBalanceRate = mongoose.model(
  "PayMentBalanceRate",
  payMentBalanceRateSchema
);
// ⚠️ ADDED: Model for AgentListSchema
const AgentList = mongoose.model("AgentList", AgentListSchema);

const endPointSchemaUrl = mongoose.model("Endpoint", endpointSchema);

const GuessingChart = mongoose.model("GuessingChart", guessingChartSchema);

// Export them (ESM way)
export { User, AllGames, GuessingChart, LiveResult, PayMentBalanceRate, Notification, AgentList, endPointSchemaUrl };

// Export them (ESM way)
// export { User, AllGames, LiveResult, PayMentBalanceRate, Notification, AgentList };