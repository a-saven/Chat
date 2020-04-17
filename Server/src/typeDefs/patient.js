import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    patient(id: String): Patient,
  }
  type Patient {
    firstName: String,
    lastName: String,
    visitDate: String,
    doctor: String,
    organization: String,
    medications: [Medication],
    goals: [Goal]
  }
  type Medication {
    name: String,
    dosageInfo: String
  }
  type Goal {
    indicator: String,
    value: Int,
  }
`