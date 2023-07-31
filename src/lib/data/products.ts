// Create separate data vs database functionality, because importing anything from
// The database folder causes the entire script to be downloaded, including leaking
// Any secrets/keys that are in the database folder.
// This also causes a large bundle size increase for any libraries needed only server side.
export function getProductById(products: any[], id: string) {
  return products.find(product => product.id === id)
}