import { gql } from 'apollo-server';

export default gql`
   extend type Query {
     findProfile: Profile
   }
   type User {
     _id: ID
     username: String
     emails: [Email]
     name: String
     token: String
     email: String
     password: String
     user_type: Int
     img: String
     token: String!
     ssoToken: String
     email: String!
     username: String!
   }
   type Email {
    address: String
    verified: Boolean
   }
   type Profle {
    firstName: String
    lastName: String
     birthdate: Date
     organizationId: String
     sourceUserId: String
     sex: String
     height: Int
     weight: Int
     city:  String 
     doctorId: String
     careManagement: {
       type:  String 
     }
     goals: {
       activity: Int
       activityGoal: Boolean
       activityGoalUpdatedAt: Date
       bloodPressureGoal: Boolean
       bloodPressureGoalUpdatedAt: Date
       diastolic: Number
       glucose: Number
       glucoseGoal: Boolean
       glucoseGoalUpdatedAt: Date
       systolic: Number
       undefinedUpdatedAt: Date
       weight: Number
       weightGoal: Boolean
       weightGoalUpdatedAt: Date
    }
   }`
