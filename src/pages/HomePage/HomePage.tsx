import { ProjectCard } from '../../components/ui/ProjectCard';
import { PROJECTS } from '../Dashboard';

export const HomePage = () => {
  return (
    <div>
      <h1 className="text-text-primary mb-6 text-2xl font-bold">
        Мои проекты
      </h1>
      <div className="gap-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((progect) => (
          <ProjectCard key={progect.title} {...progect} />
        ))}
      </div>
    </div>
  );
};
