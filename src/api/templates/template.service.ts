import { AxiosService } from '../axios.service.ts';
import { ITemplate, PaginatedTemplate } from '@api/templates/template.ts';
import { IChunk } from '@api/utils/chunk.ts';

class TemplateService extends AxiosService {
  async getTmplById(id: string): Promise<string> {
    const url = `/templates/${id}`;

    try {
      const response = await this._client.get<string>(url, this.headers);

      return response.data;
    } catch (error) {
      throw new Error(
        `Error getting data from ${url}: ${JSON.stringify(error)}`
      );
    }
  }

  async getTemplateAssetsById(): Promise<any> {
    const url = `/templates/assets/m1`;

    try {
      const response = await this._client.get<string>(url, this.headers);

      return response.data;
    } catch (error) {
      throw new Error(
        `Error getting data from ${url}: ${JSON.stringify(error)}`
      );
    }
  }

  async getAllTemplates(params: IChunk): Promise<PaginatedTemplate> {
    const url = `/templates/all`;

    try {
      const { data } = await this._client.get<PaginatedTemplate>(url, {
        ...this.headers,
        params: params
      });

      return data;
    } catch (error) {
      throw new Error(
        `Error getting data from ${url}: ${JSON.stringify(error)}`
      );
    }
  }

  async getLikedTemplates(userId: string): Promise<ITemplate[]> {
    const url = `/templates/liked/${userId}`;

    try {
      const { data } = await this._client.get<ITemplate[]>(url, this.headers);

      return data;
    } catch (error) {
      throw new Error(
        `Error getting data from ${url}: ${JSON.stringify(error)}`
      );
    }
  }
}

export default new TemplateService();
