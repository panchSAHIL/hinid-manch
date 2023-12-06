 import React from "react";
 import { BrowserRouter, Routes, Route } from 'react-router-dom';
//  import SignIn from "./pages/SignIn";
import Home from "./pages/home/Home";
import { UserContext } from "./contexts/UserContext";
import Vowels from "./pages/vowels/Vowels";
import Learn from "./pages/learn/Learn";
import ConsonantsList from "./pages/cononants/ConsonantsList";
import Consonant from "./pages/cononants/Consonant";
import Practice from "./pages/practice/Practice";
import SubmitAudio from "./pages/practice/SubmitAudio";

 function App() {
  const [userData, setUserData] = React.useState({});
  const uvalue = {userData, setUserData};

      return(
        <div className="App">
          <UserContext.Provider value={uvalue}>
            <BrowserRouter>
              <Routes>
                <Route index element={<Home />} />
                {/* <Route index element={<SignIn />} /> */}
                <Route path='/home' element={<Home />} />
                <Route path='/learn' element={<Learn />} />
                <Route path='/vowels' element={<Vowels />} />
                <Route path='/consonantslist' element={<ConsonantsList />} />
                <Route path='/consonant' element={<Consonant />} />
                <Route path='/practice' element={<Practice />} />
                <Route path='/submitaudio' element={<SubmitAudio />} />
              </Routes>
            </BrowserRouter>
          </UserContext.Provider>
        </div>
      )
 }

 export default App;
