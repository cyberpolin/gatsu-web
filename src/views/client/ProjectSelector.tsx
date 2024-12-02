import useProjects from '../../utils/hooks/UseProjects';

const ProjectSelector = ({
  selectedProject,
  onProjectSelected,
}: {
  selectedProject: string | null;
  onProjectSelected: (id: string) => void;
}) => {
  const { projects } = useProjects();
  console.log('>>', projects);

  return (
    <div>
      <select
        className="border border-gray-300 rounded-md p-2 w-full my-2"
        value={selectedProject || ''}
        onChange={(e) => onProjectSelected(e.target.value)}
      >
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProjectSelector;
