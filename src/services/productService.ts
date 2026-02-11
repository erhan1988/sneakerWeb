import { db } from '../lib/firebase';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { allProducts as staticProducts } from '../data/products';

export interface Product {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  category: string;
  image: string;
  isNew: boolean;
}

// Fetch all products from Firebase
export const fetchProductsFromFirebase = async (): Promise<Product[]> => {
  try {
    const productsCollection = collection(db, 'products');
    const snapshot = await getDocs(productsCollection);
    
    const products: Product[] = [];
    snapshot.forEach((doc) => {
      products.push({
        id: doc.data().id,
        name: doc.data().name,
        price: doc.data().price,
        priceNum: doc.data().priceNum,
        category: doc.data().category,
        image: doc.data().image,
        isNew: doc.data().isNew
      });
    });
    
    // Sort by id to maintain consistent order
    return products.sort((a, b) => a.id - b.id);
  } catch (error) {
    console.error('Error fetching products from Firebase:', error);
    return [];
  }
};

// Initialize products in Firebase (add all static products)
export const initializeProductsInFirebase = async (): Promise<void> => {
  try {
    console.log('🚀 Starting to add products to Firebase...');
    
    const productsCollection = collection(db, 'products');
    
    for (const product of staticProducts) {
      await setDoc(doc(productsCollection, product.id.toString()), {
        id: product.id,
        name: product.name,
        price: product.price,
        priceNum: product.priceNum,
        category: product.category,
        image: product.image,
        isNew: product.isNew
      });
      
      console.log(`✅ Added: ${product.name}`);
    }
    
    console.log('🎉 All products successfully added to Firebase!');
    alert('✅ Products added to Firebase successfully!');
  } catch (error) {
    console.error('❌ Error adding products to Firebase:', error);
    alert('❌ Error: ' + (error as any).message);
  }
};
