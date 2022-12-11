// /**
//  * @license
//  * Copyright 2022 Google LLC
//  *
//  * Licensed under the Apache License, Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  *
//  *   http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
//  */

import { async } from '@firebase/util';
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc, where } from 'firebase/firestore'; 
import { db } from './firebase';
import { getDownloadURL } from './storage';

const RECEIPTS_COLLECTION = 'receipts';

export function addReceipt(uid, date, locationName, address, items, amount, imageBucket) {
  addDoc(collection(db, RECEIPTS_COLLECTION), { uid, date, locationName, address, items, amount, imageBucket });
}
 

export async function getReceipts(uid, setReceipts, setIsLoadingReceipts) {
    const receiptsQuery = query(collection(db, RECEIPTS_COLLECTION), where("uid", "==", uid), orderBy("date", "desc"));
    
  const unsubscibe = onSnapshot(receiptsQuery, async (snapshot) =>{

  
  let allReceipts = [];
  for (const documentSnapshot of (await snapshot).docs) {
       const receipt = documentSnapshot.data();
    await allReceipts.push({
          ...receipt,
        date: receipt['date'].toDate(),
        id: documentSnapshot.id,
        imageUrl: await getDownloadURL(receipt['imageBucket'])
    });
  }
  setReceipts(allReceipts);
  setIsLoadingReceipts(false);
});
return unsubscibe;
   
}

export function updateReceipt(docId, uid, date, locationName, address, items, amount, imageBucket) {
  setDoc(doc(db, RECEIPTS_COLLECTION, docId), { uid, date, locationName, address, items, amount, imageBucket });
}

export function deleteReceipt(id) {
  deleteDoc(doc(db, RECEIPTS_COLLECTION, id));
}