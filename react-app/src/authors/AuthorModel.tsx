export type AuthorModel = {
  id: string 
  firstName: string
  lastName: string
  salesCount: number
}

export type CreateAuthorModel = {
  id: string
  firstName: string
  lastName: string
  
}

export type UpdateAuthorModel = Partial<CreateAuthorModel>
