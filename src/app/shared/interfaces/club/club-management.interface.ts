export interface IClubManagement {

  title: string;
  description: string;
  assignedMember?: string;
  // position: IClubManagementPosition | '';

  // ordering: number;

  startDate: Date;
  endDate?: Date | '';

}
