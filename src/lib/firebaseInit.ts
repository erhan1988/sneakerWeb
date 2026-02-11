/**
 * Firebase Product Initialization Script
 * 
 * To use this script:
 * 1. Open your browser console in the app
 * 2. Copy and paste this code
 * 3. Run: initializeFirebaseProducts()
 * 
 * This will add all products to your Firebase Firestore database
 */

import { db } from './firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { allProducts } from '../data/products';

export async function initializeFirebaseProducts() {
  try {
    console.log('Starting to add products to Firebase...');
    
    const productsCollection = collection(db, 'products');
    
    for (const product of allProducts) {
      await setDoc(doc(productsCollection, product.id.toString()), {
        id: product.id,
        name: product.name,
        price: product.price,
        priceNum: product.priceNum,
        category: product.category,
        image: product.image,
        isNew: product.isNew
      });
      
      console.log(`Added product: ${product.name}`);
    }
    
    console.log('✅ All products have been successfully added to Firebase!');
  } catch (error) {
    console.error('❌ Error adding products to Firebase:', error);
  }
}
