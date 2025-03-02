import { AxiosService } from '@api/axios.service.ts';
import { v4 as uuid } from 'uuid';

import { Guest, IGuestQueries, IGuestRequest } from '@api/guest/guest.ts';
import { IChunk, PaginatedData } from '@api/utils/chunk.ts';
class GuestService extends AxiosService {
  async getAllByUserId(
    params: IChunk,
    userId: string
  ): Promise<PaginatedData<Guest>> {

    const url = `/guest`;
    this.headers = { 'X-User-Id': userId };

    try {
      const response = await this._client.get<PaginatedData<Guest>>(url, {
        ...this.headers,
        params: params
      });

      return response.data;
    } catch (error) {
      throw new Error(
        `Error getting data from ${url}: ${JSON.stringify(error)}`
      );
    }
  }

  async getAllByProjectId(
    userId: string,
    params: IGuestQueries,
    body: IGuestRequest
  ): Promise<PaginatedData<Guest>> {
    const url = `/guest/all`;
    //todo
    this.headers = { 'X-User-Id': userId };
    //this.headers = { 'X-User-Id': '9462c5a5-66e1-4d54-be6e-2503d5041ac0' };



    try {
      const response = await this._client.post<PaginatedData<Guest>>(
        url,
       JSON.stringify(body),
        { ...this.headers, params }
      );

      return response.data;
    } catch (error) {
      throw new Error(
        `Error getting data from ${url}: ${JSON.stringify(error)}`
      );
    }
  }

  async createByUserId(userId: string): Promise<Guest> {
    const url = `/guest`;
    this.headers = { 'X-User-Id': userId };

    try {
      const response = await this._client.post<Guest>(
        url,
        {
          userId: userId,
          id: uuid(),
          name: `User-${Math.floor(Math.random() * 100)}`,
          status: Math.floor(Math.random() * 100) % 2 === 0,
          additional:
            Math.floor(Math.random() * 100) % 2 === 0
              ? []
              : ['Саманта', 'Миранда Хоуп', 'Сюзи'],
          invitationId: 'df723585-1ce6-4c9f-b876-2cfb8d2c0b90'
        },
        this.headers
      );

      return response.data;
    } catch (error) {
      throw new Error(
        `Error getting data from ${url}: ${JSON.stringify(error)}`
      );
    }
  }

  async deleteAdditionalByUserId(
    userId: string,
    { id, name, status, additional }: Guest
  ): Promise<Guest> {
    const url = `/guest/${id}`;
    this.headers = { 'X-User-Id': userId };

    try {
      const response = await this._client.put<Guest>(
        url,
        {
          userId: userId,
          name,
          status,
          additional
        },
        this.headers
      );

      return response.data;
    } catch (error) {
      throw new Error(
        `Error getting data from ${url}: ${JSON.stringify(error)}`
      );
    }
  }

  async deleteByUserId(userId: string, guestId: string): Promise<void> {
    const url = `/guest/${guestId}`;
    this.headers = { 'X-User-Id': userId };

    try {
      const response = await this._client.delete<void>(url, this.headers);

      return response.data;
    } catch (error) {
      throw new Error(
        `Error getting data from ${url}: ${JSON.stringify(error)}`
      );
    }
  }
}

export default new GuestService();
