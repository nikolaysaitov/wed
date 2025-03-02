export interface ProjectCards {
  nameCard: string;
  buttonLastDisabled: boolean;
  buttonDelete: boolean;
  published: boolean;
  }
  
  export const PROJECTS: ProjectCards[] = [
    {
      nameCard: 'Стандартный',
      buttonLastDisabled: true,
      buttonDelete: true,
      published: true,
    },
    // {
    //   nameCard: 'Стандартный',
    //   buttonLastDisabled: false,
    //   buttonDelete: true,
    //   published: false,
    // },
    {
      nameCard: 'Стандартный',
      buttonLastDisabled: true,
      buttonDelete: true,
      published: true,
    },
    {
      nameCard: 'Стандартный',
      buttonLastDisabled: true,
      buttonDelete: true,
      published: false,
    },
    {
      nameCard: 'Стандартный',
      buttonLastDisabled: false,
      buttonDelete: true,
      published: false,
    }
  ];