// Filtro base para tipos comparáveis
export type BaseFilter<T> = {
	equals?: T
	in?: T[]
	notIn?: T[]
	lt?: T
	lte?: T
	gt?: T
	gte?: T
	not?: T
}

export type EnumFilter<T> = {
	equals?: T
	in?: T[]
	notIn?: T[]
	not?: T
}

export type RelationType = 'some' | 'every' | 'none'

// String: inclui opções de "like"
export type StringFilter = BaseFilter<string> & {
	contains?: string
	startsWith?: string
	endsWith?: string
	mode?: 'insensitive' | 'default' // opcional, estilo Prisma
}

// Number (Int/Float)
export type NumberFilter = BaseFilter<number>

export type BooleanFilter = {
	equals?: boolean
	not?: boolean
}

export type DateFilter = BaseFilter<Date>
