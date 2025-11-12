export type ClientModel = {
  id: string 
  firstName: string
  lastName: string
  email: string
  photoUrl: string
}

export type CreateClientModel = {
  id: string
  firstName: string
  lastName: string
  email: string
  photoUrl: string
}

export type UpdateClientModel = Partial<CreateClientModel>
