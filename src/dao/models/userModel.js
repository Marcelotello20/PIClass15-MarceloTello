import mongoose from "mongoose";
import { createHash } from "../../utils/cryptoUtil.js";

const userCollection = "users";

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    age: {
        type: Number,
        min: 18,
        require: true
    },
    password: {
        type: String,
        hash: true,
        require: true
    },
    cart: {
        type: [
            {
                cart: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "carts",
                }
            }
        ],
        default: []
    },
    role:{
        type:String,
        default: "user"
    }
});

userSchema.pre("save", function () {
    this.password = createHash(this.password);
});

const userModel = mongoose.model(userCollection, userSchema);
export default userModel;