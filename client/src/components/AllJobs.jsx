import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const AllJobs = () => {
  const [data,setData] =useState([])
  useEffect(()=>{
    fetch('http://localhost:3000/job/alljob')
    .then((data)=>data.json())
    .then((response)=>{
      setData(response)
    }).catch((err)=>{
      console.log(err);
    })
  },[])
  console.log(data);
  
  return (
    <div>
      <div className='grid gap-4 grid-cols-3 '>
        {
          data.map((item,index)=>{
           return <div className='border rounded p-3'>
                <p>{item.companyName}</p>
                <p>{item.position}</p>
                <p>{item.location}</p>
                <p>{item.status}</p>
                <p>{item.description}</p>
                <p>{item.appliedDate}</p>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default AllJobs
