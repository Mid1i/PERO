import axios from "axios";


export async function fetchColors() {
    const {data} = await axios.get('https://java.pero-nn.ru/api/public/get_colors');
    return data;
}