import hash from "./hash";

export default class HashMap {
  #load_factor = 0.75
  constructor (capacity) {
    this.capacity = capacity;
    this.bucketArray = [];
    for (let i=0; i<capacity; i++) { this.bucketArray.push({}) };

    this.checkLoadFactor = () => {
      let nodeCount = 0;
      this.bucketArray.forEach((node) => { if(Object.keys(node).length>0) {nodeCount++;} });
      console.log(nodeCount)
      console.log(nodeCount/this.capacity)
      if ((nodeCount/this.capacity) > this.#load_factor) {
        //grow capacity and redistribute all nodes accordingly
        this.capacity
      };
    };

    this.set = (key, value) => {
      const hashCode = hash(key);
      const bucketIdx = hashCode % this.capacity;

      // if bucket is empty, store the key value pair
      if (Object.keys(this.bucketArray[bucketIdx]).length==0) {
        this.bucketArray[bucketIdx] = {
          'key': key, 
          'value': value, 
          'next': null,
        };
      } else {
        let lastObj;
        let tempObj = this.bucketArray[bucketIdx];
        let isPlaced = false;
        // if we have the same key in the bucket - replace the value
        while (tempObj) {
          if (hashCode==hash(tempObj.key)) { 
            tempObj.value = value; 
            
            isPlaced = true;
            break; };
          lastObj=tempObj;
          tempObj=tempObj.next;
        };
        // else push the new key-value pair to the end of the bucket
        if(!isPlaced) lastObj.next= {
            'key': key,
            'value': value,
            'next': null
          };
      };
      // check load capacity
      console.log(JSON.stringify(this.bucketArray))
      this.checkLoadFactor();
    };


  }
}

