export type NextToken = string | null;

export interface ListFunctionProps {
   limit?: number
   nextToken?: NextToken
}

export type ListFunctionReturnType<T> = {
   items: T[]
   nextToken: NextToken
};
