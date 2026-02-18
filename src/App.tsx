import { MainLayout } from './components/layout/MainLayout';
import { ProjectCard } from './components/ui/ProjectCard';

import { PROJECTS } from '../pages/Dashboard';

function App() {
  return (
    <>
      <MainLayout>
        <div className="gap-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </MainLayout>
    </>
  );
}

export default App;
