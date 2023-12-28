

export async function get<T>(url: string){

   const response =  await fetch(url);

   if(!response.ok) throw new Error("Failed to Fetch Data");

   //extract data
   // unknown: you can't perform operations on values of type unknown without first asserting or narrowing to a more specific type.
   const data = response.json() as unknown;

   return data as T;
}