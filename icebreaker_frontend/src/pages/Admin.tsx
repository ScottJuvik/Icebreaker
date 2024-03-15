import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";


const Admin = () => {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    
    useEffect(() => {

    })

    return (
        <>

        </>
    );
};

export default Admin;