import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

import Navbar from "../Components/Navbar";
import RateLimitedUi from '../Components/RateLimitedUi';
import NoteCard from '../Components/NoteCard';
import api from '../lib/axios';
import NotesNotFound from '../Components/NotesNotFound' ; 



const HomePage = () => {
  const [isRatelimited, setIsRatelimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes")
        setNotes(res.data)
        setIsRatelimited(false)
      } catch (error) {
        console.log("error fetching notes",error)
        console.log(error)
       if (error.response?.status === 429) {
         setIsRatelimited(true);
       } 

      }finally{
        setLoading(false) ; 
      }
    }
    fetchNotes();
  },[])

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRatelimited && <RateLimitedUi />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">
            Loading...
          </div> 
        )}
        {notes.length === 0 && !isRatelimited && <NotesNotFound/>}
        {notes.length > 0 && !isRatelimited && ( 
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {notes.map((note)=>(
            <div key={note._id}>
             < NoteCard note={note} setNotes = {setNotes}/>
            </div>
          ))}
        </div>)}
      </div>
    </div>
  );
};

export default HomePage;