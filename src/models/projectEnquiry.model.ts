
import mongoose, { Schema, Document } from 'mongoose';
import validator from 'validator';

export interface IProjectEnquiry extends Document {
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  serviceNeeded: string;
  projectDescription: string;
}

const sanitizeInput = (value: string): string => {
  return validator.escape(value.trim());
};

const ProjectEnquirySchema: Schema<IProjectEnquiry> = new Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Full name must be at least 2 characters long'],
      maxlength: [100, 'Full name cannot exceed 100 characters'],
      validate: {
        validator: (v: string) => /^[a-zA-Z\s]+$/.test(v),
        message: 'Full name must contain only letters and spaces',
      },
      set: sanitizeInput,
    },
    emailAddress: {
      type: String,
      required: [true, 'Email address is required'],
      lowercase: true,
      unique: true,
      validate: {
        validator: (v: string) => validator.isEmail(v),
        message: 'Invalid email format',
      },
      set: sanitizeInput,
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      validate: {
        validator: (v: string) => validator.isMobilePhone(v, 'any'),
        message: 'Invalid phone number',
      },
      set: sanitizeInput,
    },
    serviceNeeded: {
      type: String,
      required: [true, 'Service selection is required'],
      enum: [
        'SEO Optimization',
        'Google PPC Ads',
        'Meta Social Ads',
        'Brand Strategy',
        'Web Design & Development',
      ],
      set: sanitizeInput,
    },
    projectDescription: {
      type: String,
      required: [true, 'Project description is required'],
      minlength: [10, 'Description must be at least 10 characters long'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
      validate: {
        validator: (v: string) => !/<[^>]*>/g.test(v),
        message: 'Project description must not contain HTML or script tags',
      },
      set: sanitizeInput,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    strict: true, // ensures only defined fields are saved
  }
);

export const ProjectEnquiryModel = mongoose.model<IProjectEnquiry>(
  'ProjectEnquiry',
  ProjectEnquirySchema
);
