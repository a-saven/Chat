// import React, { useContext } from "react";
// import { useQuery } from "@apollo/react-hooks";
// import { gql } from "apollo-boost";
// import { ChatContext } from "./ChatContext";

// const CHAT = gql` 
//   {
//     getOneChat {
//       _id
//       chats {
//         _id
//         sender {
//           _id
// 				  name
// 				  user_type
//         }
//         content
//         createdAt
//       }
//       resolved
//       takeoverAgent
//       customer {
//         _id
//       }
//       supporter {
//         _id
//       }
//       token
//       createdAt
//       updatedAt
//     }
//   }
// `;

// export default function Chat() {
//   let { state, dispatch } = useContext(ChatContext);

//   const { loading, error, data } = useQuery(CHAT, {
//     variables: {
//       _id: "5d9b16d475afebf853586c65"
//     },
//     onCompleted(data) {
//       const payload = {
//         chats: data.getOneChat.chats
//       }
//       dispatch({type: "set", payload})
//     }
//   });
//   return (null)
//   // if (loading) return <p>Loading...</p>;
//   // if (error) return <p>Error :(</p>;
//   // if (data) return;
// }
