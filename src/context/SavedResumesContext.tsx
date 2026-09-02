import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react';

import { ResumeData } from './ResumeContext';

export interface SavedResume {
  id: string;
  createdAt: string;
  updatedAt: string;
  data: ResumeData;
}

interface SavedResumesContextData {
  savedResumes: SavedResume[];

  saveResume: (resume: ResumeData) => void;

  updateResume: (
    id: string,
    resume: ResumeData,
  ) => void;

  deleteResume: (id: string) => void;
}

const SavedResumesContext =
  createContext<
    SavedResumesContextData | undefined
  >(undefined);

interface SavedResumesProviderProps {
  children: ReactNode;
}

export function SavedResumesProvider({
  children,
}: SavedResumesProviderProps) {
  const [savedResumes, setSavedResumes] =
    useState<SavedResume[]>([]);

  function saveResume(
    resume: ResumeData,
  ) {
    const now = new Date().toISOString();

    const newResume: SavedResume = {
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
      data: resume,
    };

    setSavedResumes((current) => [
      ...current,
      newResume,
    ]);
  }

  function updateResume(
    id: string,
    resume: ResumeData,
  ) {
    setSavedResumes((current) =>
      current.map((item) => {
        if (item.id !== id) {
          return item;
        }

        return {
          ...item,
          updatedAt: new Date().toISOString(),
          data: resume,
        };
      }),
    );
  }

  function deleteResume(id: string) {
    setSavedResumes((current) =>
      current.filter(
        (resume) => resume.id !== id,
      ),
    );
  }

  return (
    <SavedResumesContext.Provider
      value={{
        savedResumes,
        saveResume,
        updateResume,
        deleteResume,
      }}
    >
      {children}
    </SavedResumesContext.Provider>
  );
}

export function useSavedResumes() {
  const context =
    useContext(SavedResumesContext);

  if (!context) {
    throw new Error(
      'useSavedResumes deve ser usado dentro de SavedResumesProvider',
    );
  }

  return context;
}