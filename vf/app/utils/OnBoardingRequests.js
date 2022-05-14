// import qs from 'querystring';
// import axios from 'axios';
// import { configHeader } from './Utilities';


// export function onBoardingApiCalls(url, postData, onSuccess, onFailure) {
//     axios.post(url, qs.stringify(postData), configHeader)
//         .then((response) => {
//             console.log(response);
//             onSuccess(response)
//         })
//         .catch((err) => {
//             onFailure(err.response.data.error)
//             console.log(err.response.data.error);
//         })
// }


import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {db} from '../config';
import { collection,addDoc} from "@firebase/firestore";

export function onBoardingApiCalls (url, postData, onSuccess, onFailure) {

    console.log(postData)

    auth()
  .createUserWithEmailAndPassword(postData.email, postData.password)
  .then((data) => {
    console.log(data);

    if(data?.user){
        database()
        .ref("User")
        .child(data?.user?.uid)
        .set({
            first_name: postData.first_name,
            last_name: postData.first_name,
            email: postData.email,
            password: postData.password,
            type: postData.type,
            city: postData.city,
            country: postData.country,
            postal_code: postData.postal_code,
            phone: postData.phone,
            street_address: postData.street_address,
            username: postData.username,
            state: postData.state,
            area_covered: postData.area_covered,
            fb_link: postData.fb_link,
            is_term_accept: postData.is_term_accept
        }).then(()=>{
            this.props.navigation.navigate("login")
            console.log("set Data")
        })
    }
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });
  
    // const request_ref=collection(db,"request");
    // addDoc(request_ref,{"name":"huss","address":"sds","phone":"65656565"}).then(()=>{
    //     let response ="success"
    //     console.log(response);
    //     onSuccess(response)
    // }).catch((error)=>{
    //     alert("noo")
    // });
   
}
