import { DocumentList, DocumentListItemStatusDemoContent } from './document-list.models';

export const documentListContent: DocumentList<DocumentListItemStatusDemoContent> = {
  items: [
    {
      title: 'Omgevingsplan gemeente Gouda',
      type: 'Omgevingsplan',
      owner: 'Gemeente Gouda',
      status: {
        badge: {
          status: "warning",
          message: "Ontwerp",
        },
        date: 'Bekendgemaakt 01-03-2021 dfgdfgd dfgdfgdfg dfgdfgdfg dfgdfgd dfgdfgdg dfgdfgdfg sdfsdfsdfsdfsdf sdfsdfsdfsdfsdf sdfsdfsdfsdfsdf'
      }
    },
    {
      title: 'Omgevingsplan gemeente Gooise Meren',
      type: 'Omgevingsplan',
      owner: 'Gemeente Gooise Meren',
      status: {
        badge: {
          status: "warning",
          message: "Ontwerp",
        },
        date: 'In werking vanaf 01-10-2022'
      }
    }
  ]
};
