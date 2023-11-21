// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { NotesPage } from './pages/NotesPage';
// import { NoteDetailPage } from './pages/NoteDetailPage';
// import { NotFoundPage } from './pages/NotFoundPage';


// export const Routes = () => {

//     return (
//         <Router>
//            <Routes>
//                 <Route path="/">
//                     <NotesPage />
//                 </Route>
//                 <Route path="/notes/:noteId">
//                     <NoteDetailPage />
//                 </Route>
//                 <Route>
//                     <NotFoundPage />
//                 </Route>
//             </Routes>
//         </Router>
//     )

// }



// const [user, SetUser] = useState('')
// const [password, SetPwd] = useState('')
// function handleSumbit(event){
//     event.preventDefault();
//     axios.post('http://localhost:8081/login', {user, password})
//     .then(res=> console.log(res))
//     .catch(err => console.log(err));
// }

//     axios.post('http://localhost:8081/login', {user, password})
//     .then(res=> console.log(res))
//     .catch(err => console.log(err));
// }




// //In a React component
// import React, { useState } from 'react';
// import axios from "axios";
// import { findAllInRenderedTree } from 'react-dom/test-utils';

// function Home() {

//   const [user, setName] = useState('');
//   const [password, setPwd] = useState('')

//   const [data, setData] = useState([]);

//   async function submit(e){
//     e.preventDefault()
//     try{
//         await axios.post("http://localhost:8000/sendData",{
//             user,
//             password
//         }).then(res=>{

//           if(res.data==="fail"){
//             alert("Failed")
//           }
//           else{
//             setData(res.data)
//           }


//         })
//         .catch(e=>{

//         })
//     }
//     catch(e){
//         console.log(e)
//     }
//   }

//   return (
//     <div>
//         <h1>Account</h1>

//         <form onSubmit={submit}>
//             <input onChange={(e) => {setName(e.target.value) }} type="text" name="user"/>
//             <input onChange={(e) => {setPwd(e.target.value) }} type="text" name="Pwd"/>
//             <input type="submit" />
//         </form>
        

//         {
      
//           //data.map((e)=>(
//              //<p>{e.name}</p>
//          // ))
//         } 
//     </div>
//   )
// }

// export default Home