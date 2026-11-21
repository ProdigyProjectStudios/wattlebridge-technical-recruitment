export const business = {
  name: 'Wattlebridge Technical Recruitment',
  email: 'hello@wattlebridge.example',
  telephone: '(08) 5550 0147',
  telephoneHref: 'tel:+61855500147',
  address: 'Suite 4, 18 Wattlebridge Lane, Perth WA 6000',
  hours: 'Monday to Friday, 8:30 am to 5:00 pm AWST (Perth time). Closed weekends and public holidays.',
  footer: 'IT and technical recruitment across Perth and Western Australia.',
}

export const services = [
  {
    name: 'Permanent recruitment',
    description: 'Build your team around the skills you need for the longer term.',
  },
  {
    name: 'Contract recruitment',
    description: 'Find technical capability for a defined project or changing workload.',
  },
  {
    name: 'Recruitment planning',
    description: 'Clarify a role, its priorities and the experience a successful candidate will need.',
  },
]

export const workingSteps = [
  { title: 'Understand the requirement', description: 'Discuss the role, team, priorities and practical constraints.' },
  { title: 'Agree the brief', description: 'Confirm the responsibilities, skills and recruitment approach.' },
  { title: 'Find and assess candidates', description: 'Identify relevant people and discuss their suitability.' },
  { title: 'Support the decision', description: 'Coordinate interviews, feedback and next steps with the employer and candidate.' },
]

export const audiences = ['Employer', 'Candidate'] as const
export type Audience = (typeof audiences)[number]

export const enquiryPrompts: Record<Audience, string> = {
  Employer: 'Tell us about the role or hiring challenge you would like to discuss. Include the main skills and whether you are considering permanent or contract recruitment.',
  Candidate: 'Briefly describe your experience and the opportunities that interest you. An enquiry does not guarantee an available vacancy or placement.',
}
