import { useNavigate } from 'react-router-dom';

interface ProjectCardProps {
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  path?: string;
}

export const ProjectCard = ({
  title,
  description,
  category,
  difficulty,
  path,
}: ProjectCardProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (path) {
      navigate(path);
    }
  };
  return (
    <div
      className={`group bg-card border-border-color p-lg rounded-box duration-normal hover:border-primary/50 gap-md flex cursor-pointer flex-col transition-all hover:-translate-y-1 hover:shadow-md ${
        path ? 'cursor-pointer' : 'cursor-default' // меняем курсор в зависимости от наличия пути
      }`}
      onClick={handleClick}
    >
      {/* Категория и сложность */}
      <div className="flex items-center justify-between">
        <span className="text-primary text-[10px] font-bold tracking-widest uppercase">
          {category}
        </span>
        <span
          className={`rounded-full border px-2 py-0.5 text-[10px] ${
            difficulty === 'Easy'
              ? 'border-green-500/50 text-green-500'
              : difficulty === 'Medium'
                ? 'border-yellow-500/50 text-yellow-500'
                : 'border-danger/50 text-danger'
          }`}
        >
          {difficulty}
        </span>
      </div>

      {/* Контент*/}
      <div>
        <h3 className="text-text-primary group-hover:text-primary text-lg font-bold transition-colors">
          {title}
        </h3>
        <p className="text-text-secondary mt-1 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* Футер для карточки (например индикатор "В процессе") */}
      <div className="pt-md border-border-color/50 mt-auto flex justify-end border-t">
        <span className="text-text-secondary group-hover:text-text-primary text-[10px] italic">
          Смотреть проект →
        </span>
      </div>
    </div>
  );
};
