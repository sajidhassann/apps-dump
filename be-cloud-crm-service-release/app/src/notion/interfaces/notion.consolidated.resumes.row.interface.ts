export interface INotionConsolidatedResumesRow {
  'Full Name': {
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
  Email: {
    email: string;
  };
  'Phone Number': {
    phone_number: string;
  };
  University: {
    rich_text: {
      type: 'text';
      text: {
        content: string;
      };
    };
  };
  Major: {
    rich_text: {
      type: 'text';
      text: {
        content: string;
      };
    };
  };
  'Graduation Year': number;
  'Why do you want to join Maqsad?': {
    rich_text: {
      type: 'text';
      text: {
        content: string;
      };
    };
  };
  Resume: {
    files: [
      {
        type: 'external';
        name: string;
        external: {
          url: string;
        };
      },
    ];
  };
  source: {
    select: {
      name: string;
    };
  };
}
