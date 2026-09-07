import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, fetchPosts } from "../store/PostSlice";

 function PostsList(){
        const dispatch = useDispatch();
         const {items , loading :isLoading , error} = useSelector((state) => state.posts)
         const [title , setTitle] = useState("")
         const [body , setBody] = useState("")
    useEffect(()=> {
         dispatch(fetchPosts()); 
    },[dispatch])
    function handleSubmit(e){
       e.preventDefault();
       if(!title.trim() || !body.trim()) return;
         dispatch(addPost({title , body , userId : 1}))
         setTitle("");
         setBody("");
      }
      if(isLoading) {
        return < h2 style={{color:"blue"}}>Loading .....</h2>
      }
      if(error){
        return <h2 style={{color: "red"}}>error ! {error}</h2>
      }

    return(
        <div style={{padding : '20px'}}>
            <h2>Add New Post</h2>
          
            <form onSubmit={handleSubmit} style={{marginBottom: '20px', display: 'flex', flexDirection: 'column', width: '300px', gap: '10px'}}>
                <input 
                    type="text" 
                    placeholder="Post Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <textarea 
                    placeholder="Post Body" 
                    value={body} 
                    onChange={(e) => setBody(e.target.value)} 
                />
                <button type="submit">Add Post</button>
            </form>

            <hr />
               <h2>Posts List</h2>
                <ul>
                    {items.map((post) => {
                         <li key={post.id} style={{marginBottom:'15px' , borderBottom : '1px solid red'}}>
                            <h4>{post.title}</h4>
                            <p>{post.body}</p>
                         </li> 
                    })}
                </ul>
        </div>
    )
 }
 export default PostsList;