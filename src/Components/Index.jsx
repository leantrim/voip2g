import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase/firebase";
import SidebarLeft from "./SidebarLeft";
import Body from "./Body";
import LoginPage from "./usersystem/LoginPage";
import TopBar from "./TopBar";
import Footer from "./Footer";
import SidebarRight from "./SidebarRight";

function Index() {
  const [user] = useAuthState(auth);
  if (!user) return <LoginPage />;
    
    /* USER VARIABLES 
    user.displayName;
    user.email;
    user.photoURL;
    user.emailVerified;
    user.uid;
    */
  // User skickas upp till varje component som kan sedan användas för att få fram info om användare.
  return (
    <div>
      {/* Top Bar */}
      <TopBar user={user}/>

      {/* Main Body */}
      <Body user={user}/>
      
      {/* Left Sidebar */}
      <SidebarLeft user={user} />

      {/* Right Sidebar */}
      <SidebarRight user={user}/>


      {/* Footer */}
      <Footer user={user}/>
    </div>
  );
}

export default Index;
