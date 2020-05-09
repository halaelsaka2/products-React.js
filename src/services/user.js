import axios from "axios";

const userEndPoint = "http://localhost:3000/user";

export async function RegisterUser(newUser) {
    const registerEndPoint = `${userEndPoint}/register`;
    const{data} =await axios.post(registerEndPoint,newUser);
    return data;
}

export async function LoginUser(currentUser) {
    const loginEndPoint = `${userEndPoint}/login`;
    const response =await axios.post(loginEndPoint,currentUser).catch(err=>console.log(err.massage));
    console.log(response.data);
    const {token ,user} = response.data;

    localStorage.setItem("token",token);
    localStorage.setItem("user",JSON.stringify(user));
    // localStorage.setItem("userName",user.userName);
    // axios.defaults.headers.common["Authorization"]=token;
  console.log(localStorage);
  
    return response.data;
}






// changeHandler = (event) => {
//     const { name, value } = event.target;
//     const changedInput = { [name]: value };
//     const product = { ...this.state.product, ...changedInput };
//     this.setState({ product });
//   };
//   addHandler = async (event) => {
//     event.preventDefault();
//     const product = {...this.state.product}
//     const respose = await addProduct(product)
//   };

//   paymenTypeHandler = (event) => {
//     const { checked, name } = event.target;
//     console.log(event.target.checked)
//     if (checked) {
//       const paymentType = { paymentType: name };
//       const product = { ...this.state.product, ...paymentType };
//       this.setState({ product });
//     } else {
//       const paymentType = { paymentType: "" };
//       const product = { ...this.state.product, ...paymentType };
//       this.setState({ product });
//     }
//   };
//   statusHandler = (event) => {
//     const { checked, name } = event.target;
//     console.log(checked)
//     if (checked) {
//       const statusType = { status: name };
//       const product = { ...this.s

//         onClick={this.statusHandler}
//                         checked={this.state.product.status === "NotOnSale"}
//   checked={
//                         this.state.product.paymentType === "ChequePayment"
//                       }
//                       onClick={this.paymenTypeHandler}
// export async function addProduct(product){
// const token = window.localStorage.getItem("token");
// console.log(token);
// const {data} = await axios.post(`${url}/add-product`,product,{
//     headers:{
//         'authorization':token
//     }
// });
// return data;
// }
