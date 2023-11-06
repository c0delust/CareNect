import { useState } from "react";
import styles from "./NgoDashboard.module.css" ;
import NeedyTable from "./NeedyTable";



const need = [
    // Your data here
    {
    receiverID: '001',
      fullName: 'Omkar Pokale',
      userPhoto: 'path/to/omkar_photo.jpg',
      phoneNumbers: ['9975302291'],
      address: 'Hupri,Kolhapur,Maharashtra',
      gpsCoordinates: { latitude: 35.6895, longitude: 139.6917 },
      aadhaarCardNumber: '1111-2222-3333',
      aadhaarCardPhoto: 'path/to/omkar_aadhaar_photo.jpg',
      rationCardPhoto: 'path/to/omkar_ration_photo.jpg',
      familyInfo: {
        memberCount: 3,
        income: '125,000',
        sourceOfIncome: 'IT job',
      },
      verificationStatus: {
        phone: true,
        aadhaarCard: true,
        address: true,
        familyInfo: false,
      },
      registrationDate: '2023-11-06',
    },
    {
      receiverID: '002',
      fullName: 'Saad Mulla',
      userPhoto: 'path/to/saad_photo.jpg',
      phoneNumbers: ['9545459549'],
      address: 'Sangli,Maharshtra',
      gpsCoordinates: { latitude: 40.7128, longitude: -74.0060 },
      aadhaarCardNumber: '4444-5555-6666',
      aadhaarCardPhoto: 'path/to/saad_aadhaar_photo.jpg',
      rationCardPhoto: 'path/to/saad_ration_photo.jpg',
      familyInfo: {
        memberCount: 4,
        income: '135,000',
        sourceOfIncome: 'Full-time job',
      },
      verificationStatus: {
        phone: true,
        aadhaarCard: true,
        address: true,
        familyInfo: true,
      },
      registrationDate: '2023-10-05',
    },
    {
        receiverID: '003',
        fullName: 'Aditya Tolgekar',
        userPhoto: 'path/to/aditya_photo.jpg',
        phoneNumbers: ['7030702652'],
        address: 'Kolhapur, Maharashtra',
        gpsCoordinates: { latitude: 40.7128, longitude: -74.0060 },
        aadhaarCardNumber: '4444-5555-6666',
        aadhaarCardPhoto: 'path/to/bob_aadhaar_photo.jpg',
        rationCardPhoto: 'path/to/bob_ration_photo.jpg',
        familyInfo: {
          memberCount: 4,
          income: '110,000',
          sourceOfIncome: 'Government job',
        },
        verificationStatus: {
          phone: true,
          aadhaarCard: true,
          address: true,
          familyInfo: true,
        },
        registrationDate: '2023-11-05',
      },
      {
        receiverID: '004',
        fullName: 'Akash Bhilwande',
        userPhoto: 'path/to/akash_photo.jpg',
        phoneNumbers: ['8180985050'],
        address: 'Nanded,Maharashtra',
        gpsCoordinates: { latitude: 40.7128, longitude: -74.0060 },
        aadhaarCardNumber: '7777-5555-6666',
        aadhaarCardPhoto: 'path/to/akash_aadhaar_photo.jpg',
        rationCardPhoto: 'path/to/akash_ration_photo.jpg',
        familyInfo: {
          memberCount: 4,
          income: '235,000',
          sourceOfIncome: 'Business',
        },
        verificationStatus: {
          phone: true,
          aadhaarCard: true,
          address: true,
          familyInfo: true,
        },
        registrationDate: '2023-09-06',
      },
      {
        receiverID: '005',
        fullName: 'Avishkar Pawar',
        userPhoto: 'path/to/avi_photo.jpg',
        phoneNumbers: ['3333333333'],
        address: '789 Maple Avenue, Villagetown, Country',
        gpsCoordinates: { latitude: 40.7128, longitude: -74.0060 },
        aadhaarCardNumber: '4444-5555-6666',
        aadhaarCardPhoto: 'path/to/bob_aadhaar_photo.jpg',
        rationCardPhoto: 'path/to/bob_ration_photo.jpg',
        familyInfo: {
          memberCount: 4,
          income: '$35,000',
          sourceOfIncome: 'Full-time job',
        },
        verificationStatus: {
          phone: true,
          aadhaarCard: true,
          address: true,
          familyInfo: true,
        },
        registrationDate: '2023-11-06',
      },
  
  ];
  
 
const NgoDashboard = () => {

    const [data, setData] = useState(need);

    const addNeedyHandler = (newNeedy) => {
        // Logic to add the new needy person to the data array
        setData((prevData) => [...prevData, newNeedy]);
    };
   
  return (
    <>
        <div className={styles.container}>


            <div className={styles.details}>
                <div className={styles.ngologo}>
                    <img src="https://d3l793awsc655b.cloudfront.net/blog/wp-content/uploads/2021/05/VS_Blog-Images_3-05.png" />
                </div>
                <div className={styles.text}>
                    <h2>NGO NonGovermental Organization</h2>
                    <p>Sangli Miraj Kupwad</p>
                </div>
            </div>
        </div>

        <div className={styles.buttons}>

            <div className={styles.btn}>
                <p className={styles.name} > Request</p>
                <p className={styles.num}>100</p>
            </div>

            <div className={styles.btn}>
                <p className={styles.name} > Approved</p>
                <p className={styles.num}>100</p>
            </div>

            <div className={styles.btn}>
                <p className={styles.name} > Full Filled</p>
                <p className={styles.num}>100</p>
            </div>

        </div>

        <div className={styles.data}>
            <NeedyTable data={data} addNeedyHandler={addNeedyHandler} />
        </div>

        <div className={styles.addNeed}>
            <button onClick={addNeedyHandler} className={styles.addBtn}>Add Needdy</button>
        </div>
    </>
  )
}

export default NgoDashboard