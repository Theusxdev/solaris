import AppNavigator from './src/navigation/AppNavigator';

import { ResumeProvider } from './src/context/ResumeContext';
import { SavedResumesProvider } from './src/context/SavedResumesContext';

export default function App() {
  return (
    <ResumeProvider>
      <SavedResumesProvider>
        <AppNavigator />
      </SavedResumesProvider>
    </ResumeProvider>
  );
}