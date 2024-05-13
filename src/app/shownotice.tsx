'use client'

import { useEffect, useState } from "react"
import {getnotice} from "../../getnotice"
export default async function notice(){
 const notice = await getnotice();

    
    
    return (
        <><div></div></>
    )
}