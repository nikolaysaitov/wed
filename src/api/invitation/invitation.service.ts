import { AxiosService } from '@api/axios.service.ts';
import {
  createInvitation,
  FullInvitation,
  Invitation,
  InvitationCreate
} from '@api/invitation/invitation.ts';

class InvitationService extends AxiosService {
  async getAllInvitations(userId: string): Promise<Invitation[]> {
    const url = `/invitations`;
    this.headers = { 'X-User-Id': userId };

    try {
      const response = await this._client.get<Invitation[]>(url, this.headers);

      return response.data;
    } catch (error) {
      throw new Error(
        `Error getting data from ${url}: ${JSON.stringify(error)}`
      );
    }
  }

  async getInvitationById(id: string): Promise<Invitation> {
    const url = `/invitations/${id}`;
    // this.headers = { 'X-User-Id': userId };

    try {
      const response = await this._client.get<Invitation>(url, this.headers);

      return response.data;
    } catch (error) {
      throw new Error(
        `Error getting data from ${url}: ${JSON.stringify(error)}`
      );
    }
  }

  async createInvitation(
    invitation: InvitationCreate
  ): Promise<Partial<FullInvitation>> {
    const url = `/invitations`;
    this.headers = { 'X-User-Id': invitation.userId };

    console.log(invitation, createInvitation(invitation));

    try {
      const response = await this._client.post<Partial<FullInvitation>>(
        url,
        createInvitation(invitation),
        this.headers
      );

      return response.data;
    } catch (error) {
      throw new Error(
        `Error getting data from ${url}: ${JSON.stringify(error)}`
      );
    }
  }
}

export default new InvitationService();
