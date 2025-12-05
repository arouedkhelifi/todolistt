import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import formatDate from '../lib/utils'
import api from '../lib/axios' ; 
import toast from 'react-hot-toast' ; 

const NoteCard = ({ note ,setNotes}) => {
  const handleDelete =async (e,id) =>{
       e.preventDefault();//get rid of navigation behaviour
       if(!window.confirm('are u sure you want to delete note ..?'))  
         return ; 
        
       try {
        await api.delete(`/notes/${id}`);
        setNotes((prev) => prev.filter(note => note._id !== id)) // get off the ui deleted notes of the home page  
        toast.success("Note deleted successfuly !") ; 
       } catch (error) {
        toast.error("Failed to delete note");
        console.error("error in handleDelete", error);
        
       }
    }

  return (
    <div>
      <Link to= {`/note/${note._id}`} 
      className='card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solide border-{#00FF9D} '>
        <div className='card-body'>
            <h3 className='card-title texte-base-content'>{note.title}</h3>
            <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
            <div className='card-action justify-between items-center mt-4'>
                <span className='texte-sm text-base-content/60'>{formatDate( new Date (note.createdAt))}</span>
                <div className='flex items-center gap-1'>
                    <PenSquareIcon className='size-4'/>
                    <button className='btn btn-ghost btn-xs text-error' onClick={(e)=>handleDelete(e,note._id)}>
                        <Trash2Icon className='size-4'> </Trash2Icon>
                    </button>
                </div>
            </div>
        </div>
      </Link>
    </div>
  )
}

export default NoteCard
