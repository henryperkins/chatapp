import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectManager = ({ setSelectedProject }) => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', description: '', systemRole: '' });

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await axios.get('/api/projects');
      setProjects(response.data);
    };
    fetchProjects();
  }, []);

  const createProject = async () => {
    const response = await axios.post('/api/projects/create', newProject);
    if (response.data.success) {
      setProjects([...projects, response.data.project]);
      setNewProject({ name: '', description: '', systemRole: '' });
    }
  };

  return (
    <div>
      <h2>Projects</h2>
      <input
        type="text"
        value={newProject.name}
        onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
        placeholder="Project Name"
      />
      <textarea
        value={newProject.description}
        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
        placeholder="Project Description"
      />
      <textarea
        value={newProject.systemRole}
        onChange={(e) => setNewProject({ ...newProject, systemRole: e.target.value })}
        placeholder="System Role"
      />
      <button onClick={createProject}>Create Project</button>
      <ul>
        {projects.map((project) => (
          <li key={project._id} onClick={() => setSelectedProject(project)}>
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectManager;