import { Schema, model, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

// Base user fields
export interface IUser {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

// Document type with methods
export interface IUserDocument extends IUser, Document {
  comparePassword(candidate: string): Promise<boolean>;
}

// Model type
export interface IUserModel extends Model<IUserDocument> {}

const userSchema = new Schema<IUserDocument>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [50, "Username cannot exceed 50 characters"],
      trim: true,
      match: [/^[a-zA-Z0-9_]+$/, "Only letters, numbers, underscores allowed"],
      unique: true,
      index: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
      index: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      validate: {
        validator: (value: string) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(
            value
          ),
        message:
          "Password must contain uppercase, lowercase, number, and special character",
      },
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

// Hash password before saving
userSchema.pre<IUserDocument>("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});


// Compare password
userSchema.method(
  "comparePassword",
  async function (this: IUserDocument, candidate: string): Promise<boolean> {
    return bcrypt.compare(candidate, this.password);
  }
);


export const UserModel = model<IUserDocument, IUserModel>("User", userSchema);
