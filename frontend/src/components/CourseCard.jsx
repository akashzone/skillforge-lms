import React from 'react'

const CourseCard = (props) => {
  return (
    <>
    {
        <div>
        <h1>Title :{props.title}</h1><br></br>
        <p>Description :{props.description}</p><br></br>
        <span>Price : {props.price}</span><br></br>
        <span>Level : {props.level}</span><br></br>
        <span>Category : {props.category}</span>
    </div>
    }
    </>
  )
}

export default CourseCard