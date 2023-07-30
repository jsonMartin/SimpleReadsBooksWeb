import { get, writable } from 'svelte/store';
import { csv } from 'csvtojson';
import { generateTestImage } from "../helpers";


const TEST_PRODUCTS = [
  {
    id: 'hunnie-bunnys-garden',
    title: 'Hunnie Bunny’s Garden',
    type: 'book',
    description: `Hunnie Bunny’s Garden is an enchanting picture book that brings children closer to nature, instills valuable virtues and ignites a sense of responsibility towards our environment.
Through the endearing character of Hunnie Bunny, it’s a delightful blend of entertainment and education. This book also promotes discussions about nature, gardening, sustainability, and healthy eating. If you are looking for a children’s book that offers both a charming story and important life lessons, Hunnie Bunny’s Garden is the book for you!`,
    price: 20.99,
    images: [
      {
        id: 0,
        imgurl: '/images/hunnie-bunnys-garden-book-cover-front-1.png'
      },
      {
        id: 1,
        imgurl: '/images/hunnie-bunnys-garden-book-cover-back-1.png'
      },
      {
        id: 2,
        imgurl: '/images/hunnie-bunnys-garden-page-1.png'
      },
      {
        id: 3,
        imgurl: '/images/hunnie-bunnys-garden-page-2.png'
      },
      {
        id: 4,
        imgurl: '/images/hunnie-bunnys-garden-book-cover.png'
      }
    ]
  },
  {
    id: 'hunnie-bunnys-garden-mystery',
    title: 'Hunnie Bunny’s Garden Mystery',
    type: 'book',
    description: `Hunnie Bunny’s Garden Mystery is the next upcoming book in the Hunnie Bunny Series.`,
    price: 20.99,
    images: Array(4).fill({ id: 0, imgurl: '' }).map((item, index) => {
      return {
        id: index,
        imgurl: generateTestImage().imgurl
      };
    })
  },
  {
    id: 'hunnie-bunnys-third-story',
    title: 'Hunnie Bunny’s Third Story',
    type: 'book',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl quis tincidunt aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Sed euismod, nisl quis tincidunt aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.`,
    price: 20.99,
    images: Array(4).fill({ id: 0, imgurl: '' }).map((item, index) => {
      return {
        id: index,
        imgurl: generateTestImage().imgurl
      };
    })
  },
  {
    id: 'hunnie-bunnys-christmas-story',
    title: 'Hunnie Bunny’s Christmas Story',
    type: 'book',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl quis tincidunt aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Sed euismod, nisl quis tincidunt aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.`,
    price: 20.99,
    images: Array(4).fill({ id: 0, imgurl: '' }).map((item, index) => {
      return {
        id: index,
        imgurl: generateTestImage().imgurl
      };
    })
  }
]

export function getProductById(products: any[], id: string) {
  return products.find(product => product.id === id)
}

export async function fetchProductData(googleSheetsUrl: string) { // Takes a public Google Sheets URL and syncs the data to the products store
  const results = await fetch(googleSheetsUrl);
  const body = await results.text();

  const spreadsheetData = await csv().fromString(body);

  const productData = spreadsheetData.map((row: any) => ({
    ...row,
    images: JSON.parse(row.images)
  }));

  return productData;
}
