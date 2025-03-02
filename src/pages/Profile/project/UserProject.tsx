import { useCallback, useEffect, useState } from 'react';
import { CheckCurrentSection } from '@ui/checkCurrentSection/CheckCurrentSection.tsx';
import { ProjectsCarousel } from '@ui/project-carousel/ProjectsCarousel';
import { PopularCarousel } from '@ui/carousel/popular/PopularCarousel';
import { Button } from '../../../components-ui/button/Button';

import styles from './UserProject.module.scss';
import { useUnit } from 'effector-react';
import { $user } from '@api/user';
import projectService from '@api/project/project.service.ts';
import { ShortProject } from '@api/project/project.ts';

export function UserProject() {
  const currentUser = useUnit($user);
  const [isPosition, setIsPosition] = useState(true);
  const [projects, setProjects] = useState<ShortProject[]>([]);

  useEffect(() => {
    if (!currentUser?.id) {
      return;
    }

    projectService.getAllShortProjects(currentUser.id).then((projects) => {
      console.log(projects);
      setProjects(projects);
    });
  }, [currentUser]);

  const handleDeleteProject = useCallback((projectId: string) => {
    projectService.deleteProject(projectId).then(() => {
      setProjects((prev) => prev.filter(({ id }) => id !== projectId));
    });
  }, []);

  return (
    <CheckCurrentSection className={styles.page} sectionName={'profile'}>
      <h2 className={styles.title}>Мои приглашения</h2>
      {(projects && (
        <div className={styles.myInvites}>
          <div className={styles.position}>
            <p className={styles.positionText}>Вид:</p>
            <button
              className={`${styles.positionButtonLine} ${
                isPosition ? styles.positionActive : styles.positionNoActive
              }`}
              onClick={() => {
                setIsPosition(true);
              }}
            ></button>
            <button
              className={`${styles.positionButtonGrid} ${
                isPosition ? styles.positionNoActive : styles.positionActive
              }`}
              onClick={() => {
                setIsPosition(false);
              }}
            ></button>
          </div>
          {projects.map((project) => (
            <ProjectsCarousel
              key={project.id}
              isPosition={isPosition}
              project={project}
              deleteProject={handleDeleteProject}
            />
          ))}
        </div>
      )) || (
        <div className={styles.boxNoIvine}>
          <div className={styles.containText}>
            <p className={styles.noInviteText}>У вас пока нет приглашений</p>
            <div className={styles.button}>
              <Button wide={true}>Выбрать приглашение</Button>
            </div>
          </div>
          <div className={styles.popular}>
            <h3 className={styles.title}>Популярные</h3>
            <PopularCarousel />
          </div>
        </div>
      )}
    </CheckCurrentSection>
  );
}
