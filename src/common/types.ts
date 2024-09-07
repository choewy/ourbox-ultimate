export type DTOConstructorType<DTO> = {
  new (init?: Partial<DTO>): DTO;
};
