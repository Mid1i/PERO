import axios from "axios";


export async function fetchCurrentProduct({queryKey}) {
    const {data} = await axios.get(`https://java.pero-nn.ru/api/public/get_sneaker/${queryKey[1]}`);
    return data;
}
