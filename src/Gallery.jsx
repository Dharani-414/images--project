import React from 'react';
import axios from "axios";
import { useGlobalContext } from './Context';
import { useQuery } from '@tanstack/react-query';



const url =`https://api.unsplash.com/search/photos/?client_id=${import.meta.env.VITE_API_KEY}`;

console.log(import.meta.env.VITE_API_KEY); 

const Gallery = () => {
  const { searchItem} = useGlobalContext();

 const response = useQuery({
    queryKey:["images",searchItem],
    queryFn: async ()=>{
    const result = await axios.get(`${url}&query=${searchItem}`);
   
    return result.data;
    },
  });
  //console.log(response);

//isLoading -->method like it checks true or false
 if(response.isLoading) {
  return (
    <section  className="image-container">
      <h4>Loading....</h4>
    </section>
  );
 }
 if(response.isError) {
  return (
    <section  className="image-container">
      <h4>there was an error</h4>
    </section>
  );
 }



 const results = response.data.results;
  if(results.length<1){
    return (
      <section>
        <h4>no result found</h4>
      </section>
    )
  }
  return (
    <section className="image-container">
     {results.map((item)=>{
      const url = item?.urls?.regular;
      return (
        <img src={url} alt={item.description} key={item.id} className='img'/>
      );
     })}

    </section>
  );
};

export default Gallery;




