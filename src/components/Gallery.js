import React, { useEffect, useRef, useState } from "react";
// importing local css
import Styles from "./gallery.module.css";
// importing like image
import Like from "../assets/Like.png";

// functional componenet
function Gallery(){
  // state for storing pictures list that fetched from api
  const [pictures, setPictures] = useState([]);
  // to ackowledge that we reach bottom of the screen
  const [reachedBottom, setReachedBottom] = useState(false);
  // set page number for load pictures from each page
  const [page, setPage] = useState(1);
  // likes count for each pictures
  const [likes, setLikes] = useState([]);
  // for scrollTop we took the ref of gallery div
  const picturesDivRef = useRef();

  // function for update likes
  const likeImage = (picture_id) =>{
    // deep copying the array of object
    let temp = likes.map(a=>{return{...a}});

    temp.filter((item, i)=>{

      if(picture_id === item.id){

        item.likes+=1

      }

    })

    setLikes(temp)
    
  }

  // handle event right after we reach bottom of screen
  const handleScroll = (event) => {

    const target = event.target;
    
    if( target.scrollHeight - target.scrollTop === target.clientHeight){
      // we toggle the value into true as we reach the bottom of screen
      setReachedBottom(!reachedBottom);

    }

  }

  // seeting array of objects which implies likes for each pictures
  useEffect(()=>{

    let i = 0;
    // as we know the count of pictures available among all three pages
    const totalImagesCount = 89;

    let likesArray = []

    // we set 89 objects which will implies likes for each picture
    while(i <= totalImagesCount){

      likesArray.push(

        {
          id:i,
          likes:0
        }

      )

      i+=1
    }

    setLikes(likesArray)

  },[])

  // fetching page 1 pictures data from api right after component mounted 
  useEffect(()=>{

    fetch(`https://picsum.photos/v2/list?page=${page}`)
    .then(res=>res.json())
    .then(data=>{setPictures(data)})

    setPage(2)

  },[])

  // as soon as we reach the bottom we fetching next page to show 
  useEffect(()=>{

    if(reachedBottom){

      fetch(`https://picsum.photos/v2/list?page=${page}`)
      .then(res=>res.json())
      .then(data=>{setPictures(data)

    })
    // after fetching we go to top of the screen
    picturesDivRef.current.scrollTo(0, 0)
    window.scrollTo(0, 0)

    setReachedBottom(!reachedBottom)
  // setting page number to 3, so that next time page 3 will be rendered by fetching
    setPage(3)

    }

  },[reachedBottom])

  // return function which returns jsx to be rendered
  return (

    <div className={Styles.gallery_div} onScroll={handleScroll} ref={picturesDivRef}>

      {pictures.map((item,i)=>{

        return(

          <div className={Styles.picture_div} >

            <img className={Styles.image} src={item.download_url} alt="picture"/>

            <div className={Styles.picture_details}>

              <h1>Author: </h1>
              <p>{item.author}</p>

              <div className={Styles.open_and_download}>

                <div className={Styles.open_image}>

                  <a href={item.download_url} target="_blank">
                    Open
                  </a>

                </div>

                <div className={Styles.download_image}>

                  <a href={item.url} target="_blank">
                    Download
                  </a>

                </div>

              </div>

            </div>

            <div className={Styles.likes_and_counts}>

              <img src={Like} alt="Like" onClick={()=>likeImage(i)}/>

              <p >{likes[i].likes}</p>

            </div>

          </div>

        )    

      })}
      
    </div>
  )
};

export default Gallery;
