import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const AllJobs = () => {
  const [data,setData] =useState([])
  const [company,setCompany] = useState('');
  const [position,setPosition] = useState('');
  const [location,setLocation] = useState('');
  const [status,setStatus] = useState('');
  const [description,setDescription] = useState('');
  
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
      <div className='flex justify-center mt-3'>
        <form action="" className='shadow-2xl p-4 rounded space-y-4 w-100'>
          <input  className='border-b rounded p-2 outline-0 w-full' type="text" placeholder='Enter your Company name' required /><br/>
          <input  className='border-b rounded p-2 outline-0 w-full' type="text" placeholder='Enter your Position' required /><br/>
          <input  className='border-b rounded p-2 outline-0 w-full' type="text" placeholder='Enter your Location' required /><br/>
          <select name="" id="" className='border-b rounded p-2 outline-0 w-full'>
            <option value="applied">Applied</option>
            <option value="pending">Pending</option>
            <option value="reject">Reject</option>
          </select><br/>
          <input  className='border-b rounded p-2 outline-0 w-full' type="text" placeholder='Enter your description' required /><br/>
          <button className='mt-3 border rounded p-2 w-full'>Add Job</button>
        </form>
      </div>
      <div className='grid gap-4 grid-cols-3 mt-5'>
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
