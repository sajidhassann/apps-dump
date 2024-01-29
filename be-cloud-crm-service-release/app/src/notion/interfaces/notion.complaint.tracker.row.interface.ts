export interface INotionComplaintTrackerRow {
  'Issue description': {
    id: 'title';
    type: 'title';
    title: [
      {
        text: {
          content: string;
        };
      },
    ];
  };
  'App Version': {
    id: string;
    type: 'select';
    select: {
      name: string;
    };
  };
  'User Number (on Maqsad)': {
    id: string;
    type: 'phone_number';
    phone_number: string;
  };
  'Date Issued': {
    id: string;
    type: 'created_time';
    created_time: string;
  };
  'Person Assigned': {
    id: string;
    type: 'people';
    people: {
      object: 'user';
      id: string;
      name: string;
      avatar_url: string | null;
      type: 'person';
      person: {
        email: string;
      };
    }[];
  };
  'Complaint ID': {
    id: string;
    type: 'formula';
    formula: {
      type: 'string';
      string: string;
    };
  };
  Priority: {
    id: string;
    type: 'select';
    select: {
      id: string;
      name: string;
      color: string;
    };
  };
  Status: {
    id: string;
    type: 'status';
    status: {
      id: string;
      name: string;
      color: string;
    };
  };
  Source: {
    id: string;
    type: 'multi_select';
    multi_select: {
      id: string;
      name: string;
      color: string;
    }[];
  };
  'Support Agent': {
    id: string;
    type: 'people';
    people: {
      object: 'user';
      id: string;
      name: string;
      avatar_url: string | null;
      type: 'person';
      person: {
        email: string;
      };
    }[];
  };
  'Team ': {
    id: string;
    type: 'multi_select';
    multi_select: {
      id: string;
      name: string;
      color: string;
    }[];
  };
  'Type ': {
    id: string;
    type: 'multi_select';
    multi_select: {
      id: string;
      name: string;
      color: string;
    }[];
  };
  'Date resolved': {
    id: string;
    type: 'date';
    date: string | null;
  };
  Archive: {
    id: string;
    type: 'checkbox';
    checkbox: boolean;
  };
}
