export class Queries {
   public static readonly GetAuthUserData = `
        query GetUserData($id: ID!) {
		  getDoubtSolver(id: $id) {
		    createdAt
		    email
		    fname
		    id
		    isActive
		    lname
		    role
		    status
		    subjects
		    updatedAt
		  }
		}
    `;
}
