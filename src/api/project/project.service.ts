import { AxiosService } from '@api/axios.service.ts';
import {
  Project,
  ProjectCreate,
  Questionnaire,
  ShortProject
} from '@api/project/project.ts';

class ProjectService extends AxiosService {
  async getAllProjects(userId: string): Promise<Project[]> {
    const url = `/projects`;
    this.headers = { 'x-user-Id': userId };

    try {
      const response = await this._client.get<Project[]>(url, this.headers);

      return response.data;
    } catch (error) {
      throw new Error(
        `Error getting data from ${url}: ${JSON.stringify(error)}`
      );
    }
  }

  async getAllShortProjects(userId: string): Promise<ShortProject[]> {
    const url = `/projects/short`;
    this.headers = { 'x-user-Id': userId };

    try {
      const response = await this._client.get<ShortProject[]>(
        url,
        this.headers
      );

      return response.data;
    } catch (error) {
      throw new Error(
        `Error getting data from ${url}: ${JSON.stringify(error)}`
      );
    }
  }

  async getQuestionnairesByProjectId(
    userId: string,
    projectId: string
  ): Promise<Questionnaire[]> {
    const url = `/projects/questionnaire`;
    this.headers = { 'x-user-Id': userId };

    try {
      const response = await this._client.get<Questionnaire[]>(url, {
        ...this.headers,
        params: { projectId }
      });

      return response.data;
    } catch (error) {
      throw new Error(
        `Error getting data from ${url}: ${JSON.stringify(error)}`
      );
    }
  }

  async createProject(project: ProjectCreate) {
    const url = `/projects`;
    this.headers = { 'x-user-Id': project.userId };
    console.log(this.headers);
    try {
      const response = await this._client.post<Partial<Project>>(
        url,
        project,
        this.headers
      );

      return response.data;
    } catch (error) {
      throw new Error(
        `Error getting data from ${url}: ${JSON.stringify(error)}`
      );
    }
  }

  async deleteProject(projectId: string): Promise<Project[]> {
    const url = `/projects/${projectId}`;

    try {
      const response = await this._client.delete<Project[]>(url, this.headers);

      return response.data;
    } catch (error) {
      throw new Error(
        `Error getting data from ${url}: ${JSON.stringify(error)}`
      );
    }
  }
}

export default new ProjectService();
