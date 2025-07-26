export interface ContactCreate {
	name: string
	number: string
	email?: string | null
}

export interface ContactUpdate {
	name?: string
	number?: string
	email?: string | null
}
