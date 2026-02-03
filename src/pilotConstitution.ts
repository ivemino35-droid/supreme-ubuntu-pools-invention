export interface ConstitutionClause {
  id: string;
  title: string;
  content: string;
}

export const PILOT_FAMILY_CONSTITUTION = {
  name: "Ubuntu Pools Pilot Constitution: Family Emergency & Education Pool",
  version: "v1.0",
  poolType: "family_emergency_education",
  clauses: [
    {
      id: "p1",
      title: "1. Purpose",
      content: "This Pool exists to build a shared family emergency reserve and to save for agreed education-related milestones. Funds may only be used for medical emergencies, funeral support, school fees/tertiary registration, or another purpose explicitly approved by vote."
    },
    {
      id: "p2",
      title: "2. Membership and Roles",
      content: "Roles include Custodian (1–2), Contributors (2–12), optional Observers, and an optional Successor. New members require majority approval (50%+1) and a 30-day observation period before full privileges."
    },
    {
      id: "p3",
      title: "3. Contributions",
      content: "Members contribute a fixed monthly amount with a 7-day grace period. Contributions are locked by default. One missed contribution triggers a warning; two consecutive misses pause voting rights; three consecutive misses trigger a member review vote."
    },
    {
      id: "p4",
      title: "4. Reserve Allocation",
      content: "30% of each contribution is allocated to the Emergency Reserve and 70% to Education/Milestone savings. This split is recorded transparently and cannot be changed without a Two-Thirds vote."
    },
    {
      id: "p5",
      title: "5. Emergency Release",
      content: "Emergency release requires a request submission and a simple majority vote (50%+1) within a 72-hour voting window. Upon approval, the emergency portion is released immediately to the approved beneficiary."
    },
    {
      id: "p6",
      title: "6. Education Milestone Release",
      content: "Education releases require milestone verification and a Two-Thirds (⅔) majority vote, followed by a 14-day time lock (cool-off period) before funds are released."
    },
    {
      id: "p7",
      title: "7. Governance Rules",
      content: "Each Contributor has one vote. Quorum requires 60% participation. Custodians do not have veto power. All votes are time-stamped, visible to members, and immutable."
    },
    {
      id: "p8",
      title: "8. Trust and Accountability",
      content: "Family trust is earned through consistent contribution, governance participation, and orderly conduct. Trust is contextual and decays slowly over time. Reduced trust may temporarily pause privileges, but does not impose automatic punishment."
    },
    {
      id: "p9",
      title: "9. Succession and Continuity",
      content: "Custodians may name a Successor. Role transfer occurs with a 30-day cooling period. Trust recognition may be granted up to 30% and must be re-earned through behavior. The Pool survives member exits."
    },
    {
      id: "p10",
      title: "10. Disputes and Process Integrity",
      content: "Disputes follow: (1) internal discussion (7 days), (2) a formal vote, (3) a platform-mediated process review limited to verifying that agreed rules were followed. Ubuntu Pools enforces process, not outcomes."
    }
  ]
} as const;
