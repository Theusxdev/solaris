import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { ResumeData } from './ResumeContext';

const STORAGE_KEY = '@meuapp:saved_resumes';

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

  const [isHydrated, setIsHydrated] =
    useState(false);

  useEffect(() => {
    async function loadSavedResumes() {
      try {
        const storedResumes =
          await AsyncStorage.getItem(STORAGE_KEY);

        if (storedResumes) {
          const parsedResumes: SavedResume[] =
            JSON.parse(storedResumes);

          setSavedResumes(parsedResumes);
        }
      } catch (error) {
        console.error(
          'Erro ao carregar currículos:',
          error,
        );
      } finally {
        setIsHydrated(true);
      }
    }

    loadSavedResumes();
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    async function saveSavedResumes() {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(savedResumes),
        );
      } catch (error) {
        console.error(
          'Erro ao salvar currículos:',
          error,
        );
      }
    }

    saveSavedResumes();
  }, [savedResumes, isHydrated]);

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