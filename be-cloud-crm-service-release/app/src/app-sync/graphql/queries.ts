export default class Query {
  public static readonly listUsersByNumber = `query MyQuery($number: String!) {
  listUsersByNumber(number: $number) {
    items {
      academicGroupID
      boardID
      id
      userGradeGroupID
    }
  }
}`;

  public static readonly getUserGradeGroup = `query MyQuery($id: ID!) {
  getUserGradeGroup(id: $id) {
    name
    academicGroup {
      items {
        name
      }
    }
    grades {
      items {
        name
        board {
          id
          name
        }
      }
    }
  }
}`;
}
