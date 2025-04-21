
import { Injury, RecoveryProgram, User, BodyPart } from '@/types';

// Mock Injuries Data
export const mockInjuries: Injury[] = [
  {
    id: '1',
    name: 'Ankle Sprain',
    bodyPart: 'ankle',
    severity: 'moderate',
    description: 'A twisted ankle causing damage to the ligaments',
    imageUrl: '/images/injuries/ankle-sprain.jpg',
    recommendedPrograms: ['1', '5'],
  },
  {
    id: '2',
    name: 'Rotator Cuff Strain',
    bodyPart: 'shoulder',
    severity: 'moderate',
    description: 'Strain to the muscles and tendons that stabilize the shoulder',
    imageUrl: '/images/injuries/rotator-cuff.jpg',
    recommendedPrograms: ['2'],
  },
  {
    id: '3',
    name: 'Lower Back Strain',
    bodyPart: 'back',
    severity: 'mild',
    description: 'Stretching or tearing of the muscles in the lower back',
    imageUrl: '/images/injuries/lower-back.jpg',
    recommendedPrograms: ['3'],
  },
  {
    id: '4',
    name: 'Tennis Elbow',
    bodyPart: 'elbow',
    severity: 'mild',
    description: 'Inflammation of the tendons that join the forearm muscles to the elbow',
    imageUrl: '/images/injuries/tennis-elbow.jpg',
    recommendedPrograms: ['4'],
  },
  {
    id: '5',
    name: 'Knee Meniscus Tear',
    bodyPart: 'knee',
    severity: 'severe',
    description: 'Tear in the cartilage that provides cushioning for the knee joint',
    imageUrl: '/images/injuries/knee-meniscus.jpg',
    recommendedPrograms: ['6'],
  },
];

