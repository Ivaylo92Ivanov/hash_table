import hash from "./hash";

export default class HashMap {
  #load_factor = 0.75
  constructor (capacity) {
    this.capacity = capacity;
    this.bucketArray = [];
    for (let i=0; i<this.capacity; i++) { this.bucketArray.push({}) };



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
      // check load capacity and grow hash map if necessary
      this.bucketArray.forEach(node => console.log(node));
      console.log('***************************');
      this.checkLoadFactor();
    };

    this.checkLoadFactor = () => {
      let nodeCount = 0;
      this.bucketArray.forEach((node) => { if(Object.keys(node).length>0) {nodeCount++;} });
      if((nodeCount/this.capacity)>this.#load_factor) this.growHashMap();
    };

    this.growHashMap = () => {
      const oldBucketArray = this.bucketArray;
      this.bucketArray = [];
      this.capacity*=2;
      for (let i=0; i<this.capacity; i++) { this.bucketArray.push({}) };
      console.log('--------------------------')
      oldBucketArray.forEach((mapNode) => {
        // if mapNode is not empty iterate over its key-value pairs and add them to a keyValuePairsFromNode array
        if(Object.keys(mapNode).length>0) {
          let keyValuePairsFromNode = [];
          while (mapNode) {             
            keyValuePairsFromNode.push([mapNode.key, mapNode.value]);
            mapNode = mapNode.next;
          };
          // add each key-value pair in the array, to the new, grown hashMap
          keyValuePairsFromNode.forEach((keyValuePair) => {
            let key = keyValuePair[0];
            let value = keyValuePair[1];
            this.set(key, value);
          });
        };
      });
    };

    this.get = (key) => {
      for (let mapNode of this.bucketArray) {
        // if mapNode is not empty iterate over its key-value pairs and check for equality
        if(Object.keys(mapNode).length>0) {
          while(mapNode) {
            if(mapNode.key==key) return mapNode.value;
            mapNode=mapNode.next;
          };
        };
      };
      // if key not in HashMap return null
      return null;
    };
    
    this.has = (key) => {

    }

    this.remove = (key) => {

    }

    this.length = () => {

    }

    this.clear = () => {
      this.bucketArray = [];
      for (let i=0; i<this.capacity; i++) { this.bucketArray.push({}) };
    };

    this.keys = () => {

    }

    this.values = () => {

    }

    this.entries = () => {

    }

  };
};

