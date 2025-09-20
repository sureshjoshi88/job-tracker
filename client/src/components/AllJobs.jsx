import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const AllJobs = () => {
  const [data, setData] = useState([])
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [error,setError] = useState("")

  const [search, setSearch] = useState('');


  console.log(data);

  const handaleform = (e) => {
    e.preventDefault();
  }


  const handleaddPost = () => {

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer 12345");
    myHeaders.append("Content-Type", "application/json");

    const formdata = {
      companyName: company,
      position: position,
      location: location,
      status: status,
      description: description
    }
    const raw = JSON.stringify(formdata);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://localhost:3000/job/addjobpost", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result), alert("data added"))
      .catch((error) => console.error(error));

    setCompany('');
    setDescription('')
    setLocation('')
    setPosition('')
    setStatus('')

  }

  const handleSearch = () => {
    if(search.trim()===""){
      alert('please enter a value')
      return
    }
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer 12345");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`http://localhost:3000/job/alljobs?status=${search}`, requestOptions)
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    fetch('http://localhost:3000/job/alljob')
      .then((data) => data.json())
      .then((response) => {
        setData(response)
      }).catch((err) => {
        console.log(err);
      })
  }, [])

  return (
    <div>
      <div className='flex justify-center p-3'>
        <input className='border rounded p-1 outline-0 w-100' value={search}  onChange={(e)=>setSearch(e.target.value)} type="search" name="" id="" placeholder='search with status' />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className='flex justify-center mt-3'>
        <form action="" className='shadow-2xl p-4 rounded space-y-4 w-100' onSubmit={handaleform}>
          <input className='border-b rounded p-2 outline-0 w-full' value={company} onChange={(e) => setCompany(e.target.value)} type="text" placeholder='Enter your Company name' required /><br />
          <input className='border-b rounded p-2 outline-0 w-full' value={position} onChange={(e) => setPosition(e.target.value)} type="text" placeholder='Enter your Position' required /><br />
          <input className='border-b rounded p-2 outline-0 w-full' value={location} onChange={(e) => setLocation(e.target.value)
          } type="text" placeholder='Enter your Location' required /><br />
          <select name="" id="" className='border-b rounded p-2 outline-0 w-full' value={status} onChange={(e) => setStatus(e.target.value)}>
            <option >please select your status</option>
            <option value="applied">Applied</option>
            <option value="pending">Pending</option>
            <option value="reject">Reject</option>
          </select><br />
          <input className='border-b rounded p-2 outline-0 w-full' value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder='Enter your description' required /><br />
          <button className='mt-3  rounded p-2 w-full bg-blue-100' onClick={handleaddPost}>Add Job</button>
        </form>
      </div>
      <div>
        {
          data.length===0&&<p className='text-3xl font-medium p-3 text-center'></p>
        }
      </div>
      <div className='grid gap-4 grid-cols-3 mt-5'>
        {
          data.map((item, index) => {
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
