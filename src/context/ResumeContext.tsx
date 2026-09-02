import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react';

export interface PersonalData {
  name: string;
  email: string;
  phone: string;
  city: string;
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  course: string;
  institution: string;
  startDate: string;
  endDate: string;
}

export interface ProfessionalObjective {
  desiredPosition: string;
  area: string;
  level: string;
  description: string;
}

export interface ResumeData {
  personal: PersonalData;

  experiences: Experience[];

  education: Education[];

  skills: string[];

  objective: ProfessionalObjective;
}

interface ResumeContextData {
  resume: ResumeData;

  updatePersonal: (
    data: Partial<PersonalData>,
  ) => void;

  addExperience: (
    experience: Experience,
  ) => void;

  removeExperience: (
    id: string,
  ) => void;

  addEducation: (
    education: Education,
  ) => void;

  removeEducation: (
    id: string,
  ) => void;

  addSkill: (
    skill: string,
  ) => void;

  removeSkill: (
    skill: string,
  ) => void;

  updateObjective: (
    data: Partial<ProfessionalObjective>,
  ) => void;

  clearResume: () => void;
}

const initialResume: ResumeData = {
  personal: {
    name: '',
    email: '',
    phone: '',
    city: '',
  },

  experiences: [],

  education: [],

  skills: [],

  objective: {
    desiredPosition: '',
    area: '',
    level: '',
    description: '',
  },
};

const ResumeContext =
  createContext<ResumeContextData | undefined>(
    undefined,
  );

interface ResumeProviderProps {
  children: ReactNode;
}

export function ResumeProvider({
  children,
}: ResumeProviderProps) {
  const [resume, setResume] =
    useState<ResumeData>(initialResume);

  function updatePersonal(
    data: Partial<PersonalData>,
  ) {
    setResume((current) => ({
      ...current,

      personal: {
        ...current.personal,
        ...data,
      },
    }));
  }

  function addExperience(
    experience: Experience,
  ) {
    setResume((current) => ({
      ...current,

      experiences: [
        ...current.experiences,
        experience,
      ],
    }));
  }

  function removeExperience(
    id: string,
  ) {
    setResume((current) => ({
      ...current,

      experiences:
        current.experiences.filter(
          (experience) =>
            experience.id !== id,
        ),
    }));
  }

  function addEducation(
    education: Education,
  ) {
    setResume((current) => ({
      ...current,

      education: [
        ...current.education,
        education,
      ],
    }));
  }

  function removeEducation(
    id: string,
  ) {
    setResume((current) => ({
      ...current,

      education:
        current.education.filter(
          (item) => item.id !== id,
        ),
    }));
  }

  function addSkill(
    skill: string,
  ) {
    const normalizedSkill =
      skill.trim();

    if (!normalizedSkill) {
      return;
    }

    setResume((current) => {
      const exists =
        current.skills.some(
          (item) =>
            item.toLowerCase() ===
            normalizedSkill.toLowerCase(),
        );

      if (exists) {
        return current;
      }

      return {
        ...current,

        skills: [
          ...current.skills,
          normalizedSkill,
        ],
      };
    });
  }

  function removeSkill(
    skill: string,
  ) {
    setResume((current) => ({
      ...current,

      skills:
        current.skills.filter(
          (item) => item !== skill,
        ),
    }));
  }

  function updateObjective(
    data: Partial<ProfessionalObjective>,
  ) {
    setResume((current) => ({
      ...current,

      objective: {
        ...current.objective,
        ...data,
      },
    }));
  }

  function clearResume() {
    setResume(initialResume);
  }

  return (
    <ResumeContext.Provider
      value={{
        resume,

        updatePersonal,

        addExperience,
        removeExperience,

        addEducation,
        removeEducation,

        addSkill,
        removeSkill,

        updateObjective,

        clearResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context =
    useContext(ResumeContext);

  if (!context) {
    throw new Error(
      'useResume deve ser usado dentro de ResumeProvider',
    );
  }

  return context;
}