import axios from 'axios';

export async function GetAllCategories() {
    const {data}= await axios.get(" http://localhost:3000/category");
    return data;
}