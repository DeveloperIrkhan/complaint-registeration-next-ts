"use client"
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

const page = () => {
  useEffect(()=>{
    toast.success("page loaded")
  },[])
    return (
    <div>this is client webapge</div>
  )
}

export default page