// Mock Recovery Programs
export const mockPrograms: RecoveryProgram[] = [
  {
    id: '1',
    name: 'Ankle Sprain Recovery',
    description: 'A comprehensive program to recover from ankle sprains of varying severity',
    targetInjury: 'ankle',
    durationWeeks: 6,
    difficulty: 'beginner',
    imageUrl: '/images/programs/ankle-recovery.jpg',
    phases: [
      {
        id: 'p1-1',
        name: 'Rest & Protect',
        description: 'Initial phase focused on protecting the ankle and reducing swelling',
        durationDays: 7,
        exercises: [
          {
            id: 'e1-1',
            name: 'Ankle Alphabet',
            description: 'Trace the alphabet with your toe to gently mobilize the ankle',
            instructions: [
              'Sit in a chair with your feet flat on the floor',
              'Lift the injured foot slightly off the ground',
              'Using your big toe as a pointer, trace each letter of the alphabet in the air',
              'Move only your ankle, not your entire leg',
            ],
            sets: 1,
            reps: 26, // A-Z
            targetMuscles: ['ankle flexors', 'ankle extensors'],
            tips: ['Move slowly and gently', 'Stop if pain increases'],
            modifications: [
              {
                id: 'm1-1',
                name: 'Partial Alphabet',
                description: 'Just do A-M if a full alphabet is too much',
                difficulty: 'easier',
              }
            ],
          },
          {
            id: 'e1-2',
            name: 'Ankle Isometrics',
            description: 'Strengthen ankle muscles without movement',
            instructions: [
              'Sit with your ankle at a 90-degree angle',
              'Press foot downward against the floor without moving',
              'Hold for 5 seconds, then relax',
              'Repeat in all four directions: down, up, in, and out',
            ],
            sets: 3,
            reps: 10,
            targetMuscles: ['ankle stabilizers', 'tibialis anterior'],
            tips: ['Keep the pressure gentle', 'Breathe normally during holds'],
            modifications: [],
          },
        ],
      },
      {
        id: 'p1-2',
        name: 'Mobility & Initial Strengthening',
        description: 'Gradually introducing controlled movements and light strengthening',
        durationDays: 14,
        exercises: [
          {
            id: 'e1-3',
            name: 'Ankle Circles',
            description: 'Gentle rotational movement of the ankle joint',
            instructions: [
              'Sit in a chair with feet off the ground',
              'Slowly rotate your ankle in clockwise circles',
              'After completing the set, rotate counterclockwise',
            ],
            sets: 2,
            reps: 10,
            targetMuscles: ['ankle stabilizers'],
            tips: ['Keep movements slow and controlled'],
            modifications: [],
          },
          {
            id: 'e1-4',
            name: 'Resistance Band Eversion',
            description: 'Strengthening the lateral ankle with controlled resistance',
            instructions: [
              'Sit with legs extended and loop a resistance band around both feet',
              'Keeping heels on the floor, rotate feet outward against the band',
              'Hold for 2 seconds, then return to start',
            ],
            sets: 3,
            reps: 15,
            targetMuscles: ['peroneus longus', 'peroneus brevis'],
            tips: ['Use light resistance initially', 'Focus on control, not speed'],
            modifications: [
              {
                id: 'm1-2',
                name: 'No Resistance',
                description: 'Perform without a band if too difficult',
                difficulty: 'easier',
              }
            ],
          },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Rotator Cuff Rehabilitation',
    description: 'Designed to heal and strengthen the rotator cuff muscles after injury',
    targetInjury: 'shoulder',
    durationWeeks: 8,
    difficulty: 'intermediate',
    imageUrl: '/images/programs/shoulder-rehab.jpg',
    phases: [
      {
        id: 'p2-1',
        name: 'Pain Management & Protection',
        description: 'Initial focus on reducing pain and preventing further injury',
        durationDays: 7,
        exercises: [
          {
            id: 'e2-1',
            name: 'Pendulum Exercise',
            description: 'Gentle shoulder movement using gravity',
            instructions: [
              'Lean forward and support yourself with your non-injured arm',
              'Let the injured arm hang freely',
              'Gently swing the arm in small circles',
              'Gradually increase the circle size as tolerated',
            ],
            sets: 3,
            reps: 10,
            targetMuscles: ['rotator cuff'],
            tips: ['Keep movements small and pain-free', 'Let gravity do the work'],
            modifications: [],
          },
        ],
      },
    ],
  },
  {
    id: '3',
    name: 'Lower Back Recovery Program',
    description: 'A gentle approach to healing lower back strains and preventing recurrence',
    targetInjury: 'back',
    durationWeeks: 6,
    difficulty: 'beginner',
    imageUrl: '/images/programs/back-recovery.jpg',
    phases: [
      {
        id: 'p3-1',
        name: 'Initial Recovery',
        description: 'Focus on pain reduction and gentle movement',
        durationDays: 7,
        exercises: [
          {
            id: 'e3-1',
            name: 'Pelvic Tilts',
            description: 'Gentle movement to mobilize the lower back',
            instructions: [
              'Lie on your back with knees bent and feet flat on the floor',
              'Tighten your stomach muscles and flatten your back against the floor',
              'Hold for 5 seconds, then relax',
            ],
            sets: 3,
            reps: 10,
            targetMuscles: ['core stabilizers', 'lower back'],
            tips: ['Focus on subtle movement', 'Use your breath - exhale during the tilt'],
            modifications: [],
          },
        ],
      },
    ],
  },
];

// Mock User
export const mockUser: User = {
  id: 'user1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  profilePicture: '/images/profile/default-avatar.jpg',
  injuries: [mockInjuries[0]], // Ankle sprain
  activePrograms: [mockPrograms[0]], // Ankle recovery program
  completedPrograms: [],
  progressStats: {
    programsCompleted: 0,
    exercisesCompleted: 12,
    currentStreak: 3,
    longestStreak: 5,
    weeklyProgress: [
      {
        weekStartDate: '2024-04-14',
        daysActive: 5,
        exercisesCompleted: 12,
        minutesActive: 95,
      },
    ],
    painLevels: [
      {
        date: '2024-04-14',
        level: 6,
        bodyPart: 'ankle',
        notes: 'Initial injury pain level',
      },
      {
        date: '2024-04-17',
        level: 4,
        bodyPart: 'ankle',
        notes: 'Showing improvement after following program',
      },
      {
        date: '2024-04-20',
        level: 3,
        bodyPart: 'ankle',
        notes: 'Continuing to improve',
      },
    ],
  },
};
