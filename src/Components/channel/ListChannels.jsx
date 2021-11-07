import React, { useState, useEffect } from "react";
import { db } from "../Firebase/firebase";
import Loading from '../Loading';
import NewChannel from "./NewChannel";

// Tanken är att hämta channels från databasen här ifrån!


const ListChannels = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPostsFromFirebase = [];
    const subscriber = db
      .collection("channels")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          getPostsFromFirebase.push({
            ...doc.data(), //spread operator
            key: doc.id, // `id` given to us by Firebase
          });
        });
        setPosts(getPostsFromFirebase);
        setLoading(false);
      });

    // return cleanup function
    return () => subscriber();
  }, [loading]); 

  const renderChannelIcon = (chan) => {
    let classes = "mt-3 p-5 text-info fas ";
    classes += chan.channelisChat ? "fa-comment-alt" : "fa-headset";
    return classes;
  };


  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {posts.length > 0 ? (
        posts.map((chan) => 
          <ul 
          style={{ cursor: "pointer" }}
          className={renderChannelIcon(chan)}
          key={chan.key}>
            {chan.channel_name}</ul>)
      ) : (
        <h1>Inga kanaler skapade..Skapa en nu {<NewChannel />}</h1>
      )}
    </>
  );
};




/* <div key={x.channel_name}>
<i
  style={{ cursor: "pointer" }}
  className={renderChannelIcon(x)}
  variant="primary"
>
  {" "}
  {x.channel_name}
</i>
</div> */

export default ListChannels;
